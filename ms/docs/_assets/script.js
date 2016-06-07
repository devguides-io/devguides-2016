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
    handler: function (direction) {
      $('.page-section.-active').addClass('-mute').removeClass('-active')
      $(this.element).removeClass('-mute').addClass('-active')
      $number.html($pages.index(this.element) + 1)
    },
    offset: '50%',
    context: '#body'
  })
})
