var inline = [
  [ /\*/g, '\\*' ],
  [ /#/g, '\\#' ],
  [ /\//g, '\\/' ],
  [ /\(/g, '\\(' ],
  [ /\)/g, '\\)' ],
  [ /\[/g, '\\[' ],
  [ /\]/g, '\\]' ],
  [ /\</g, '&lt;' ],
  [ /\>/g, '&gt;' ],
  [ /_/g, '\\_' ] ]

var block = [
  [ /^(\s*)(\d+)\./, '$1$2\\.'],
  [ /^(\s*)-(\s+)/, '$1\\-$2'] ]

module.exports = function(string, escapeBlock) {
  var replacements = ( escapeBlock ? inline.concat(block) : inline )
  return replacements.reduce(
    function(string, replacement) {
      return string.replace(replacement[0], replacement[1])
    },
    string) }
