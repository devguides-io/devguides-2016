var $ = require('jquery')
window.jQuery = window.$ = $
require('../helpers/jquery.autoexpand')

function prelude (__output, __inspect) {
  var console = {}
  console.log = function (obj) {
    __output('message', obj)
  }
  console.warn = console.error = function (obj) {
    __output('error', obj)
  }
  var alert = console.log
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
  var $example = $(this).closest('[role~="example"]')
  reveal()
  focusExample($example)
  runExample($example)
})

/*
 * Auto-run examples
 */

$(function () {
  $('[role~="example"][data-auto="true"]').each(function () {
    runExample($(this))
  })
})

/*
 * Runs an example
 */

function runExample ($example) {
  var givens = $('[role~="given"] [role~="code"]').val()
  var code = $example.find('[role~="example-input"] [role~="code"]').val()

  var $output = $example.find('[role~="output"]')
  $output.removeClass('-hide')
  $output.html('')

  var fullcode = buildCode(givens, code)

  try {
    var fn = new Function('__output', fullcode)
    var result = fn(addOutput.bind(null, $output))
    var isLogged = (code.indexOf('console.') > -1 && typeof result === 'undefined')
    if (code.indexOf('\n') === -1 && !isLogged) {
      addOutput($output, 'result', result)
    }
  } catch (err) {
    addOutput($output, 'error', err)
  }
}

function addOutput ($output, kind, result) {
  $output.addClass('-highlight')
  $output.append($(`<div class="output-line -${kind}">`).append(inspect(result)))
  setTimeout(function () { $output.removeClass('-highlight') }, 100)
}

/*
 * Builds the final code
 */

function buildCode (givens, code) {
  var exCode = (code.trim().indexOf('\n') > -1 ? code : ('return (' + code +')'))
  var fullcode = '' + getPrelude() + ';'
    + givens + ';\n'
    + exCode

  return fullcode
}

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
 * Show all "given" code.
 * Skip if there's nothing to show.
 */

function reveal () {
  var $givenBlock = $('[role~="givens"]')
  var $givens = $('[role~="given"]:not(.-hide)')
  if ($givens.length) {
    $givenBlock.slideDown().removeClass('-hide')
  }
}

$(document).on('focus', '[role~="example-input"] [role~="code"]', function () {
  var $example = $(this).closest('[role~="example"]')
  reveal()
  focusExample($example)
  runExample($example)
})

/*
 * Focuses on an example
 */

function focusExample ($example) {
  // Move the given above it
  // $example.find('[role~="output"]').after($('[role~="givens"]'))
  $example.addClass('-focus')
  var $givens = $('[role~="givens"]')
  $example.find('[role~="example-input"]').before($givens)
  // setTimeout(function () { $givens.slideDown() }, 100)

  // Show hints
  $example.find('[role~="hint"]').removeClass('-hide')
}

/*
 * Autoexpand
 */

$(function () {
  $('[role~="given"] [role~="code"]').autoexpand({ extraLines: 1 })
  $('[role~="example-input"] [role~="code"]').autoexpand()
})

/*
 * Placeholder
 */

$(document).on('click', '[role~="placeholder"]', function () {
  var $example = $(this).closest('[role~="example"]')
  $(this).hide()
  $example.find('[role~="code"]').show().focus()
})
