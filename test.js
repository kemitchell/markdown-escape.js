var md = new (require('markdown-it'))
var escape = require('./')

function roundTrip(example) {
  return md.render(escape(example)) }

require('tape')(function(test) {
  [ [ '#1!', '#1!' ],
    [ '1 < 2', '1 &lt; 2' ],
    [ '* and text', '* and text' ],
    [ '> not a quote', '&gt; not a quote' ],
    [ '< not a tag >', '&lt; not a tag &gt;' ],
    [ '[]' , '[]' ] ]
    .forEach(function(example) {
      var escaped = escape(example[0])
      var rendered = md.render(escaped)
      test.ok(
        rendered.indexOf(example[1]) > -1,
        '“' + example[0] + '” becomes “' + example[1] + '”') })
  test.end() })
