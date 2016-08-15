window.jQuery = window.$ = require('jquery')
require('waypoints/lib/jquery.waypoints')

var $ = window.$
var Waypoint = window.Waypoint
var onmount = require('onmount')
var loadNextSlide = require('./actions/load_next_slide')
var navigateToHash = require('./actions/navigate_to_hash')

// Initialize onmount
onmount.debug = true
$(function () { onmount() })

/*
 * Window resize class
 */

void (function () {
  $(window).on('resize', reclass)
  $(reclass)

  function reclass () {
    var width = $(window).width()
    var mobile = width <= 768
    var klass = mobile ? '-mobile' : '-desktop'

    document.documentElement.className = klass
    onmount()
  }
}())

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

onmount('html.-desktop', function (b) {
  // If pressing the 'back' button, just show everything
  if ($('body').scrollTop() !== 0 || window.location.hash !== '') return

  $('body').addClass('-first-load')
  var $sections = $('.page-section')

  // Don't add a next-waypoint unless there's a next page.
  if ($sections.length > 1) {
    b.$sections = $sections
    b.$next = $('<div role="next-waypoint"></div>')
    $sections.addClass('-hide')
    $sections.eq(0).removeClass('-hide')
    $sections.parent().append(b.$next)
  }

  setTimeout(function () {
    Waypoint.refreshAll()
  })
}, function (b) {
  $('body').removeClass('-first-load')

  if (b.$next) {
    b.$next.remove()
  }

  if (b.$sections) {
    b.$sections.removeClass('-hide')
  }
}, { detectMutate: true })

/*
 * Scroll properly on load to a hash
 */

$(function () {
  if (window.location.hash) {
    var $section = $(window.location.hash).closest('.page-section')
    var y = $section.offset().top

    setTimeout(function () {
      // No offset here; don't smooth-scroll into place on first load.
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

onmount('html.-desktop', function enter (b) {
  var $placeholder = $('[role="next-waypoint"]')

  b.waypoints = $placeholder.waypoint({
    handler: loadNextSlide,
    offset: '90%'
  })
}, function exit (b) {
  if (b.waypoints) {
    $.each(b.waypoints, function () { this.destroy() })
  }
}, { detectMutate: true })

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

onmount('html.-desktop', function (b) {
  b.handler = onScrollUp({ min: 128 }, function () {
    $(document).trigger('pages:showAll')
  })
}, function (b) {
  b.handler()
}, { detectMutate: true })

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

void (function () {
  $(window).on('hashchange', onHashChange)
  $(document).on('click', 'a[href^="#"]', onClick)

  function onHashChange (e) {
    navigateToHash(window.location.hash)
  }

  function onClick (e) {
    e.preventDefault()
    var $a = $(this)

    // No one cares about window.location.hash;
    // so no pushState magic here to preserve back button behavior.
    navigateToHash($a.attr('href'))
  }
}())
