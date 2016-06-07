var $ = window.$

module.exports = function onScrollUp (options, fn) {
  if (!options) options = {}
  var $window = $(window)
  var min = options.min || 10
  var lastY, bottomY, lastDirection, supress

  $window.on('scroll', function () {
    var newY = $window.scrollTop()

    if (typeof lastY === 'undefined') {
      lastY = newY
      bottomY = newY
      return
    }

    var newDirection = newY > lastY ? 'down' : 'up'

    if (newDirection === 'down') {
      bottomY = newY
      supress = false
    } else if (!supress && bottomY - newY > min) {
      fn()
      supress = true
    }

    lastY = newY
    lastDirection = newDirection
  })
}
