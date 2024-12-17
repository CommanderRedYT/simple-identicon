import { generateIdenticonDataUrl, generateIdenticon } from '../src';

describe('identicon-dataurl', () => {
    it('should create an identicon dataurl', () => {
        const hash = 'test';

        const dataUrl = generateIdenticonDataUrl(hash);

        expect(dataUrl).toMatch(/^data:image\/png;base64,/);

        const base64 = dataUrl.split(',')[1];

        const buffer = Buffer.from(base64, 'base64');

        expect(buffer).toMatchSnapshot();
    });

    it('should match identicon buffer', () => {
        const hash = 'test';

        const dataUrl = generateIdenticonDataUrl(hash);

        const buffer = generateIdenticon(hash);

        const base64 = dataUrl.split(',')[1];

        const buffer2 = Buffer.from(base64, 'base64');

        expect(buffer.equals(buffer2)).toBe(true);
    });

    it('should match identicon buffer with a custom size', () => {
        const hash = 'test2';
        const size = 256;

        const dataUrl = generateIdenticonDataUrl(hash, size);

        const buffer = generateIdenticon(hash, size);

        const base64 = dataUrl.split(',')[1];

        const buffer2 = Buffer.from(base64, 'base64');

        expect(buffer.equals(buffer2)).toBe(true);
    });
});
