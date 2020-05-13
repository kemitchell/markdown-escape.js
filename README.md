Escape Markdown control characters.

```javascript
var escape = require('markdown-escape')
require('assert')(escape("#1! We're #1!") === "\\#1! We're \\#1!")
```
