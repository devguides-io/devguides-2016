var $ = require('jquery')
window.$ = $
window.jQuery = $

var Waypoint = require('waypoints/lib/jquery.waypoints')

$(function () {
  $('.page-section').addClass('-mute')
  $('.page-section').waypoint({
    handler: function (direction) {
      $('.page-section.-active').addClass('-mute').removeClass('-active')
      $(this.element).removeClass('-mute').addClass('-active')
    },
    offset: '50%'
  })
})
