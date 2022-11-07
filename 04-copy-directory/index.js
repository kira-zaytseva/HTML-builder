const { copyFile, mkdir, rm, readdir } = require('node:fs/promises');
const { join } = require('node:path');

const FOLDER_PATH = join(__dirname, 'files');
const projectFolder = join(__dirname, 'files-copy');

async function makeDirectory() {
    await mkdir(projectFolder, { recursive: true });
}

(async () => {
    await rm(projectFolder, { recursive: true, force: true });
    await makeDirectory().catch(console.error);

    const files = await readdir(FOLDER_PATH, { withFileTypes: true });

    try {
        for (const file of files) {
            await copyFile(`${FOLDER_PATH}/${file.name}`, `${projectFolder}/${file.name}`);
        }
        console.log('files were copied');
    } catch {
        console.log('The files could not be copied');
    }
})();