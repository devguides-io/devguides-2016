const $ = require('jquery')
const onmount = require('onmount')

onmount('html.mobile', function () {
  if ($('html, body').scrollTop() === 0) {
    $('html, body').scrollTop(12)
  }
})
