var fs = require('fs')

/*
 * Middleware for embedding examples
 */

exports.embedExamples = function () {
  return function (files, ms, done) {
    for (var id in files) {
      var file = files[id]
      var contents = file.contents.toString()
      var expr = /<!-- example: (.*?) -->/g

      if (expr.test(contents)) {
        contents = contents.replace(expr, (_, fname) =>
          `<iframe class='example-frame' src='${fname}' seamless></iframe>`
        )
        file.contents = contents
      }
    }
    done()
  }
}
