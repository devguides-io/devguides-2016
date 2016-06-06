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

exports.transformHtml = function () {
  return function (files, ms, done) {
    for (var fn in files) {
      if (/\.html/.test(fn)) {
        files[fn].contents = transformHtml(files[fn].contents)
      }
    }
    done()
  }
}

function transformHtml (html) {
  html = html.replace(/<hr>/g, '</div></div><div class="page-section"><div class="container">')
  html = html.replace(/<blockquote>\n<p>Next: /g, '<blockquote class="up-next">\n<p>')
  return html
}
