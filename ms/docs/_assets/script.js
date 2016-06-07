var $ = require('jquery')
window.$ = $
window.jQuery = $

var Waypoint = require('waypoints/lib/jquery.waypoints')

$(function () {
  var $pages = $('.page-section')
  var count = $pages.length
  $('[role~="page-count"]').html(count)
})

$(function () {
  var $pages = $('.page-section')
  var $number = $('[role~="page-number"]')
  var count = $pages.length

  $('.page-section').addClass('-mute')
  $('.page-section').waypoint({
    handler: onEnter,
    offset: '50%',
    context: '#body',
    down: 'enter',
    up: 'exited'
  })

  $('.page-section').waypoint({
    handler: onEnter,
    offset: 'bottom-in-view',
    context: '#body',
    down: 'entered',
    up: 'exit'
  })

  function onEnter (direction) {
    $('.page-section.-active').addClass('-mute').removeClass('-active')
    $(this.element).removeClass('-mute').addClass('-active')
    $number.html($pages.index(this.element) + 1)
  }
})
