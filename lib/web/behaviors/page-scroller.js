const onmount = require('onmount')
const $ = require('jquery')
const Hammer = require('hammerjs')

/*
 * Page scroller:
 * Swipe to scroll. It doesn't work!!
 */

onmount('.-mobile [data-js-page-scroller]', function (b) {
  var $this = $(this)

  var hammer = new Hammer(this)
  b.hammer = hammer

  hammer.on('swipe', function (e) {
    console.log('swiping')
    var direction = e.deltaX < 0 ? 1 : -1
    var width = $(window).width()

    var sx = $this.scrollLeft()
    var newX = sx + width * direction

    $this.animate({ scrollLeft: newX }, 150)
  })

}, function (b) {
  b.hammer.stop()
}, { detectMutate: true })
