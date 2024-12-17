# simple-identicon

## Dependencies

- [canvas](https://www.npmjs.com/package/canvas) - A Cairo-backed Canvas implementation for Node.js.

### Notes on `canvas`

For canvas to work, please check the [installation guide](https://www.npmjs.com/package/canvas#compiling) for your platform.

## Installation

```bash
npm install simple-identicon

# or

yarn add simple-identicon
```

```javascript
const { generateIdenticon } = require('simple-identicon');

const myValue = 'my-value'; // Can be a username for example

const buffer = generateIdenticon(myValue);

// Use the buffer
```

There are also some helpers for most common use cases:

```javascript
const { saveIdenticon, generateIdenticonDataUrl } = require('simple-identicon');

const myValue = 'my-value'; // Can be a username for example

// Save the identicon to a file
saveIdenticon(myValue, 'my-identicon.png');

// Or data URL

const dataUrl = generateIdenticonDataUrl(myValue);

// Use the data URL on the browser
const img = document.createElement('img');

img.src = dataUrl;

document.body.appendChild(img);
```
