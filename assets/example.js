(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! autoexpand (c) 2012, Rico Sta. Cruz. MIT License.
 *  http://github.com/rstacruz/jquery-stuff/tree/master/autoexpand */

// Makes a textarea automatically grow as you type.
//
//     $("#myform textarea").autoexpand();
//
// The textarea does not exist at the time this is called. (However, see
// 'Caveats' below)
//
// You can define the maximum height via CSS's `max-height`. Autoexpand also
// respects CSS's `min-height` & `height`, and HTML's `rows` attribute.
//
// Basic usage
// -----------
//
// This is a sensible default:
//
//     $("textarea.autoexpand").autoexpand();
//
// Now add `.autoexpand` to your textareas.
//
// Suggested usage
// ---------------
//
// Personally, I prefer this variation:
//
//     $("textarea.autoexpand:not([rows='1'])").autoexpand({ extraLines: 1, speed: 100 });
//     $("textarea.autoexpand[rows='1']").autoexpand();
//
// This makes `<textarea rows=1>` behave like a normal `<input type=text>`,
// except that it automatically grows as needed.  This is much like Facebook's
// comments field. Use this for inputs that are meant to take just a single
// line.
//
// For other textareas, you get one extra line. This makes pressing Return on
// those textareas not feel awkward.
//
// Caveat
// ------
//
// If you're going to create these textareas dynamically, or update their
// content dynamically, you'll need to retrigger the autoexpand event to resize
// it as needed.
//
//     $("textarea").trigger('autoexpand');
//
// Acknowledgements
// ----------------
//
// First based on:
// http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js?r=2

(function($) {

  var $shadow;

  $.fn.autoexpand = function(options) {
    var $this = this;

    options = $.extend({}, {
      extraLines: 0,     /* Extra padding (in number of lines) */
      preempt: true,     /* Preemptively add a new line before it reaches the end */
      preemptLength: 4,  /* Make a new line 4 letters before the end */
      throttle: 50,      /* Throttle the keydown updates */
      speed: 0           /* Fancyness. Be sure to add extraLines */
    }, options||{});

    // Transitions don't work well with the Enter key when there are no extraLines.
    if (options.speed > 0 && options.extraLines === 0) options.speed = 0;

    // The event handler that updates the 'shadow' div -- done on every
    // window resize to handle resizing of the textarea.
    var updateShadow = function() {
      var $textarea = $(this);

      // Sanity check: don't do anything if called prematurely
      if (!$textarea.length) return;

      // Lazy-create the shadow element if not available
      if (!$shadow || $shadow.closest(document.documentElement).length === 0) {
        $shadow = $('<div class="autoexpand-shadow">').appendTo(document.body);
      }

      // Initialize CSS for textarea
      if (!$textarea.data('autoexpand')) initTextarea($textarea);

      // Get the min-height. This takes `rows`, `min-height` and `height` into
      // consideration (thanks, browsers)
      var isFull = ($textarea.css('box-sizing') === 'border-box');
      var height = isFull ? $textarea.outerHeight() : $textarea.css('height');
      var minHeight = Math.max(minHeight, integer(height));

      $shadow.css({
        position:  'absolute',
        top:        -10000,
        left:       -10000,
        zIndex:     -100,
        width:      isFull ? $textarea.outerWidth() : $textarea.css('width'),
        minHeight:  minHeight,
        visibility: 'hidden',
        resize:     'none',
        borderColor: 'red', /* [1] */
        borderStyle: 'solid'
      });

      var props = ['fontFamily', 'fontSize', 'lineHeight', 'boxSizing', 'paddingTop',
      'paddingBottom', 'paddingLeft', 'paddingRight', 'wordWrap', 'whiteSpace',
      'textWrap', 'borderWidth'];

      for (var i=0; i<props.length; i++) {
        var prop = props[i];
        $shadow.css(prop, $textarea.css(prop));
      }

      // [1] = The 'border' doesn't quite capture 'solid 0px transparent' so we'll emulate it

      $shadow.textarea = $textarea;

      return $shadow;
    };

    var initTextarea = function($textarea) {
      $textarea.data('autoexpand', true);

      // Disable the resize gripper, manually resizing will interfere with
      // the autoexpand logic
      $textarea.css({ resize: 'none', overflow: 'hidden' });

      if (options.speed) {
        addTransition($textarea, 'height ' + options.speed + 'ms ease-in');
      }
    };

    var updateHeight = function() {
      var $textarea = $(this);

      // Sanity check: don't do anything if called prematurely
      if (!$textarea.length) return;

      if (!$shadow || !$shadow.textarea.is($textarea)) updateShadow.apply(this);

      // Build the value for the shadow. (preempt uses 'w' because it's the
      // widest in most fonts)
      var val = htmlescape($textarea.val());
      if (options.preempt) val += ' ' + times('w', options.preemptLength);
      if (options.extraLines > 0) val += times('<br/>&nbsp;', options.extraLines);

      $shadow.html(val);

      var isFull = ($textarea.css('box-sizing') === 'border-box');

      var height = isFull ? $shadow.outerHeight() : $shadow.css('height');
      var maxHeight = integer($textarea.css('max-height'));
      if ((maxHeight) && (height >= maxHeight)) height = maxHeight;

      $textarea.css('height', height);

      // If we've reached your max-height, show the scrollbars
      if (maxHeight !== null) {
        if (height === maxHeight) {
          $textarea.css({ 'overflow-y': 'auto' });
        } else {
          $textarea.css({ 'overflow-y': 'hidden' });
        }
      }
    };

    var updateAll = function() { updateShadow.apply(this); updateHeight.apply(this); };

    // Bind events.
    $(document).on('focus', this.selector, updateAll);
    $(document).on('input change', this.selector, throttle(updateHeight, options.throttle));
    $(window).on('resize', function() { $this.each(updateAll); });

    // Allow manually updating the height via `.trigger('autoexpand')`
    $(document).on('autoexpand', this.selector, updateAll);

    // Trigger immediately
    $(function() { $this.each(updateAll); });

    return this;
  };

  // Converts a string (like "32px") to integer.
  function integer(str) {
    var i = parseInt(str, 10);
    return isNaN(i) ? null : i;
  }

  function throttle(fn, speed) {
    return (speed && window._ && window._.throttle) ?
      window._.throttle(fn, speed) :
      fn;
  }

  // Escapes a `string` to HTML entities.
  function htmlescape(string) {
    return string
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/\n$/, '<br/>&nbsp;')
      .replace(/\n/g, '<br/>')
      .replace(/ {2,}/g, function(space) { return times('&nbsp;', space.length -1) + ' '; });
  }

  // Repeats a `string` a `number` of times.
  function times(string, number) {
    var re = '';
    for(var i = 0; i < number; i++) { re = re + string; }
    return re;
  }

  // Adds a transition `transition` to element `$el`.
  function addTransition($el, transition) {
    var value = $el.css('transition');
    if (value.length) value += ', ';
    value += transition;
    return $el.css({ transition: value });
  }

})(jQuery);

},{}],2:[function(require,module,exports){
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
  $output.append($('<div class="output-line ' + kind + '">').append(inspect(result)))
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

},{"../helpers/jquery.autoexpand":1,"jquery":"jquery"}]},{},[2]);
