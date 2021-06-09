var assert = require('assert')
var commonmark = require('commonmark')
var escape = require('./')

var examples = [
  ['#1!', '#1!'],
  ['1 < 2', '1 &lt; 2'],
  ['* and text', '* and text'],
  ['1. not\n1. a list', '<p>1. not\n1. a list</p>\n'],
  ['- not\n- a list', '<p>- not\n- a list</p>\n'],
  ['a - b * c 1. d', '<p>a - b * c 1. d</p>\n'],
  ['hard\n\n\n\nline break', '<p>hard<br />\n<br />\n<br />\n<br />\nline break</p>'],
  ['> not a quote', '&gt; not a quote'],
  ['< not a tag >', '&lt; not a tag &gt;'],
  ['[]', '[]'],
  /* eslint-disable-next-line */
  ['____', '_\_\_\_']
]

examples.forEach(function (example) {
  var escaped = escape(example[0])
  var rendered = render(escaped)
  assert(
    rendered.indexOf(example[1]) > -1,
    '“' + example[0] + '” becomes “' + example[1] + '”'
  )
})

// Test skips.

assert(
  escape('https://example.com', ['slashes']) ===
  'https://example.com',
  'skip slashes'
)

assert(
  escape('one_two', ['underscores']) ===
  'one_two',
  'skip underscores'
)

function render (markup) {
  var reader = new commonmark.Parser()
  var writer = new commonmark.HtmlRenderer()
  var parsed = reader.parse(markup)
  return writer.render(parsed)
}
