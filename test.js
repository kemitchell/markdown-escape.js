var md = new (require('markdown-it'))()
var escape = require('./')
var assert = require('assert')

var examples = [
  ['#1!', '#1!'],
  ['1 < 2', '1 &lt; 2'],
  ['* and text', '* and text'],
  ['> not a quote', '&gt; not a quote'],
  ['< not a tag >', '&lt; not a tag &gt;'],
  ['[]', '[]'],
  /* eslint-disable-next-line */
  ['____', '_\_\_\_']
]

examples.forEach(function (example) {
  var escaped = escape(example[0])
  var rendered = md.render(escaped)
  assert(
    rendered.indexOf(example[1]) > -1,
    '“' + example[0] + '” becomes “' + example[1] + '”'
  )
})
