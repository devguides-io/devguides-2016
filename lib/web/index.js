window.jQuery = window.$ = require('jquery')
require('waypoints/lib/jquery.waypoints')

var $ = window.$
var Waypoint = window.Waypoint

/*
 * Custom behaviors
 */

var onScrollUp = require('./helpers/on_scrollup')

/*
 * First load:
 *
 * `div(role='next-waypoint')` is inserted at the end of all the sections.
 * this has a waypoint trigger to show the next page.
 */

$(function () {
  // If pressing the 'back' button, just show everything
  if ($('body').scrollTop() !== 0 || window.location.hash !== '') return

  $('body').addClass('-first-load')
  var $sections = $('.page-section')

  // Don't add a next-waypoint unless there's a next page.
  if ($sections.length > 1) {
    $sections.addClass('-hide')
    $sections.eq(0).removeClass('-hide')
    $sections.parent().append($('<div role="next-waypoint"></div>'))
  }

  Waypoint.refreshAll()
})

/*
 * Scroll properly on load to a hash
 */

$(function () {
  if (window.location.hash) {
    var $section = $(window.location.hash).closest('.page-section')
    var y = $section.offset().top

    setTimeout(function () {
      // no offset here, just because I think it looks better
      $('html, body').scrollTop(y)
    }, 0)
  }
})

/*
 * Infinite scroll.
 *
 * This "loads" the next page as you scroll.
 * Animations are NOT a part of this.
 */

$(function () {
  var $placeholder = $('[role="next-waypoint"]')

  $placeholder.waypoint({
    handler: destroyPlaceholder,
    offset: '70%'
  })
})

var disabled

function destroyPlaceholder () {
  var $placeholder = $('[role="next-waypoint"]')

  if (disabled) return
  $('body').removeClass('-first-load')

  // Disable until animations are finished; prevents double invocation.
  disabled = true

  // var $next = $('.page-section.-hide').eq(0)
  // $next.trigger('pages:load')

  // Show all pages (but still muted!)
  $('.page-section.-hide').removeClass('-hide')
  $placeholder.remove()

  // Ahuh
  setTimeout(function () {
    disabled = false
  }, 50)

  setTimeout(function () {
    window.Waypoint.refreshAll()
  })
}

/*
 * Waypoints.
 *
 * Triggers `pages:advance` ({index}) when loading a new page.
 * Triggers `pages:rewind` ({index}) when going back.
 */

$(function () {
  var $pages = $('.page-section')

  $('.page-section').addClass('-mute')
  $('.page-section').waypoint({
    handler: onAdvance,
    offset: '50%',
    down: 'enter',
    up: 'exited'
  })

  $('.page-section').waypoint({
    handler: onRewind,
    offset: '-50%',
    down: 'exited',
    up: 'enter'
  })

  function onAdvance (direction) {
    if (direction !== 'down') return
    var $this = $(this.element)
    if ($this.is(':hidden')) return
    $this.trigger('pages:advance', { index: $pages.index(this.element) })
  }

  // There's a strange instance where its first appearance (via infinite scroll)
  // triggers this
  function onRewind (direction) {
    if (direction !== 'up') return
    var $this = $(this.element)
    if ($this.is(':hidden')) return
    $this.trigger('pages:rewind', { index: $pages.index(this.element) })
  }

  $(document).trigger('pages:init', {
    count: $pages.length
  })
})

/*
 * Show everything when scrolling up.
 */

onScrollUp({ min: 128 }, function () {
  $(document).trigger('pages:showAll')
})

/*
 * Page change (muting)
 */

$(document).on('pages:showAll', function (e) {
  $('.page-section').removeClass('-mute').removeClass('-active')
})

$(document).on('pages:advance', '.page-section', function (e, options) {
  var $this = $(this)
  $(document).queue(function (next) {
    $('.page-section').addClass('-mute').removeClass('-active')
    $this.removeClass('-mute').addClass('-active')
    next()
  })
})

/*
 * Page dots
 */

$(document).on('pages:init', function (e, options) {
  var $pagedots = $('<div class="page-dots -hide">')
  for (var i = 0; i < options.count; i++) {
    $('<a class="dot">').appendTo($pagedots)
  }
  $pagedots.appendTo('body')
})

$(document).on('pages:advance pages:rewind', '.page-section', function (e, options) {
  var $pagedots = $('.page-dots')
  var $dots = $pagedots.children()
  $dots.removeClass('-active')
  $pagedots.toggleClass('-hide', options.index === 0)

  // Never select the first dot.
  $dots.eq(Math.max(options.index, 1)).addClass('-active')
})

/*
 * iframe
 */

var iFrameResize = require('iframe-resizer')
iFrameResize.iframeResizer({
  resizedCallback: function () {
    $(window).trigger('resize')
  }
}, 'iframe[seamless]')

/*
 * On hash change
 */

$(window).on('hashchange', function (e) {
  navigateToHash(window.location.hash)
})

$(document).on('click', 'a[href^="#"]', function (e) {
  e.preventDefault()
  var $a = $(this)

  // No one cares about window.location.hash
  navigateToHash($a.attr('href'))
})

function navigateToHash (hash) {
  if (!hash) return

  destroyPlaceholder()

  var $heading = $(hash)
  var $section = $heading.closest('.page-section')
  var y = $section.offset().top
  var idx = $section.index()

  $(document).queue(function (next) {
    setTimeout(next, 250 * .85)
    $('html, body').animate({ scrollTop: y - 16 }, 250)
  })
}
