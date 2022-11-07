const { extname } = require('path');
const { join } = require('path');
const { readdir, rm } = require('node:fs/promises');
const { createReadStream, createWriteStream } = require('node:fs');
const { pipeline } = require('stream');

const FOLDER_STYLES_PATH = join(__dirname, './styles');
const FILE_BUNDLE = join(__dirname, './project-dist/bundle.css');


(async () => {
    try {
        const files = await readdir(FOLDER_STYLES_PATH, { withFileTypes: true });
        await rm(FILE_BUNDLE, { recursive: true, force: true });

        for (const file of files) {
            const typeName = extname(file.name).slice(1);
            if (!file.isDirectory() && typeName === 'css') {
                const rs = await createReadStream(join(FOLDER_STYLES_PATH, `/${file.name}`),{encoding: 'utf-8'})
                const ws = await createWriteStream(FILE_BUNDLE, {encoding: 'utf-8', flags: 'a'})
                await pipeline(rs, ws, () => {})
            }
        }
    } catch (err) {
        console.error(err);
    }
})();