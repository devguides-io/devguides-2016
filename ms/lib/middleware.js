exports.addMdOptions = function () {
  return function (files, ms, done) {
    for (var fn in files) {
      if (/\.md$/.test(fn)) {
        files[fn].plugins = [
          require('markdown-it-decorate')
        ]
      }
    }
    done()
  }
}
