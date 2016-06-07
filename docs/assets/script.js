var $ = require('jquery')
window.$ = $
window.jQuery = $

var Waypoint = require('waypoints/lib/jquery.waypoints')

$(function () {
  var $pages = $('.page-section')
  var count = $pages.length
  $('[role~="page-count"]').html(count)
})

/*
 * First load
 */

$(function () {
  if ($('body').scrollTop() !== 0) return
  $('body').addClass('-first-load')

  var $sections = $('.page-section')

  if ($sections.length > 1) {
    $sections.hide()
    $sections.eq(0).show()
    $sections.parent().append($('<div role="next-waypoint"></div>'));
  }

  window.Waypoint.refreshAll()
})

/*
 * Infinite scroll
 */

$(function () {
  // Add new pages
  var $placeholder = $('[role="next-waypoint"]')

  $placeholder.waypoint({
    handler: function () {
      var $next = $('.page-section.-active ~ .page-section').eq(0)
      $('body').removeClass('-first-load')

      if ($next.length) $next.show()
      else $placeholder.remove()

      setTimeout(function () { window.Waypoint.refreshAll() })
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
    handler: onEnter,
    offset: '50%',
    // context: '#body',
    down: 'enter',
    up: 'exited'
  })

  $('.page-section').waypoint({
    handler: onEnter,
    offset: 'bottom-in-view',
    // context: '#body',
    down: 'entered',
    up: 'exit'
  })

  function onEnter (direction) {
    var $this = $(this.element)
    if ($this.is(':hidden')) return
    $this.trigger('pages:change', {
      index: $pages.index(this.element)
    })
  }

  $(document).trigger('pages:init', {
    count: $pages.length
  })
})

/*
 * Page change
 */

$(document).on('pages:change', '.page-section', function (e, options) {
  var $this = $(this)
  $('.page-section.-active').addClass('-mute').removeClass('-active')
  $this.removeClass('-mute').addClass('-active')
})

/*
 * Page count
 */

$(document).on('pages:change', '.page-section', function (e, options) {
  var $number = $('[role~="page-number"]')
  $number.html(options.index + 1)
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

$(document).on('pages:change', '.page-section', function (e, options) {
  var $pagedots = $('.page-dots')
  var $dots = $pagedots.children()
  $dots.removeClass('-active')
  $pagedots.toggleClass('-hide', options.index === 0)

  if (options.index > 0) {
    $dots.eq(options.index).addClass('-active')
  }
})
