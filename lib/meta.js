/*
 * Adds `base`
 */

module.exports = function () {
  return function (files, ms, done) {
    for (var fname in files) {
      var file = files[fname]
      var depth = fname.split('/').length
      var base = Array(depth).join('../')
      base = base.substr(0, base.length - 1)

      file.base = base
    }

    done()
  }
}
