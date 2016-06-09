var Metalsmith = require('metalsmith')

var app = Metalsmith(__dirname)
  // Add extra meta info
  .use(require('./lib/meta')())

  // Browserify
  .use(require('metalsmith-browserify')({
    dest: 'assets/script.js',
    args: [ './docs/assets/script.js' ]
  }))
  .use(require('metalsmith-browserify')({
    dest: 'assets/example.js',
    args: [ './lib/web-example/index.js' ]
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
  .source('./docs')
  .destination('./public')

if (module.parent) {
  module.exports = app
} else {
  app.build(function (err) { if (err) throw err })
}
