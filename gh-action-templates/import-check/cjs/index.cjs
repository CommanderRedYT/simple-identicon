const module = require('simple-identicon');

if (!module) {
    throw new Error('simple-identicon module not found');
}

if (typeof module !== 'function') {
    throw new Error('simple-identicon module is not a function');
}
