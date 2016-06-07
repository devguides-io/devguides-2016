window.jQuery = window.$ = require('jquery')
require('waypoints/lib/jquery.waypoints')

var $ = window.$
var Waypoint = window.Waypoint

var onScrollUp = require('./helpers/on_scrollup')
require('./behaviors/next_progress')

/*
 * First load
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
 * Infinite scroll
 */

$(function () {
  var $placeholder = $('[role="next-waypoint"]')
  var disabled

  $placeholder.waypoint({
    handler: function () {
      if (disabled) return
      var $next = $('.page-section.-hide').eq(0)
      $('body').removeClass('-first-load')

      // Disable until refresh; prevents double invocation.
      disabled = true

      $next.trigger('pages:load')
      $next.removeClass('-hide')

      // Remove on the last page to show.
      if ($('.page-section.-hide').length === 0) $placeholder.remove()

      // Ahuh

      setTimeout(function () {
        disabled = false
      }, 50)

      setTimeout(function () {
        window.Waypoint.refreshAll()
      })
    },
    offset: '70%'
  })
})

/*
 * Waypoints
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
  // triggers htis
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
  $('.page-section').addClass('-mute').removeClass('-active')
  $this.removeClass('-mute').addClass('-active')
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
