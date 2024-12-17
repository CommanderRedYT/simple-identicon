import { createCanvas } from 'canvas';
import fs from 'fs';
import { createHash } from 'crypto';

export const defaultSize = 128;

export const generateIdenticon = (inputValue: string, size = defaultSize): Buffer => {
    const hash = createHash('sha1').update(inputValue).digest('hex');

    const canvas = createCanvas(size, size);

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = `#${hash.slice(0, 6)}`;

    const squareSize = size / 5;

    for (let i = 0; i < hash.length; i += 1) {
        const row = Math.floor(i / 5);
        const col = i % 5;

        const shouldFill = parseInt(hash[i], 16) > 7;

        if (shouldFill) {
            const mirrorCol = 4 - col;

            const x = col * squareSize;
            const y = row * squareSize;
            const width = squareSize;
            const height = squareSize;

            const x1 = Math.floor(x);
            const y1 = Math.floor(y);
            const x2 = Math.ceil(x + width);
            const y2 = Math.ceil(y + height);
            const width1 = x2 - x1;
            const height1 = y2 - y1;

            ctx.fillRect(x1, y1, width1, height1);

            const mirrorX = mirrorCol * squareSize;
            const mirrorY = row * squareSize;

            const mirrorX1 = Math.floor(mirrorX);
            const mirrorY1 = Math.floor(mirrorY);
            const mirrorX2 = Math.ceil(mirrorX + width);
            const mirrorY2 = Math.ceil(mirrorY + height);
            const mirrorWidth = mirrorX2 - mirrorX1;
            const mirrorHeight = mirrorY2 - mirrorY1;

            ctx.fillRect(mirrorX1, mirrorY1, mirrorWidth, mirrorHeight);
        }
    }

    return canvas.toBuffer();
};

export const generateIdenticonDataUrl = (inputValue: string, size = defaultSize): string => {
    const buffer = generateIdenticon(inputValue, size);
    return `data:image/png;base64,${buffer.toString('base64')}`;
};

export const saveIdenticon = (inputValue: string, path: string, size = defaultSize): void => {
    const buffer = generateIdenticon(inputValue, size);
    fs.writeFileSync(path, buffer);
};

export default generateIdenticon;
