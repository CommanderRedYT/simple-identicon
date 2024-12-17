import fs from 'fs';
import imageSize from 'image-size';
import { saveIdenticon, generateIdenticonDataUrl, defaultSize } from '../src';

const massCount = 1000; // number of identicons to generate for mass test

describe('identicon-file', () => {
    afterEach(() => {
        fs.readdirSync('.').forEach((file) => {
            if (file.startsWith('test') && file.endsWith('.png')) {
                fs.unlinkSync(file);
            }
        });
    });

    it('should create an identicon file', () => {
        const hash = 'test';
        const path = 'test.png';
        saveIdenticon(hash, path);

        const exists = fs.existsSync(path);

        const dimensions = imageSize(path);

        expect(dimensions.width).toBe(defaultSize);
        expect(dimensions.height).toBe(defaultSize);

        expect(exists).toBe(true);

        const data = fs.readFileSync(path);

        expect(data).toMatchSnapshot();
    });

    it('should create an identicon file with a custom size', () => {
        const hash = 'test2';
        const path = 'test2.png';
        const size = 256;
        saveIdenticon(hash, path, size);

        const exists = fs.existsSync(path);

        const dimensions = imageSize(path);

        expect(dimensions.width).toBe(size);
        expect(dimensions.height).toBe(size);

        expect(exists).toBe(true);

        const data = fs.readFileSync(path);

        expect(data).toMatchSnapshot();
    });

    // generate 100 identicons and time it
    it(`should create ${massCount} identicon files`, () => {
        const start = Date.now();
        for (let i = 0; i < massCount; i += 1) {
            const hash = `test${i}`;
            const path = `test${i}.png`;
            saveIdenticon(hash, path);
        }
        const end = Date.now();
        console.log(`Generating ${massCount} identicons took ${end - start}ms (average ${(end - start) / massCount}ms)`);

        expect(end - start).toBeLessThan(1000);
    });

    it('should match identicon buffer', () => {
        const hash = 'test';
        const path = 'test.png';
        saveIdenticon(hash, path);

        const dataUrl = generateIdenticonDataUrl(hash);

        const base64 = dataUrl.split(',')[1];

        const buffer = Buffer.from(base64, 'base64');

        const data = fs.readFileSync(path);

        expect(buffer.equals(data)).toBe(true);
    });

    it('should match identicon buffer with a custom size', () => {
        const hash = 'test2';
        const path = 'test2.png';
        const size = 256;
        saveIdenticon(hash, path, size);

        const dataUrl = generateIdenticonDataUrl(hash, size);

        const base64 = dataUrl.split(',')[1];

        const buffer = Buffer.from(base64, 'base64');

        const data = fs.readFileSync(path);

        expect(buffer.equals(data)).toBe(true);
    });
});
