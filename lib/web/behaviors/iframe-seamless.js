const $ = require('jquery')
const iFrameResize = require('iframe-resizer')

/**
 * iFrame resizer
 */

iFrameResize.iframeResizer({
  resizedCallback: function () {
    $(window).trigger('resize')
  }
}, 'iframe[seamless]')
