import { generateIdenticon } from '../src';

describe('identicon-buffer', () => {
    it('should create an identicon buffer', () => {
        const hash = 'test';

        const dataUrl = generateIdenticon(hash);

        // should be buffer
        expect(dataUrl).toBeInstanceOf(Buffer);

        expect(dataUrl).toMatchSnapshot();
    });
});
