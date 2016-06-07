var $ = window.$

$(document).on('pages:load', function () {
  if ($('.next-progress').length) return

  var $progress = $('<div class="next-progress">')
  $progress.appendTo('body')

  setTimeout(function () {
    $progress.remove()
  }, 500)
})
