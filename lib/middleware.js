var hljs = require('highlight.js')

/*
 * Ran before jstransformer.
 */

exports.addMdOptions = function () {
  return function (files, ms, done) {
    for (var fn in files) {
      if (/\.md$/.test(fn)) {
        files[fn].contents = transformMd(files[fn].contents.toString())
        files[fn].html = true
        files[fn].plugins = [
          require('markdown-it-decorate'),
          require('markdown-it-named-headings')
        ]
      }
    }
    done()
  }
}

/*
 * Ran after jstransformer.
 */

exports.transformHtml = function () {
  return function (files, ms, done) {
    for (var fn in files) {
      if (/\.html/.test(fn)) {
        files[fn].contents = transformHtml(files[fn].contents.toString())
      }
    }
    done()
  }
}

/*
 * Pre-markdown transformations.
 */

function transformMd (md) {
  md = md.replace(
    /\*( \*)+\n/g,
    '</div></div><div class="page-section"><div class="container">\n')
  return md
}

/*
 * Transforms HTML.
 */

function transformHtml (html) {
  // Up next:
  html = html.replace(/<blockquote>\n<p>Next: /g, '<blockquote class="up-next">\n<p>')

  // See also:
  html = html.replace(/<blockquote>\n<p>(See also|Also see): /g, '<blockquote class="see-also">\n<p><span>Also see:</span> ')

  // Remove <br>, used to break blockquotes
  html = html.replace(/\n<br>\n/g, '\n')

  // Highlight
  html = highlightCode(html)
  return html
}

function highlightCode (html) {
  html = html.replace(/<pre><code class="language-([^"]*)">([\s\S.]*?)<\/code><\/pre>/mg, function (_, lang, code) {
    code = code.replace(/&lt;/g, '<')
    code = code.replace(/&gt;/g, '>')
    code = code.replace(/&amp;/g, '&')
    code = code.replace(/&quot;/g, "'")
    code = hljs.highlight(lang, code).value

    // ellipsis /*...*/
    code = code.replace(
      /<span class="hljs-comment">\/\*\.\.\.\*\/<\/span>/g,
      (_, str) => `<span class="hljs-ellipsis"></span>`)
    code = code.replace(
      /\/\*\.\.\.\*\//g,
      (_, str) => `<span class="hljs-ellipsis"></span>`)

    // placeholders /*[ like this ]*/
    code = code.replace(
      /<span class="hljs-comment">\/\*\[ (.*?) \]\*\/<\/span>/g,
      (_, str) => `<span class="hljs-placeholder">${md(str)}</span>`)

    // warnings //! Like this
    code = code.replace(
      /<span class="hljs-comment">\/\/\! ?(.*?)<\/span>/g,
      (_, str) => `<span class="hljs-placeholder -warning">${md(str)}</span>`)

    // checkmarks /// Like this
    code = code.replace(
      /<span class="hljs-comment">\/\/\/ ?(.*?)<\/span>/g,
      (_, str) => `<span class="hljs-placeholder -ok">${md(str)}</span>`)

    // checkmarks // <-- Like this
    code = code.replace(
      /<span class="hljs-comment">\/\/ &lt;--? (.*?)<\/span>/g,
      (_, str) => `<span class="hljs-placeholder -info">${md(str)}</span>`)

    // Results //=>
    code = code.replace(
      /<span class="hljs-comment">\/\/\=&gt; (.*?)<\/span>/g,
      (_, str) => `<span class="hljs-result">${str}</span>`)

    // highlighted lines //+
    // muted lines //-
    code = code.replace(
      /(?:^|\n)(.*?)<span class="hljs-comment">\/\/\-<\/span>/g,
      (_, str) => `<span class="hljs-line -mute">${str}</span>`)
    code = code.replace(
      /(?:^|\n)(.*?)<span class="hljs-comment">\/\/\+<\/span>/g,
      (_, str) => `<span class="hljs-line -highlight">${str}</span>`)

    // horizontal rule // ---
    code = code.replace(
      /(?:^|\n)( *)<span class="hljs-comment">\/\/ ---+<\/span>/g,
      (_, str) => `<span class="hljs-hr">${str}</span>`)

    // /*{*/highlight/*}*/
    code = code.replace(
      /<span class="hljs-comment">\/\*{\*\/<\/span>(.*?)<span class="hljs-comment">\/\*}\*\/<\/span>/g,
      (_, str) => `<span class="hljs-highlight">${str}</span>`)

    return '<pre><code class="language-' + lang + '">' + code + '</code></pre>'
  })
  return html
}

function md (str) {
  return str
    .replace(/`([^`]+)`/g, (_, str) => `<code>${str}</code>`)
    .replace(/\*([^`]+)\*/g, (_, str) => `<em>${str}</em>`)
}
