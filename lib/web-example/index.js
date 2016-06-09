var $ = require('jquery')
window.$ = $

function prelude (__output, __inspect) {
  var console = {}
  console.log = function (obj) {
    __output.append($('<div class="output-line -message">').append(__inspect(obj)))
  }
}

/*
 * Returns the prelude code as a string
 */

function getPrelude () {
  return prelude.toString()
    .replace(/^[^{]*{/, '')
    .replace(/};?\n?$/, '')
}

$(document).on('click', '[role~="try"]', function () {
  reveal()
  var givens = $('[role~="given"] [role~="code"]').val()
  var code = $(this).closest('[role~="example"]').find('[role~="code"]').val()

  var fullcode = '' + getPrelude() + ';'
    + givens + ';\n'
    + 'return (' + code +')'

  var $output = $('[role~="output"]')
  $output.removeClass('-hide')
  $output.html('')

  try {
    console.log(fullcode)
    var fn = new Function('__output,__inspect', fullcode)
    var result = fn($output, inspect)
    $output.append($('<div class="output-line -result">').append(inspect(result)))
  } catch (err) {
    $output.append($('<div class="output-line -error">').append(inspect(err)))
  }
})

/*
 * Turns any JS object into a DOM element
 */

function inspect (object) {
  if (typeof object === 'undefined') {
    return '<code>undefined</code>'
  } else if (object instanceof Error) {
    return $('<span>').text(object.constructor.name + ':' + object.message)
  } else {
    return $('<span>').text(JSON.stringify(object))
  }
}

/*
 * Show all given code
 */

$(document).on('focus', '[role~="code"]', function () {
  reveal()
})

function reveal () {
  $('[role="given"]').removeClass('-hide')
}
