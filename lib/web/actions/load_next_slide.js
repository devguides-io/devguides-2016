/**
 * Internal: loads the next slide.
 */

function loadNextSlide () {
  var $placeholder = $('[role="next-waypoint"]')

  $('body').removeClass('-first-load')

  // Show all pages (but still muted!)
  $('.page-section.-hide').removeClass('-hide')
  $placeholder.remove()

  setTimeout(function () {
    Waypoint.refreshAll()
  })
}

module.exports = loadNextSlide
