var Metalsmith = require('metalsmith')

var isProduction = process.env.NODE_ENV === 'production'
var app = Metalsmith(__dirname)
  // Add extra meta info
  .use(require('./lib/meta')())

  // Browserify
  .use(tap(require('metalsmith-browserify')({
    dest: 'assets/common.js'
  }), b => {
    b.bundle.require('jquery')
  }))
  .use(tap(require('metalsmith-browserify')({
    dest: 'assets/script.js',
    args: [ './docs/assets/script.js' ]
  }), b => {
    b.bundle.external('jquery')
  }))
  .use(tap(require('metalsmith-browserify')({
    dest: 'assets/example.js',
    args: [ './lib/web-example/index.js' ]
  }), b => {
    b.bundle.external('jquery')
  }))
  .use(tap(require('metalsmith-browserify')({
    dest: 'vendor/redux.js'
  }), b => {
    b.bundle.require('redux')
  }))

  // Sass
  .use(require('metalsmith-sense-sass')())
  .use(require('./lib/middleware').addMdOptions())
  .use(require('metalsmith-jstransformer')({
    layoutPattern: '_layouts/**',
    defaultlayout: null
  }))
  .use(require('./lib/middleware').transformHtml())
  .use(require('./lib/example').embedExamples())
  .use(require('metalsmith-uglify')({
    sourceMap: !isProduction,
    mangle: isProduction,
    compress: isProduction
  }))
  .source('./docs')
  .destination('./public')

if (module.parent) {
  module.exports = app
} else {
  app.build(function (err) { if (err) throw err })
}

function tap (object, fn) {
  fn(object)
  return object
}
