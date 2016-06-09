Metalsmith
----------

This is a metalsmith website. Start a dev server like this:

    npm install
    npm start
    npm start -- --port 3005

Examples
--------

Embed an example using:

    <!-- example: examples/simple -->

Then create it as `redux/examples/simple.jade`.

Each example has:

- `external` (list)
- `given` (list, required at least 0)
- `examples` (list, required at least 1)

Each `external` is a string to JavaScript URLs to be embedded.

Each `given` item has:

- `code` (required)
- `hide` - if *true*, then it'll never be shown.

Each `examples` item has:

- `code` (required)
- `placeholder` - Text to be shown before focus. Will be hljs highlighted.
- `class` - CSS class name of the block.
- `secret` - a hint text that's only shown after focus.
- `auto` - if *true*, then the example output will be shown even before trying it.
- `action` (default "Try") - the button text.
