# Objdict #

A javascript utility for [object-based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) dictionaries.

```
const objdict = require("objdict")
const colors = {"red": "#CC0000", "green": "#00CC00", "blue": "#0000CC"}
objdict.forEach(colors, (color) => console.log(color))
```

This is just a primitive implementation of [ES2015's Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) using oldschool objects.

### License ###

This project is licensed under the MIT license.
