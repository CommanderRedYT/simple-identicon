const identicon = require('simple-identicon');

if (!identicon) {
    throw new Error('simple-identicon module not found');
}

if (typeof identicon !== 'object') {
    throw new Error('simple-identicon module is not a object');
}

// required attributes
const requiredAttributes = ['generateIdenticon', 'saveIdenticon', 'generateIdenticonDataUrl'];

for (const attribute of requiredAttributes) {
    if (!identicon[attribute]) {
        throw new Error(`simple-identicon module is missing required attribute: ${attribute}`);
    }
}
