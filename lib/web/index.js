window.jQuery = window.$ = require('jquery')
require('waypoints/lib/jquery.waypoints')

var $ = window.$
var Waypoint = window.Waypoint

var onScrollUp = require('./on_scrollup')

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
    $sections.parent().append($('<div role="next-waypoint"></div>'))
  }

  Waypoint.refreshAll()
})

/*
 * Infinite scroll
 */

$(function () {
  var $placeholder = $('[role="next-waypoint"]')

  $placeholder.waypoint({
    handler: function () {
      var $next = $('.page-section:hidden').eq(0)
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

  function onEnter (direction) {
    if (direction !== 'down') return
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

onScrollUp({ min: 64 }, function () {
  $(document).trigger('pages:showAll')
})

/*
 * Page change (muting)
 */

$(document).on('pages:showAll', function (e) {
  $('.page-section').removeClass('-mute').removeClass('-active')
})

$(document).on('pages:change', '.page-section', function (e, options) {
  var $this = $(this)
  $('.page-section').addClass('-mute').removeClass('-active')
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
