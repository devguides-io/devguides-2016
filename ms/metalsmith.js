var Metalsmith = require('metalsmith')

var app = Metalsmith(__dirname)
  .use(require('metalsmith-sense-sass')())
  .use(require('./lib/middleware').addMdOptions())
  .use(require('metalsmith-jstransformer')({
    layoutPattern: '_layouts/**',
    defaultlayout: null
  }))
  .source('./docs')
  .destination('./public')

if (module.parent) {
  module.exports = app
} else {
  app.build(function (err) { if (err) throw err })
}
