const {extname} = require('path');
const { join } = require('path');
const { readdir } = require('node:fs/promises');
const FOLDER_PATH = join(__dirname, './secret-folder');
const { stat } = require('node:fs');

(async () => {
    try {
        const files = await readdir(FOLDER_PATH, { withFileTypes: true });

        for (const file of files) {
            if (!file.isDirectory()) {
                stat((`${FOLDER_PATH}/${file.name}`), (err, stats) => {
                    const fileSize = stats.size + 'b';
                    const typeName = extname(file.name).slice(1);
                    const fileName = file.name.slice(0, (file.name.length - typeName.length - 1));
                    console.log(`${fileName} - ${typeName} - ${fileSize}`);
                });
            }
        }
    } catch (err) {
        console.error(err);
    }
})();