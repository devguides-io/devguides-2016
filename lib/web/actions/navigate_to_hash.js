var loadNextSlide = require('./load_next_slide')

/**
 * Internal: navigates to a given hash `hash`.
 *
 * It loads all slides and smooth-scrolls into the given slide.
 *
 *     navigateToHash('#recap')
 */

function navigateToHash (hash) {
  if (!hash) return

  loadNextSlide()

  var isDesktop = $('html.-desktop').length > 0

  var $heading = $(hash)
  var $section = $heading.closest('.page-section')
  var y = $section.offset().top
  var idx = $section.index()

  if (isDesktop) {
    $(document).queue(function (next) {
      setTimeout(next, 250 * .85)
      $('html, body').animate({ scrollTop: y - 16 }, 250)
    })
  } else {
    $('html, body').scrollTop(y)
  }
}

module.exports = navigateToHash
