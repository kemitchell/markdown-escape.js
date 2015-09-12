var md = new (require('markdown-it'))
var escape = require('./')

require('tape')('inline elements', function(test) {
  [ [ '#1!', '#1!' ],
    [ '1 < 2', '1 &lt; 2' ],
    [ '* and text', '* and text' ],
    [ '> not a quote', '&gt; not a quote' ],
    [ '< not a tag >', '&lt; not a tag &gt;' ],
    [ '[]' , '[]' ],
    [ '____', '\_\_\_\_' ] ]
    .forEach(function(example) {
      var escaped = escape(example[0])
      var rendered = md.render(escaped)
      test.ok(
        rendered.indexOf(example[1]) > -1,
        '“' + example[0] + '” becomes “' + example[1] + '”') })
  test.end() })

require('tape')('block elements', function(test) {
  [ [ '1. We\'re #1!', '<p>1. We\'re #1!</p>' ],
    [ '    - We\'re #1!', '<p>    - We\'re #1!</p>' ] ]
    .forEach(function(example) {
      var inlineEscaped = escape(example[0])
      var blockEscaped = escape(example[0], true)
      var expected = ( example[1] + '\n' )
      test.notEqual(
        md.render(inlineEscaped),
        expected)
      test.equal(
        md.render(blockEscaped),
        expected,
        '“' + example[0] + '” renders “' + example[1] + '”') })
  test.end() })
