(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../../lib/web')

},{"../../lib/web":4}],2:[function(require,module,exports){
var $ = window.$

$(document).on('pages:load', function () {
  if ($('.next-progress').length) return

  var $progress = $('<div class="next-progress">')
  $progress.appendTo('body')

  setTimeout(function () {
    $progress.remove()
  }, 500)
})

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
window.jQuery = window.$ = require('jquery')
require('waypoints/lib/jquery.waypoints')

var $ = window.$
var Waypoint = window.Waypoint

/*
 * Custom behaviors
 */

var onScrollUp = require('./helpers/on_scrollup')
require('./behaviors/next_progress')

/*
 * First load
 */

$(function () {
  // If pressing the 'back' button, just show everything
  if ($('body').scrollTop() !== 0 || window.location.hash !== '') return

  $('body').addClass('-first-load')
  var $sections = $('.page-section')

  // Don't add a next-waypoint unless there's a next page.
  if ($sections.length > 1) {
    $sections.addClass('-hide')
    $sections.eq(0).removeClass('-hide')
    $sections.parent().append($('<div role="next-waypoint"></div>'))
  }

  Waypoint.refreshAll()
})

/*
 * Infinite scroll
 */

$(function () {
  var $placeholder = $('[role="next-waypoint"]')
  var disabled

  $placeholder.waypoint({
    handler: function () {
      if (disabled) return
      var $next = $('.page-section.-hide').eq(0)
      $('body').removeClass('-first-load')

      // Disable until refresh; prevents double invocation.
      disabled = true

      $next.trigger('pages:load')
      $next.removeClass('-hide')

      // Remove on the last page to show.
      if ($('.page-section.-hide').length === 0) $placeholder.remove()

      // Ahuh

      setTimeout(function () {
        disabled = false
      }, 50)

      setTimeout(function () {
        window.Waypoint.refreshAll()
      })
    },
    offset: '70%'
  })
})

/*
 * Waypoints
 */

$(function () {
  var $pages = $('.page-section')

  $('.page-section').addClass('-mute')
  $('.page-section').waypoint({
    handler: onAdvance,
    offset: '50%',
    down: 'enter',
    up: 'exited'
  })

  $('.page-section').waypoint({
    handler: onRewind,
    offset: '-50%',
    down: 'exited',
    up: 'enter'
  })

  function onAdvance (direction) {
    if (direction !== 'down') return
    var $this = $(this.element)
    if ($this.is(':hidden')) return
    $this.trigger('pages:advance', { index: $pages.index(this.element) })
  }

  // There's a strange instance where its first appearance (via infinite scroll)
  // triggers htis
  function onRewind (direction) {
    if (direction !== 'up') return
    var $this = $(this.element)
    if ($this.is(':hidden')) return
    $this.trigger('pages:rewind', { index: $pages.index(this.element) })
  }

  $(document).trigger('pages:init', {
    count: $pages.length
  })
})

onScrollUp({ min: 128 }, function () {
  $(document).trigger('pages:showAll')
})

/*
 * Page change (muting)
 */

$(document).on('pages:showAll', function (e) {
  $('.page-section').removeClass('-mute').removeClass('-active')
})

$(document).on('pages:advance', '.page-section', function (e, options) {
  var $this = $(this)
  $('.page-section').addClass('-mute').removeClass('-active')
  $this.removeClass('-mute').addClass('-active')
})

/*
 * Page dots
 */

$(document).on('pages:init', function (e, options) {
  var $pagedots = $('<div class="page-dots -hide">')
  for (var i = 0; i < options.count; i++) {
    $('<a class="dot">').appendTo($pagedots)
  }
  $pagedots.appendTo('body')
})

$(document).on('pages:advance pages:rewind', '.page-section', function (e, options) {
  var $pagedots = $('.page-dots')
  var $dots = $pagedots.children()
  $dots.removeClass('-active')
  $pagedots.toggleClass('-hide', options.index === 0)

  // Never select the first dot.
  $dots.eq(Math.max(options.index, 1)).addClass('-active')
})

/*
 * iframe
 */

var iFrameResize = require('iframe-resizer')
iFrameResize.iframeResizer({
  resizedCallback: function () {
    console.log('resize')
    $(window).trigger('resize')
  }
}, 'iframe[seamless]')

},{"./behaviors/next_progress":2,"./helpers/on_scrollup":3,"iframe-resizer":5,"jquery":"jquery","waypoints/lib/jquery.waypoints":9}],5:[function(require,module,exports){

'use strict';

module.exports = require('./js');

},{"./js":8}],6:[function(require,module,exports){
/*
 * File: iframeResizer.contentWindow.js
 * Desc: Include this file in any page being loaded into an iframe
 *       to force the iframe to resize to the content size.
 * Requires: iframeResizer.js on host page.
 * Doc: https://github.com/davidjbradshaw/iframe-resizer
 * Author: David J. Bradshaw - dave@bradshaw.net
 * Contributor: Jure Mav - jure.mav@gmail.com
 * Contributor: Ian Caunce - ian@hallnet.co.uk
 */


;(function(window) {
	'use strict';

	var
		autoResize            = true,
		base                  = 10,
		bodyBackground        = '',
		bodyMargin            = 0,
		bodyMarginStr         = '',
		bodyObserver          = null,
		bodyPadding           = '',
		calculateWidth        = false,
		doubleEventList       = {'resize':1,'click':1},
		eventCancelTimer      = 128,
		firstRun              = true,
		height                = 1,
		heightCalcModeDefault = 'bodyOffset',
		heightCalcMode        = heightCalcModeDefault,
		initLock              = true,
		initMsg               = '',
		inPageLinks           = {},
		interval              = 32,
		intervalTimer         = null,
		logging               = false,
		msgID                 = '[iFrameSizer]',  //Must match host page msg ID
		msgIdLen              = msgID.length,
		myID                  = '',
		observer              = null,
		resetRequiredMethods  = {max:1,min:1,bodyScroll:1,documentElementScroll:1},
		resizeFrom            = 'child',
		sendPermit            = true,
		target                = window.parent,
		targetOriginDefault   = '*',
		tolerance             = 0,
		triggerLocked         = false,
		triggerLockedTimer    = null,
		throttledTimer        = 16,
		width                 = 1,
		widthCalcModeDefault  = 'scroll',
		widthCalcMode         = widthCalcModeDefault,
		win                   = window,
		messageCallback       = function(){warn('MessageCallback function not defined');},
		readyCallback         = function(){},
		pageInfoCallback      = function(){};


	function addEventListener(el,evt,func){
		/* istanbul ignore else */ // Not testable in phantonJS
		if ('addEventListener' in window){
			el.addEventListener(evt,func, false);
		} else if ('attachEvent' in window){ //IE
			el.attachEvent('on'+evt,func);
		}
	}

	function removeEventListener(el,evt,func){
		/* istanbul ignore else */ // Not testable in phantonJS
		if ('removeEventListener' in window){
			el.removeEventListener(evt,func, false);
		} else if ('detachEvent' in window){ //IE
			el.detachEvent('on'+evt,func);
		}
	}

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//Based on underscore.js
	function throttle(func) {
		var
			context, args, result,
			timeout = null,
			previous = 0,
			later = function() {
				previous = getNow();
				timeout = null;
				result = func.apply(context, args);
				if (!timeout) {
					context = args = null;
				}
			};

		return function() {
			var now = getNow();

			if (!previous) {
				previous = now;
			}

			var remaining = throttledTimer - (now - previous);

			context = this;
			args = arguments;

			if (remaining <= 0 || remaining > throttledTimer) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}

				previous = now;
				result = func.apply(context, args);

				if (!timeout) {
					context = args = null;
				}

			} else if (!timeout) {
				timeout = setTimeout(later, remaining);
			}

			return result;
		};
	}

	var getNow = Date.now || function() {
		/* istanbul ignore next */ // Not testable in PhantonJS
		return new Date().getTime();
	};

	function formatLogMsg(msg){
		return msgID + '[' + myID + ']' + ' ' + msg;
	}

	function log(msg){
		if (logging && ('object' === typeof window.console)){
			console.log(formatLogMsg(msg));
		}
	}

	function warn(msg){
		if ('object' === typeof window.console){
			console.warn(formatLogMsg(msg));
		}
	}


	function init(){
		readDataFromParent();
		log('Initialising iFrame ('+location.href+')');
		readDataFromPage();
		setMargin();
		setBodyStyle('background',bodyBackground);
		setBodyStyle('padding',bodyPadding);
		injectClearFixIntoBodyElement();
		checkHeightMode();
		checkWidthMode();
		stopInfiniteResizingOfIFrame();
		setupPublicMethods();
		startEventListeners();
		inPageLinks = setupInPageLinks();
		sendSize('init','Init message from host page');
		readyCallback();
	}

	function readDataFromParent(){

		function strBool(str){
			return 'true' === str ? true : false;
		}

		var data = initMsg.substr(msgIdLen).split(':');

		myID               = data[0];
		bodyMargin         = (undefined !== data[1]) ? Number(data[1])   : bodyMargin; //For V1 compatibility
		calculateWidth     = (undefined !== data[2]) ? strBool(data[2])  : calculateWidth;
		logging            = (undefined !== data[3]) ? strBool(data[3])  : logging;
		interval           = (undefined !== data[4]) ? Number(data[4])   : interval;
		autoResize         = (undefined !== data[6]) ? strBool(data[6])  : autoResize;
		bodyMarginStr      = data[7];
		heightCalcMode     = (undefined !== data[8]) ? data[8]           : heightCalcMode;
		bodyBackground     = data[9];
		bodyPadding        = data[10];
		tolerance          = (undefined !== data[11]) ? Number(data[11]) : tolerance;
		inPageLinks.enable = (undefined !== data[12]) ? strBool(data[12]): false;
		resizeFrom         = (undefined !== data[13]) ? data[13]         : resizeFrom;
		widthCalcMode      = (undefined !== data[14]) ? data[14]         : widthCalcMode;
	}

	function readDataFromPage(){
		function readData(){
			var data = window.iFrameResizer;

			log('Reading data from page: ' + JSON.stringify(data));

			messageCallback     = ('messageCallback'         in data) ? data.messageCallback         : messageCallback;
			readyCallback       = ('readyCallback'           in data) ? data.readyCallback           : readyCallback;
			targetOriginDefault = ('targetOrigin'            in data) ? data.targetOrigin            : targetOriginDefault;
			heightCalcMode      = ('heightCalculationMethod' in data) ? data.heightCalculationMethod : heightCalcMode;
			widthCalcMode       = ('widthCalculationMethod'  in data) ? data.widthCalculationMethod  : widthCalcMode;
		}

		if(('iFrameResizer' in window) && (Object === window.iFrameResizer.constructor)) {
			readData();
		}

		log('TargetOrigin for parent set to: ' + targetOriginDefault);
	}


	function chkCSS(attr,value){
		if (-1 !== value.indexOf('-')){
			warn('Negative CSS value ignored for '+attr);
			value='';
		}
		return value;
	}

	function setBodyStyle(attr,value){
		if ((undefined !== value) && ('' !== value) && ('null' !== value)){
			document.body.style[attr] = value;
			log('Body '+attr+' set to "'+value+'"');
		}
	}

	function setMargin(){
		//If called via V1 script, convert bodyMargin from int to str
		if (undefined === bodyMarginStr){
			bodyMarginStr = bodyMargin+'px';
		}

		setBodyStyle('margin',chkCSS('margin',bodyMarginStr));
	}

	function stopInfiniteResizingOfIFrame(){
		document.documentElement.style.height = '';
		document.body.style.height = '';
		log('HTML & body height set to "auto"');
	}


	function manageTriggerEvent(options){
		function handleEvent(){
			sendSize(options.eventName,options.eventType);
		}

		var listener = {
			add:    function(eventName){
				addEventListener(window,eventName,handleEvent);
			},
			remove: function(eventName){
				removeEventListener(window,eventName,handleEvent);
			}
		};

		if(options.eventNames && Array.prototype.map){
			options.eventName = options.eventNames[0];
			options.eventNames.map(listener[options.method]);
		} else {
			listener[options.method](options.eventName);
		}

		log(capitalizeFirstLetter(options.method) + ' event listener: ' + options.eventType);
	}

	function manageEventListeners(method){
		manageTriggerEvent({method:method, eventType: 'Animation Start',           eventNames: ['animationstart','webkitAnimationStart'] });
		manageTriggerEvent({method:method, eventType: 'Animation Iteration',       eventNames: ['animationiteration','webkitAnimationIteration'] });
		manageTriggerEvent({method:method, eventType: 'Animation End',             eventNames: ['animationend','webkitAnimationEnd'] });
		manageTriggerEvent({method:method, eventType: 'Input',                     eventName:  'input' });
		manageTriggerEvent({method:method, eventType: 'Mouse Up',                  eventName:  'mouseup' });
		manageTriggerEvent({method:method, eventType: 'Mouse Down',                eventName:  'mousedown' });
		manageTriggerEvent({method:method, eventType: 'Orientation Change',        eventName:  'orientationchange' });
		manageTriggerEvent({method:method, eventType: 'Print',                     eventName:  ['afterprint', 'beforeprint'] });
		manageTriggerEvent({method:method, eventType: 'Ready State Change',        eventName:  'readystatechange' });
		manageTriggerEvent({method:method, eventType: 'Touch Start',               eventName:  'touchstart' });
		manageTriggerEvent({method:method, eventType: 'Touch End',                 eventName:  'touchend' });
		manageTriggerEvent({method:method, eventType: 'Touch Cancel',              eventName:  'touchcancel' });
		manageTriggerEvent({method:method, eventType: 'Transition Start',          eventNames: ['transitionstart','webkitTransitionStart','MSTransitionStart','oTransitionStart','otransitionstart'] });
		manageTriggerEvent({method:method, eventType: 'Transition Iteration',      eventNames: ['transitioniteration','webkitTransitionIteration','MSTransitionIteration','oTransitionIteration','otransitioniteration'] });
		manageTriggerEvent({method:method, eventType: 'Transition End',            eventNames: ['transitionend','webkitTransitionEnd','MSTransitionEnd','oTransitionEnd','otransitionend'] });
		if('child' === resizeFrom){
			manageTriggerEvent({method:method, eventType: 'IFrame Resized',        eventName:  'resize' });
		}
	}

	function checkCalcMode(calcMode,calcModeDefault,modes,type){
		if (calcModeDefault !== calcMode){
			if (!(calcMode in modes)){
				warn(calcMode + ' is not a valid option for '+type+'CalculationMethod.');
				calcMode=calcModeDefault;
			}
			log(type+' calculation method set to "'+calcMode+'"');
		}

		return calcMode;
	}

	function checkHeightMode(){
		heightCalcMode = checkCalcMode(heightCalcMode,heightCalcModeDefault,getHeight,'height');
	}

	function checkWidthMode(){
		widthCalcMode = checkCalcMode(widthCalcMode,widthCalcModeDefault,getWidth,'width');
	}

	function startEventListeners(){
		if ( true === autoResize ) {
			manageEventListeners('add');
			setupMutationObserver();
		}
		else {
			log('Auto Resize disabled');
		}
	}

	function stopMsgsToParent(){
		log('Disable outgoing messages');
		sendPermit = false;
	}

	function removeMsgListener(){
		log('Remove event listener: Message');
		removeEventListener(window, 'message', receiver);
	}

	function disconnectMutationObserver(){
		if (null !== bodyObserver){
			/* istanbul ignore next */ // Not testable in PhantonJS
			bodyObserver.disconnect();
		}
	}

	function stopEventListeners(){
		manageEventListeners('remove');
		disconnectMutationObserver();
		clearInterval(intervalTimer);
	}

	function teardown(){
		stopMsgsToParent();
		removeMsgListener();
		if (true === autoResize) stopEventListeners();
	}

	function injectClearFixIntoBodyElement(){
		var clearFix = document.createElement('div');
		clearFix.style.clear   = 'both';
		clearFix.style.display = 'block'; //Guard against this having been globally redefined in CSS.
		document.body.appendChild(clearFix);
	}

	function setupInPageLinks(){

		function getPagePosition (){
			return {
				x: (window.pageXOffset !== undefined) ? window.pageXOffset : document.documentElement.scrollLeft,
				y: (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop
			};
		}

		function getElementPosition(el){
			var
				elPosition   = el.getBoundingClientRect(),
				pagePosition = getPagePosition();

			return {
				x: parseInt(elPosition.left,10) + parseInt(pagePosition.x,10),
				y: parseInt(elPosition.top,10)  + parseInt(pagePosition.y,10)
			};
		}

		function findTarget(location){
			function jumpToTarget(target){
				var jumpPosition = getElementPosition(target);

				log('Moving to in page link (#'+hash+') at x: '+jumpPosition.x+' y: '+jumpPosition.y);
				sendMsg(jumpPosition.y, jumpPosition.x, 'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
			}

			var
				hash     = location.split('#')[1] || location, //Remove # if present
				hashData = decodeURIComponent(hash),
				target   = document.getElementById(hashData) || document.getElementsByName(hashData)[0];

			if (undefined !== target){
				jumpToTarget(target);
			} else {
				log('In page link (#' + hash + ') not found in iFrame, so sending to parent');
				sendMsg(0,0,'inPageLink','#'+hash);
			}
		}

		function checkLocationHash(){
			if ('' !== location.hash && '#' !== location.hash){
				findTarget(location.href);
			}
		}

		function bindAnchors(){
			function setupLink(el){
				function linkClicked(e){
					e.preventDefault();

					/*jshint validthis:true */
					findTarget(this.getAttribute('href'));
				}

				if ('#' !== el.getAttribute('href')){
					addEventListener(el,'click',linkClicked);
				}
			}

			Array.prototype.forEach.call( document.querySelectorAll( 'a[href^="#"]' ), setupLink );
		}

		function bindLocationHash(){
			addEventListener(window,'hashchange',checkLocationHash);
		}

		function initCheck(){ //check if page loaded with location hash after init resize
			setTimeout(checkLocationHash,eventCancelTimer);
		}

		function enableInPageLinks(){
			/* istanbul ignore else */ // Not testable in phantonJS
			if(Array.prototype.forEach && document.querySelectorAll){
				log('Setting up location.hash handlers');
				bindAnchors();
				bindLocationHash();
				initCheck();
			} else {
				warn('In page linking not fully supported in this browser! (See README.md for IE8 workaround)');
			}
		}

		if(inPageLinks.enable){
			enableInPageLinks();
		} else {
			log('In page linking not enabled');
		}

		return {
			findTarget:findTarget
		};
	}

	function setupPublicMethods(){
		log('Enable public methods');

		win.parentIFrame = {

			autoResize: function autoResizeF(resize){
				if (true === resize && false === autoResize) {
					autoResize=true;
					startEventListeners();
					//sendSize('autoResize','Auto Resize enabled');
				} else if (false === resize && true === autoResize) {
					autoResize=false;
					stopEventListeners();
				}

				return autoResize;
			},

			close: function closeF(){
				sendMsg(0,0,'close');
				teardown();
			},

			getId: function getIdF(){
				return myID;
			},

			getPageInfo: function getPageInfoF(callback){
				if ('function' === typeof callback){
					pageInfoCallback = callback;
					sendMsg(0,0,'pageInfo');
				} else {
					pageInfoCallback = function(){};
					sendMsg(0,0,'pageInfoStop');
				}
			},

			moveToAnchor: function moveToAnchorF(hash){
				inPageLinks.findTarget(hash);
			},

			reset: function resetF(){
				resetIFrame('parentIFrame.reset');
			},

			scrollTo: function scrollToF(x,y){
				sendMsg(y,x,'scrollTo'); // X&Y reversed at sendMsg uses height/width
			},

			scrollToOffset: function scrollToF(x,y){
				sendMsg(y,x,'scrollToOffset'); // X&Y reversed at sendMsg uses height/width
			},

			sendMessage: function sendMessageF(msg,targetOrigin){
				sendMsg(0,0,'message',JSON.stringify(msg),targetOrigin);
			},

			setHeightCalculationMethod: function setHeightCalculationMethodF(heightCalculationMethod){
				heightCalcMode = heightCalculationMethod;
				checkHeightMode();
			},

			setWidthCalculationMethod: function setWidthCalculationMethodF(widthCalculationMethod){
				widthCalcMode = widthCalculationMethod;
				checkWidthMode();
			},

			setTargetOrigin: function setTargetOriginF(targetOrigin){
				log('Set targetOrigin: '+targetOrigin);
				targetOriginDefault = targetOrigin;
			},

			size: function sizeF(customHeight, customWidth){
				var valString = ''+(customHeight?customHeight:'')+(customWidth?','+customWidth:'');
				//lockTrigger();
				sendSize('size','parentIFrame.size('+valString+')', customHeight, customWidth);
			}
		};
	}

	function initInterval(){
		if ( 0 !== interval ){
			log('setInterval: '+interval+'ms');
			intervalTimer = setInterval(function(){
				sendSize('interval','setInterval: '+interval);
			},Math.abs(interval));
		}
	}

	/* istanbul ignore next */  //Not testable in PhantomJS
	function setupBodyMutationObserver(){
		function addImageLoadListners(mutation) {
			function addImageLoadListener(element){
				if (false === element.complete) {
					log('Attach listeners to ' + element.src);
					element.addEventListener('load', imageLoaded, false);
					element.addEventListener('error', imageError, false);
					elements.push(element);
				}
			}

			if (mutation.type === 'attributes' && mutation.attributeName === 'src'){
				addImageLoadListener(mutation.target);
			} else if (mutation.type === 'childList'){
				Array.prototype.forEach.call(
					mutation.target.querySelectorAll('img'),
					addImageLoadListener
				);
			}
		}

		function removeFromArray(element){
			elements.splice(elements.indexOf(element),1);
		}

		function removeImageLoadListener(element){
			log('Remove listeners from ' + element.src);
			element.removeEventListener('load', imageLoaded, false);
			element.removeEventListener('error', imageError, false);
			removeFromArray(element);
		}

		function imageEventTriggered(event,type,typeDesc){
			removeImageLoadListener(event.target);
			sendSize(type, typeDesc + ': ' + event.target.src, undefined, undefined);
		}

		function imageLoaded(event) {
			imageEventTriggered(event,'imageLoad','Image loaded');
		}

		function imageError(event) {
			imageEventTriggered(event,'imageLoadFailed','Image load failed');
		}

		function mutationObserved(mutations) {
			sendSize('mutationObserver','mutationObserver: ' + mutations[0].target + ' ' + mutations[0].type);

			//Deal with WebKit asyncing image loading when tags are injected into the page
			mutations.forEach(addImageLoadListners);
		}

		function createMutationObserver(){
			var
				target = document.querySelector('body'),

				config = {
					attributes            : true,
					attributeOldValue     : false,
					characterData         : true,
					characterDataOldValue : false,
					childList             : true,
					subtree               : true
				};

			observer = new MutationObserver(mutationObserved);

			log('Create body MutationObserver');
			observer.observe(target, config);

			return observer;
		}

		var
			elements         = [],
			MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
			observer         = createMutationObserver();

		return {
			disconnect: function (){
				if ('disconnect' in observer){
					log('Disconnect body MutationObserver');
					observer.disconnect();
					elements.forEach(removeImageLoadListener);
				}
			}
		};
	}

	function setupMutationObserver(){
		var	forceIntervalTimer = 0 > interval;

		/* istanbul ignore if */ // Not testable in PhantomJS
		if (window.MutationObserver || window.WebKitMutationObserver){
			if (forceIntervalTimer) {
				initInterval();
			} else {
				bodyObserver = setupBodyMutationObserver();
			}
		} else {
			log('MutationObserver not supported in this browser!');
			initInterval();
		}
	}


	// document.documentElement.offsetHeight is not reliable, so
	// we have to jump through hoops to get a better value.
	function getComputedStyle(prop,el) {
		/* istanbul ignore next */  //Not testable in PhantomJS
		function convertUnitsToPxForIE8(value) {
			var PIXEL = /^\d+(px)?$/i;

			if (PIXEL.test(value)) {
				return parseInt(value,base);
			}

			var
				style = el.style.left,
				runtimeStyle = el.runtimeStyle.left;

			el.runtimeStyle.left = el.currentStyle.left;
			el.style.left = value || 0;
			value = el.style.pixelLeft;
			el.style.left = style;
			el.runtimeStyle.left = runtimeStyle;

			return value;
		}

		var retVal = 0;
		el =  el || document.body;

		/* istanbul ignore else */ // Not testable in phantonJS
		if (('defaultView' in document) && ('getComputedStyle' in document.defaultView)) {
			retVal = document.defaultView.getComputedStyle(el, null);
			retVal = (null !== retVal) ? retVal[prop] : 0;
		} else {//IE8
			retVal =  convertUnitsToPxForIE8(el.currentStyle[prop]);
		}

		return parseInt(retVal,base);
	}

	function chkEventThottle(timer){
		if(timer > throttledTimer/2){
			throttledTimer = 2*timer;
			log('Event throttle increased to ' + throttledTimer + 'ms');
		}
	}

	//Idea from https://github.com/guardian/iframe-messenger
	function getMaxElement(side,elements) {
		var
			elementsLength = elements.length,
			elVal          = 0,
			maxVal         = 0,
			Side           = capitalizeFirstLetter(side),
			timer          = getNow();

		for (var i = 0; i < elementsLength; i++) {
			elVal = elements[i].getBoundingClientRect()[side] + getComputedStyle('margin'+Side,elements[i]);
			if (elVal > maxVal) {
				maxVal = elVal;
			}
		}

		timer = getNow() - timer;

		log('Parsed '+elementsLength+' HTML elements');
		log('Element position calculated in ' + timer + 'ms');

		chkEventThottle(timer);

		return maxVal;
	}

	function getAllMeasurements(dimention){
		return [
			dimention.bodyOffset(),
			dimention.bodyScroll(),
			dimention.documentElementOffset(),
			dimention.documentElementScroll()
		];
	}

	function getTaggedElements(side,tag){
		function noTaggedElementsFound(){
			warn('No tagged elements ('+tag+') found on page');
			return height; //current height
		}

		var elements = document.querySelectorAll('['+tag+']');

		return 0 === elements.length ?  noTaggedElementsFound() : getMaxElement(side,elements);
	}

	function getAllElements(){
		return document.querySelectorAll('body *');
	}

	var
		getHeight = {
			bodyOffset: function getBodyOffsetHeight(){
				return  document.body.offsetHeight + getComputedStyle('marginTop') + getComputedStyle('marginBottom');
			},

			offset: function(){
				return getHeight.bodyOffset(); //Backwards compatability
			},

			bodyScroll: function getBodyScrollHeight(){
				return document.body.scrollHeight;
			},

			documentElementOffset: function getDEOffsetHeight(){
				return document.documentElement.offsetHeight;
			},

			documentElementScroll: function getDEScrollHeight(){
				return document.documentElement.scrollHeight;
			},

			max: function getMaxHeight(){
				return Math.max.apply(null,getAllMeasurements(getHeight));
			},

			min: function getMinHeight(){
				return Math.min.apply(null,getAllMeasurements(getHeight));
			},

			grow: function growHeight(){
				return getHeight.max(); //Run max without the forced downsizing
			},

			lowestElement: function getBestHeight(){
				return Math.max(getHeight.bodyOffset(), getMaxElement('bottom',getAllElements()));
			},

			taggedElement: function getTaggedElementsHeight(){
				return getTaggedElements('bottom','data-iframe-height');
			}
		},

		getWidth = {
			bodyScroll: function getBodyScrollWidth(){
				return document.body.scrollWidth;
			},

			bodyOffset: function getBodyOffsetWidth(){
				return document.body.offsetWidth;
			},

			documentElementScroll: function getDEScrollWidth(){
				return document.documentElement.scrollWidth;
			},

			documentElementOffset: function getDEOffsetWidth(){
				return document.documentElement.offsetWidth;
			},

			scroll: function getMaxWidth(){
				return Math.max(getWidth.bodyScroll(), getWidth.documentElementScroll());
			},

			max: function getMaxWidth(){
				return Math.max.apply(null,getAllMeasurements(getWidth));
			},

			min: function getMinWidth(){
				return Math.min.apply(null,getAllMeasurements(getWidth));
			},

			rightMostElement: function rightMostElement(){
				return getMaxElement('right', getAllElements());
			},

			taggedElement: function getTaggedElementsWidth(){
				return getTaggedElements('right', 'data-iframe-width');
			}
		};


	function sizeIFrame(triggerEvent, triggerEventDesc, customHeight, customWidth){

		function resizeIFrame(){
			height = currentHeight;
			width  = currentWidth;

			sendMsg(height,width,triggerEvent);
		}

		function isSizeChangeDetected(){
			function checkTolarance(a,b){
				var retVal = Math.abs(a-b) <= tolerance;
				return !retVal;
			}

			currentHeight = (undefined !== customHeight)  ? customHeight : getHeight[heightCalcMode]();
			currentWidth  = (undefined !== customWidth )  ? customWidth  : getWidth[widthCalcMode]();

			return	checkTolarance(height,currentHeight) || (calculateWidth && checkTolarance(width,currentWidth));
		}

		function isForceResizableEvent(){
			return !(triggerEvent in {'init':1,'interval':1,'size':1});
		}

		function isForceResizableCalcMode(){
			return (heightCalcMode in resetRequiredMethods) || (calculateWidth && widthCalcMode in resetRequiredMethods);
		}

		function logIgnored(){
			log('No change in size detected');
		}

		function checkDownSizing(){
			if (isForceResizableEvent() && isForceResizableCalcMode()){
				resetIFrame(triggerEventDesc);
			} else if (!(triggerEvent in {'interval':1})){
				logIgnored();
			}
		}

		var	currentHeight,currentWidth;

		if (isSizeChangeDetected() || 'init' === triggerEvent){
			lockTrigger();
			resizeIFrame();
		} else {
			checkDownSizing();
		}
	}

	var sizeIFrameThrottled = throttle(sizeIFrame);

	function sendSize(triggerEvent, triggerEventDesc, customHeight, customWidth){
		function recordTrigger(){
			if (!(triggerEvent in {'reset':1,'resetPage':1,'init':1})){
				log( 'Trigger event: ' + triggerEventDesc );
			}
		}

		function isDoubleFiredEvent(){
			return  triggerLocked && (triggerEvent in doubleEventList);
		}

		if (!isDoubleFiredEvent()){
			recordTrigger();
			sizeIFrameThrottled(triggerEvent, triggerEventDesc, customHeight, customWidth);
		} else {
			log('Trigger event cancelled: '+triggerEvent);
		}
	}

	function lockTrigger(){
		if (!triggerLocked){
			triggerLocked = true;
			log('Trigger event lock on');
		}
		clearTimeout(triggerLockedTimer);
		triggerLockedTimer = setTimeout(function(){
			triggerLocked = false;
			log('Trigger event lock off');
			log('--');
		},eventCancelTimer);
	}

	function triggerReset(triggerEvent){
		height = getHeight[heightCalcMode]();
		width  = getWidth[widthCalcMode]();

		sendMsg(height,width,triggerEvent);
	}

	function resetIFrame(triggerEventDesc){
		var hcm = heightCalcMode;
		heightCalcMode = heightCalcModeDefault;

		log('Reset trigger event: ' + triggerEventDesc);
		lockTrigger();
		triggerReset('reset');

		heightCalcMode = hcm;
	}

	function sendMsg(height,width,triggerEvent,msg,targetOrigin){
		function setTargetOrigin(){
			if (undefined === targetOrigin){
				targetOrigin = targetOriginDefault;
			} else {
				log('Message targetOrigin: '+targetOrigin);
			}
		}

		function sendToParent(){
			var
				size  = height + ':' + width,
				message = myID + ':' +  size + ':' + triggerEvent + (undefined !== msg ? ':' + msg : '');

			log('Sending message to host page (' + message + ')');
			target.postMessage( msgID + message, targetOrigin);
		}

		if(true === sendPermit){
			setTargetOrigin();
			sendToParent();
		}
	}

	function receiver(event) {
		function isMessageForUs(){
			return msgID === (''+event.data).substr(0,msgIdLen); //''+ Protects against non-string messages
		}

		function initFromParent(){
			initMsg = event.data;
			target  = event.source;

			init();
			firstRun = false;
			setTimeout(function(){ initLock = false;},eventCancelTimer);
		}

		function resetFromParent(){
			if (!initLock){
				log('Page size reset by host page');
				triggerReset('resetPage');
			} else {
				log('Page reset ignored by init');
			}
		}

		function resizeFromParent(){
			sendSize('resizeParent','Parent window requested size check');
		}

		function moveToAnchor(){
			var anchor = getData();
			inPageLinks.findTarget(anchor);
		}

		function getMessageType(){
			return event.data.split(']')[1].split(':')[0];
		}

		function getData(){
			return event.data.substr(event.data.indexOf(':')+1);
		}

		function isMiddleTier(){
			return ('iFrameResize' in window);
		}

		function messageFromParent(){
			var msgBody = getData();

			log('MessageCallback called from parent: ' + msgBody );
			messageCallback(JSON.parse(msgBody));
			log(' --');
		}

		function pageInfoFromParent(){
			var msgBody = getData();
			log('PageInfoFromParent called from parent: ' + msgBody );
			pageInfoCallback(JSON.parse(msgBody));
			log(' --');
		}

		function isInitMsg(){
			//Test if this message is from a child below us. This is an ugly test, however, updating
			//the message format would break backwards compatibity.
			return event.data.split(':')[2] in {'true':1,'false':1};
		}

		function callFromParent(){
			switch (getMessageType()){
			case 'reset':
				resetFromParent();
				break;
			case 'resize':
				resizeFromParent();
				break;
			case 'moveToAnchor':
				moveToAnchor();
				break;
			case 'message':
				messageFromParent();
				break;
			case 'pageInfo':
				pageInfoFromParent();
				break;
			default:
				if (!isMiddleTier() && !isInitMsg()){
					warn('Unexpected message ('+event.data+')');
				}
			}
		}

		function processMessage(){
			if (false === firstRun) {
				callFromParent();
			} else if (isInitMsg()) {
				initFromParent();
			} else {
				log('Ignored message of type "' + getMessageType() + '". Received before initialization.');
			}
		}

		if (isMessageForUs()){
			processMessage();
		}
	}

	//Normally the parent kicks things off when it detects the iFrame has loaded.
	//If this script is async-loaded, then tell parent page to retry init.
	function chkLateLoaded(){
		if('loading' !== document.readyState){
			window.parent.postMessage('[iFrameResizerChild]Ready','*');
		}
	}

	addEventListener(window, 'message', receiver);
	chkLateLoaded();

	

})(window || {});

},{}],7:[function(require,module,exports){
/*
 * File: iframeResizer.js
 * Desc: Force iframes to size to content.
 * Requires: iframeResizer.contentWindow.js to be loaded into the target frame.
 * Doc: https://github.com/davidjbradshaw/iframe-resizer
 * Author: David J. Bradshaw - dave@bradshaw.net
 * Contributor: Jure Mav - jure.mav@gmail.com
 * Contributor: Reed Dadoune - reed@dadoune.com
 */


;(function(window) {
	'use strict';

	var
		count                 = 0,
		logEnabled            = false,
		hiddenCheckEnabled    = false,
		msgHeader             = 'message',
		msgHeaderLen          = msgHeader.length,
		msgId                 = '[iFrameSizer]', //Must match iframe msg ID
		msgIdLen              = msgId.length,
		pagePosition          = null,
		requestAnimationFrame = window.requestAnimationFrame,
		resetRequiredMethods  = {max:1,scroll:1,bodyScroll:1,documentElementScroll:1},
		settings              = {},
		timer                 = null,
		logId                 = 'Host Page',

		defaults              = {
			autoResize                : true,
			bodyBackground            : null,
			bodyMargin                : null,
			bodyMarginV1              : 8,
			bodyPadding               : null,
			checkOrigin               : true,
			inPageLinks               : false,
			enablePublicMethods       : true,
			heightCalculationMethod   : 'bodyOffset',
			id                        : 'iFrameResizer',
			interval                  : 32,
			log                       : false,
			maxHeight                 : Infinity,
			maxWidth                  : Infinity,
			minHeight                 : 0,
			minWidth                  : 0,
			resizeFrom                : 'parent',
			scrolling                 : false,
			sizeHeight                : true,
			sizeWidth                 : false,
			tolerance                 : 0,
			widthCalculationMethod    : 'scroll',
			closedCallback            : function(){},
			initCallback              : function(){},
			messageCallback           : function(){warn('MessageCallback function not defined');},
			resizedCallback           : function(){},
			scrollCallback            : function(){return true;}
		};

	function addEventListener(obj,evt,func){
		/* istanbul ignore else */ // Not testable in PhantonJS
		if ('addEventListener' in window){
			obj.addEventListener(evt,func, false);
		} else if ('attachEvent' in window){//IE
			obj.attachEvent('on'+evt,func);
		}
	}

	function removeEventListener(el,evt,func){
		/* istanbul ignore else */ // Not testable in phantonJS
		if ('removeEventListener' in window){
			el.removeEventListener(evt,func, false);
		} else if ('detachEvent' in window){ //IE
			el.detachEvent('on'+evt,func);
		}
	}

	function setupRequestAnimationFrame(){
		var
			vendors = ['moz', 'webkit', 'o', 'ms'],
			x;

		// Remove vendor prefixing if prefixed and break early if not
		for (x = 0; x < vendors.length && !requestAnimationFrame; x += 1) {
			requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		}

		if (!(requestAnimationFrame)){
			log('setup','RequestAnimationFrame not supported');
		}
	}

	function getMyID(iframeId){
		var retStr = 'Host page: '+iframeId;

		if (window.top!==window.self){
			if (window.parentIFrame && window.parentIFrame.getId){
				retStr = window.parentIFrame.getId()+': '+iframeId;
			} else {
				retStr = 'Nested host page: '+iframeId;
			}
		}

		return retStr;
	}

	function formatLogHeader(iframeId){
		return msgId + '[' + getMyID(iframeId) + ']';
	}

	function isLogEnabled(iframeId){
		return settings[iframeId] ? settings[iframeId].log : logEnabled;
	}

	function log(iframeId,msg){
		output('log',iframeId,msg,isLogEnabled(iframeId));
	}

	function info(iframeId,msg){
		output('info',iframeId,msg,isLogEnabled(iframeId));
	}

	function warn(iframeId,msg){
		output('warn',iframeId,msg,true);
	}

	function output(type,iframeId,msg,enabled){
		if (true === enabled && 'object' === typeof window.console){
			console[type](formatLogHeader(iframeId),msg);
		}
	}

	function iFrameListener(event){
		function resizeIFrame(){
			function resize(){
				setSize(messageData);
				setPagePosition(iframeId);
			}

			ensureInRange('Height');
			ensureInRange('Width');

			syncResize(resize,messageData,'init');
		}

		function processMsg(){
			var data = msg.substr(msgIdLen).split(':');

			return {
				iframe: settings[data[0]].iframe,
				id:     data[0],
				height: data[1],
				width:  data[2],
				type:   data[3]
			};
		}

		function ensureInRange(Dimension){
			var
				max  = Number(settings[iframeId]['max' + Dimension]),
				min  = Number(settings[iframeId]['min' + Dimension]),
				dimension = Dimension.toLowerCase(),
				size = Number(messageData[dimension]);

			log(iframeId,'Checking ' + dimension + ' is in range ' + min + '-' + max);

			if (size<min) {
				size=min;
				log(iframeId,'Set ' + dimension + ' to min value');
			}

			if (size>max) {
				size=max;
				log(iframeId,'Set ' + dimension + ' to max value');
			}

			messageData[dimension] = '' + size;
		}


		function isMessageFromIFrame(){
			function checkAllowedOrigin(){
				function checkList(){
					var
						i = 0,
						retCode = false;

					log(iframeId,'Checking connection is from allowed list of origins: ' + checkOrigin);

					for (; i < checkOrigin.length; i++) {
						if (checkOrigin[i] === origin) {
							retCode = true;
							break;
						}
					}
					return retCode;
				}

				function checkSingle(){
					var remoteHost  = settings[iframeId].remoteHost;
					log(iframeId,'Checking connection is from: '+remoteHost);
					return origin === remoteHost;
				}

				return checkOrigin.constructor === Array ? checkList() : checkSingle();
			}

			var
				origin      = event.origin,
				checkOrigin = settings[iframeId].checkOrigin;

			if (checkOrigin && (''+origin !== 'null') && !checkAllowedOrigin()) {
				throw new Error(
					'Unexpected message received from: ' + origin +
					' for ' + messageData.iframe.id +
					'. Message was: ' + event.data +
					'. This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.'
				);
			}

			return true;
		}

		function isMessageForUs(){
			return msgId === (('' + msg).substr(0,msgIdLen)) && (msg.substr(msgIdLen).split(':')[0] in settings); //''+Protects against non-string msg
		}

		function isMessageFromMetaParent(){
			//Test if this message is from a parent above us. This is an ugly test, however, updating
			//the message format would break backwards compatibity.
			var retCode = messageData.type in {'true':1,'false':1,'undefined':1};

			if (retCode){
				log(iframeId,'Ignoring init message from meta parent page');
			}

			return retCode;
		}

		function getMsgBody(offset){
			return msg.substr(msg.indexOf(':')+msgHeaderLen+offset);
		}

		function forwardMsgFromIFrame(msgBody){
			log(iframeId,'MessageCallback passed: {iframe: '+ messageData.iframe.id + ', message: ' + msgBody + '}');
			callback('messageCallback',{
				iframe: messageData.iframe,
				message: JSON.parse(msgBody)
			});
			log(iframeId,'--');
		}

		function getPageInfo(){
			var
				bodyPosition   = document.body.getBoundingClientRect(),
				iFramePosition = messageData.iframe.getBoundingClientRect();

			return JSON.stringify({
				iframeHeight: iFramePosition.height,
				iframeWidth:  iFramePosition.width,
				clientHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
				clientWidth:  Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0),
				offsetTop:    parseInt(iFramePosition.top  - bodyPosition.top,  10),
				offsetLeft:   parseInt(iFramePosition.left - bodyPosition.left, 10),
				scrollTop:    window.pageYOffset,
				scrollLeft:   window.pageXOffset
			});
		}

		function sendPageInfoToIframe(iframe,iframeId){
			function debouncedTrigger(){
				trigger(
					'Send Page Info',
					'pageInfo:' + getPageInfo(), 
					iframe, 
					iframeId
				);
			}

			debouce(debouncedTrigger,32);
		}


		function startPageInfoMonitor(){
			function setListener(type,func){
				function sendPageInfo(){
					if (settings[id]){
						sendPageInfoToIframe(settings[id].iframe,id);
					} else {
						stop();
					}
				}

				['scroll','resize'].forEach(function(evt){
					log(id, type +  evt + ' listener for sendPageInfo');
					func(window,evt,sendPageInfo);
				});
			}

			function stop(){
				setListener('Remove ', removeEventListener);
			}

			function start(){
				setListener('Add ', addEventListener);
			}
			
			var id = iframeId; //Create locally scoped copy of iFrame ID

			start();

			settings[id].stopPageInfo = stop;
		}

		function stopPageInfoMonitor(){
			if (settings[iframeId] && settings[iframeId].stopPageInfo){
				settings[iframeId].stopPageInfo();
				delete settings[iframeId].stopPageInfo;
			}
		}

		function checkIFrameExists(){
			var retBool = true;

			if (null === messageData.iframe) {
				warn(iframeId,'IFrame ('+messageData.id+') not found');
				retBool = false;
			}
			return retBool;
		}

		function getElementPosition(target){
			var iFramePosition = target.getBoundingClientRect();

			getPagePosition(iframeId);

			return {
				x: Math.floor( Number(iFramePosition.left) + Number(pagePosition.x) ),
				y: Math.floor( Number(iFramePosition.top)  + Number(pagePosition.y) )
			};
		}

		function scrollRequestFromChild(addOffset){
			/* istanbul ignore next */  //Not testable in Karma
			function reposition(){
				pagePosition = newPosition;
				scrollTo();
				log(iframeId,'--');
			}

			function calcOffset(){
				return {
					x: Number(messageData.width) + offset.x,
					y: Number(messageData.height) + offset.y
				};
			}

			function scrollParent(){
				if (window.parentIFrame){
					window.parentIFrame['scrollTo'+(addOffset?'Offset':'')](newPosition.x,newPosition.y);
				} else {
					warn(iframeId,'Unable to scroll to requested position, window.parentIFrame not found');
				}
			}

			var
				offset = addOffset ? getElementPosition(messageData.iframe) : {x:0,y:0},
				newPosition = calcOffset();

			log(iframeId,'Reposition requested from iFrame (offset x:'+offset.x+' y:'+offset.y+')');

			if(window.top!==window.self){
				scrollParent();
			} else {
				reposition();
			}
		}

		function scrollTo(){
			if (false !== callback('scrollCallback',pagePosition)){
				setPagePosition(iframeId);
			} else {
				unsetPagePosition();
			}
		}

		function findTarget(location){
			function jumpToTarget(){
				var jumpPosition = getElementPosition(target);

				log(iframeId,'Moving to in page link (#'+hash+') at x: '+jumpPosition.x+' y: '+jumpPosition.y);
				pagePosition = {
					x: jumpPosition.x,
					y: jumpPosition.y
				};

				scrollTo();
				log(iframeId,'--');
			}

			function jumpToParent(){
				if (window.parentIFrame){
					window.parentIFrame.moveToAnchor(hash);
				} else {
					log(iframeId,'In page link #'+hash+' not found and window.parentIFrame not found');
				}
			}

			var
				hash     = location.split('#')[1] || '',
				hashData = decodeURIComponent(hash),
				target   = document.getElementById(hashData) || document.getElementsByName(hashData)[0];

			if (target){
				jumpToTarget();
			} else if(window.top!==window.self){
				jumpToParent();
			} else {
				log(iframeId,'In page link #'+hash+' not found');
			}
		}

		function callback(funcName,val){
			return chkCallback(iframeId,funcName,val);
		}

		function actionMsg(){

			if(settings[iframeId].firstRun) firstRun();

			switch(messageData.type){
			case 'close':
				closeIFrame(messageData.iframe);
				break;
			case 'message':
				forwardMsgFromIFrame(getMsgBody(6));
				break;
			case 'scrollTo':
				scrollRequestFromChild(false);
				break;
			case 'scrollToOffset':
				scrollRequestFromChild(true);
				break;
			case 'pageInfo':
				sendPageInfoToIframe(settings[iframeId].iframe,iframeId);
				startPageInfoMonitor();
				break;
			case 'pageInfoStop':
				stopPageInfoMonitor();
				break;
			case 'inPageLink':
				findTarget(getMsgBody(9));
				break;
			case 'reset':
				resetIFrame(messageData);
				break;
			case 'init':
				resizeIFrame();
				callback('initCallback',messageData.iframe);
				callback('resizedCallback',messageData);
				break;
			default:
				resizeIFrame();
				callback('resizedCallback',messageData);
			}
		}

		function hasSettings(iframeId){
			var retBool = true;

			if (!settings[iframeId]){
				retBool = false;
				warn(messageData.type + ' No settings for ' + iframeId + '. Message was: ' + msg);
			}

			return retBool;
		}

		function iFrameReadyMsgReceived(){
			for (var iframeId in settings){
				trigger('iFrame requested init',createOutgoingMsg(iframeId),document.getElementById(iframeId),iframeId);
			}
		}

		function firstRun() {
			settings[iframeId].firstRun = false;
		}

		var
			msg = event.data,
			messageData = {},
			iframeId = null;

		if('[iFrameResizerChild]Ready' === msg){
			iFrameReadyMsgReceived();
		} else if (isMessageForUs()){
			messageData = processMsg();
			iframeId    = logId = messageData.id;

			if (!isMessageFromMetaParent() && hasSettings(iframeId)){
				log(iframeId,'Received: '+msg);

				if ( checkIFrameExists() && isMessageFromIFrame() ){
					actionMsg();
				}
			}
		} else {
			info(iframeId,'Ignored: '+msg);
		}

	}


	function chkCallback(iframeId,funcName,val){
		var
			func = null,
			retVal = null;

		if(settings[iframeId]){
			func = settings[iframeId][funcName];

			if( 'function' === typeof func){
				retVal = func(val);
			} else {
				throw new TypeError(funcName+' on iFrame['+iframeId+'] is not a function');
			}
		}

		return retVal;
	}

	function closeIFrame(iframe){
		var iframeId = iframe.id;

		log(iframeId,'Removing iFrame: '+iframeId);
		iframe.parentNode.removeChild(iframe);
		chkCallback(iframeId,'closedCallback',iframeId);
		log(iframeId,'--');
		delete settings[iframeId];
	}

	function getPagePosition(iframeId){
		if(null === pagePosition){
			pagePosition = {
				x: (window.pageXOffset !== undefined) ? window.pageXOffset : document.documentElement.scrollLeft,
				y: (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop
			};
			log(iframeId,'Get page position: '+pagePosition.x+','+pagePosition.y);
		}
	}

	function setPagePosition(iframeId){
		if(null !== pagePosition){
			window.scrollTo(pagePosition.x,pagePosition.y);
			log(iframeId,'Set page position: '+pagePosition.x+','+pagePosition.y);
			unsetPagePosition();
		}
	}

	function unsetPagePosition(){
		pagePosition = null;
	}

	function resetIFrame(messageData){
		function reset(){
			setSize(messageData);
			trigger('reset','reset',messageData.iframe,messageData.id);
		}

		log(messageData.id,'Size reset requested by '+('init'===messageData.type?'host page':'iFrame'));
		getPagePosition(messageData.id);
		syncResize(reset,messageData,'reset');
	}

	function setSize(messageData){
		function setDimension(dimension){
			messageData.iframe.style[dimension] = messageData[dimension] + 'px';
			log(
				messageData.id,
				'IFrame (' + iframeId +
				') ' + dimension +
				' set to ' + messageData[dimension] + 'px'
			);
		}

		function chkZero(dimension){
			//FireFox sets dimension of hidden iFrames to zero.
			//So if we detect that set up an event to check for
			//when iFrame becomes visible.

			/* istanbul ignore next */  //Not testable in PhantomJS
			if (!hiddenCheckEnabled && '0' === messageData[dimension]){
				hiddenCheckEnabled = true;
				log(iframeId,'Hidden iFrame detected, creating visibility listener');
				fixHiddenIFrames();
			}
		}

		function processDimension(dimension){
			setDimension(dimension);
			chkZero(dimension);
		}

		var iframeId = messageData.iframe.id;

		if(settings[iframeId]){
			if( settings[iframeId].sizeHeight) { processDimension('height'); }
			if( settings[iframeId].sizeWidth ) { processDimension('width'); }
		}
	}

	function syncResize(func,messageData,doNotSync){
		/* istanbul ignore if */  //Not testable in PhantomJS
		if(doNotSync!==messageData.type && requestAnimationFrame){
			log(messageData.id,'Requesting animation frame');
			requestAnimationFrame(func);
		} else {
			func();
		}
	}

	function trigger(calleeMsg,msg,iframe,id){
		function postMessageToIFrame(){
			var target = settings[id].targetOrigin;
			log(id,'[' + calleeMsg + '] Sending msg to iframe['+id+'] ('+msg+') targetOrigin: '+target);
			iframe.contentWindow.postMessage( msgId + msg, target );
		}

		function iFrameNotFound(){
			info(id,'[' + calleeMsg + '] IFrame('+id+') not found');
			if(settings[id]) {
				delete settings[id];
			}
		}

		function chkAndSend(){
			if(iframe && 'contentWindow' in iframe && (null !== iframe.contentWindow)){ //Null test for PhantomJS
				postMessageToIFrame();
			} else {
				iFrameNotFound();
			}
		}

		id = id || iframe.id;

		if(settings[id]) {
			chkAndSend();
		}

	}

	function createOutgoingMsg(iframeId){
		return iframeId +
			':' + settings[iframeId].bodyMarginV1 +
			':' + settings[iframeId].sizeWidth +
			':' + settings[iframeId].log +
			':' + settings[iframeId].interval +
			':' + settings[iframeId].enablePublicMethods +
			':' + settings[iframeId].autoResize +
			':' + settings[iframeId].bodyMargin +
			':' + settings[iframeId].heightCalculationMethod +
			':' + settings[iframeId].bodyBackground +
			':' + settings[iframeId].bodyPadding +
			':' + settings[iframeId].tolerance +
			':' + settings[iframeId].inPageLinks +
			':' + settings[iframeId].resizeFrom +
			':' + settings[iframeId].widthCalculationMethod;
	}

	function setupIFrame(iframe,options){
		function setLimits(){
			function addStyle(style){
				if ((Infinity !== settings[iframeId][style]) && (0 !== settings[iframeId][style])){
					iframe.style[style] = settings[iframeId][style] + 'px';
					log(iframeId,'Set '+style+' = '+settings[iframeId][style]+'px');
				}
			}

			function chkMinMax(dimension){
				if (settings[iframeId]['min'+dimension]>settings[iframeId]['max'+dimension]){
					throw new Error('Value for min'+dimension+' can not be greater than max'+dimension);
				}
			}

			chkMinMax('Height');
			chkMinMax('Width');

			addStyle('maxHeight');
			addStyle('minHeight');
			addStyle('maxWidth');
			addStyle('minWidth');
		}

		function newId(){
			var id = ((options && options.id) || defaults.id + count++);
			if  (null!==document.getElementById(id)){
				id = id + count++;
			}
			return id;
		}

		function ensureHasId(iframeId){
			logId=iframeId;
			if (''===iframeId){
				iframe.id = iframeId =  newId();
				logEnabled = (options || {}).log;
				logId=iframeId;
				log(iframeId,'Added missing iframe ID: '+ iframeId +' (' + iframe.src + ')');
			}


			return iframeId;
		}

		function setScrolling(){
			log(iframeId,'IFrame scrolling ' + (settings[iframeId].scrolling ? 'enabled' : 'disabled') + ' for ' + iframeId);
			iframe.style.overflow = false === settings[iframeId].scrolling ? 'hidden' : 'auto';
			iframe.scrolling      = false === settings[iframeId].scrolling ? 'no' : 'yes';
		}

		//The V1 iFrame script expects an int, where as in V2 expects a CSS
		//string value such as '1px 3em', so if we have an int for V2, set V1=V2
		//and then convert V2 to a string PX value.
		function setupBodyMarginValues(){
			if (('number'===typeof(settings[iframeId].bodyMargin)) || ('0'===settings[iframeId].bodyMargin)){
				settings[iframeId].bodyMarginV1 = settings[iframeId].bodyMargin;
				settings[iframeId].bodyMargin   = '' + settings[iframeId].bodyMargin + 'px';
			}
		}

		function checkReset(){
			// Reduce scope of firstRun to function, because IE8's JS execution
			// context stack is borked and this value gets externally
			// changed midway through running this function!!!
			var
				firstRun           = settings[iframeId].firstRun,
				resetRequertMethod = settings[iframeId].heightCalculationMethod in resetRequiredMethods;

			if (!firstRun && resetRequertMethod){
				resetIFrame({iframe:iframe, height:0, width:0, type:'init'});
			}
		}

		function setupIFrameObject(){
			if(Function.prototype.bind){ //Ignore unpolyfilled IE8.
				settings[iframeId].iframe.iFrameResizer = {

					close        : closeIFrame.bind(null,settings[iframeId].iframe),

					resize       : trigger.bind(null,'Window resize', 'resize', settings[iframeId].iframe),

					moveToAnchor : function(anchor){
						trigger('Move to anchor','inPageLink:'+anchor, settings[iframeId].iframe,iframeId);
					},

					sendMessage  : function(message){
						message = JSON.stringify(message);
						trigger('Send Message','message:'+message, settings[iframeId].iframe,iframeId);
					}
				};
			}
		}

		//We have to call trigger twice, as we can not be sure if all
		//iframes have completed loading when this code runs. The
		//event listener also catches the page changing in the iFrame.
		function init(msg){
			function iFrameLoaded(){
				trigger('iFrame.onload',msg,iframe);
				checkReset();
			}

			addEventListener(iframe,'load',iFrameLoaded);
			trigger('init',msg,iframe);
		}

		function checkOptions(options){
			if ('object' !== typeof options){
				throw new TypeError('Options is not an object');
			}
		}

		function copyOptions(options){
			for (var option in defaults) {
				if (defaults.hasOwnProperty(option)){
					settings[iframeId][option] = options.hasOwnProperty(option) ? options[option] : defaults[option];
				}
			}
		}

		function getTargetOrigin (remoteHost){
			return ('' === remoteHost || 'file://' === remoteHost) ? '*' : remoteHost;
		}

		function processOptions(options){
			options = options || {};
			settings[iframeId] = {
				firstRun	: true,
				iframe		: iframe,
				remoteHost	: iframe.src.split('/').slice(0,3).join('/')
			};

			checkOptions(options);
			copyOptions(options);

			settings[iframeId].targetOrigin = true === settings[iframeId].checkOrigin ? getTargetOrigin(settings[iframeId].remoteHost) : '*';
		}

		function beenHere(){
			return (iframeId in settings && 'iFrameResizer' in iframe);
		}

		var iframeId = ensureHasId(iframe.id);

		if (!beenHere()){
			processOptions(options);
			setScrolling();
			setLimits();
			setupBodyMarginValues();
			init(createOutgoingMsg(iframeId));
			setupIFrameObject();
		} else {
			warn(iframeId,'Ignored iFrame, already setup.');
		}
	}

	function debouce(fn,time){
		if (null === timer){
			timer = setTimeout(function(){
				timer = null;
				fn();
			}, time);
		}
	}

	/* istanbul ignore next */  //Not testable in PhantomJS
	function fixHiddenIFrames(){
		function checkIFrames(){
			function checkIFrame(settingId){
				function chkDimension(dimension){
					return '0px' === settings[settingId].iframe.style[dimension];
				}

				function isVisible(el) {
					return (null !== el.offsetParent);
				}

				if (isVisible(settings[settingId].iframe) && (chkDimension('height') || chkDimension('width'))){
					trigger('Visibility change', 'resize', settings[settingId].iframe,settingId);
				}
			}

			for (var settingId in settings){
				checkIFrame(settingId);
			}
		}

		function mutationObserved(mutations){
			log('window','Mutation observed: ' + mutations[0].target + ' ' + mutations[0].type);
			debouce(checkIFrames,16);
		}

		function createMutationObserver(){
			var
				target = document.querySelector('body'),

				config = {
					attributes            : true,
					attributeOldValue     : false,
					characterData         : true,
					characterDataOldValue : false,
					childList             : true,
					subtree               : true
				},

				observer = new MutationObserver(mutationObserved);

			observer.observe(target, config);
		}

		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

		if (MutationObserver) createMutationObserver();
	}


	function resizeIFrames(event){
		function resize(){
			sendTriggerMsg('Window '+event,'resize');
		}

		log('window','Trigger event: '+event);
		debouce(resize,16);
	}

	/* istanbul ignore next */  //Not testable in PhantomJS
	function tabVisible() {
		function resize(){
			sendTriggerMsg('Tab Visable','resize');
		}

		if('hidden' !== document.visibilityState) {
			log('document','Trigger event: Visiblity change');
			debouce(resize,16);
		}
	}

	function sendTriggerMsg(eventName,event){
		function isIFrameResizeEnabled(iframeId) {
			return	'parent' === settings[iframeId].resizeFrom &&
					settings[iframeId].autoResize &&
					!settings[iframeId].firstRun;
		}

		for (var iframeId in settings){
			if(isIFrameResizeEnabled(iframeId)){
				trigger(eventName,event,document.getElementById(iframeId),iframeId);
			}
		}
	}

	function setupEventListeners(){
		addEventListener(window,'message',iFrameListener);

		addEventListener(window,'resize', function(){resizeIFrames('resize');});

		addEventListener(document,'visibilitychange',tabVisible);
		addEventListener(document,'-webkit-visibilitychange',tabVisible); //Andriod 4.4
		addEventListener(window,'focusin',function(){resizeIFrames('focus');}); //IE8-9
		addEventListener(window,'focus',function(){resizeIFrames('focus');});
	}


	function factory(){
		function init(options,element){
			function chkType(){
				if(!element.tagName) {
					throw new TypeError('Object is not a valid DOM element');
				} else if ('IFRAME' !== element.tagName.toUpperCase()) {
					throw new TypeError('Expected <IFRAME> tag, found <'+element.tagName+'>');
				}
			}

			if(element) {
				chkType();
				setupIFrame(element, options);
				iFrames.push(element);
			}
		}

		var iFrames;

		setupRequestAnimationFrame();
		setupEventListeners();

		return function iFrameResizeF(options,target){
			iFrames = []; //Only return iFrames past in on this call

			switch (typeof(target)){
			case 'undefined':
			case 'string':
				Array.prototype.forEach.call(
					document.querySelectorAll( target || 'iframe' ),
					init.bind(undefined, options)
				);
				break;
			case 'object':
				init(options,target);
				break;
			default:
				throw new TypeError('Unexpected data type ('+typeof(target)+')');
			}

			return iFrames;
		};
	}

	function createJQueryPublicMethod($){
		$.fn.iFrameResize = function $iFrameResizeF(options) {
			return this.filter('iframe').each(function (index, element) {
				setupIFrame(element, options);
			}).end();
		};
	}

	if (window.jQuery) { createJQueryPublicMethod(jQuery); }

	if (typeof define === 'function' && define.amd) {
		define([],factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') { //Node for browserfy
		module.exports = factory();
	} else {
		window.iFrameResize = window.iFrameResize || factory();
	}

})(window || {});

},{}],8:[function(require,module,exports){
exports.iframeResizer = require('./iframeResizer');
exports.iframeResizerContentWindow = require('./iframeResizer.contentWindow');

},{"./iframeResizer":7,"./iframeResizer.contentWindow":6}],9:[function(require,module,exports){
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.invokeAll('enable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    if (horizontalEmpty && verticalEmpty) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    Waypoint.requestAnimationFrame(function() {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
      }
    })

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }

  Waypoint.requestAnimationFrame = function(callback) {
    var requestFn = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      requestAnimationFrameShim
    requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;
},{}]},{},[1]);
