const { join } = require('path')
const { createWriteStream } = require('node:fs');
const readline = require('readline');

const  sendByMessage = () => {
    console.log('Good bye :)')
}

(async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    const file = createWriteStream(join(__dirname, './text.txt'), { flags: 'a' })


    rl.write(`Enter text:  \n`);

    rl.on('line', (text) => {
        if (text === "exit") {
            rl.close();
            sendByMessage();
        } else file.write(text + '\n');
    })

    rl.on('SIGINT', () => {
        rl.close();
        sendByMessage();
    });
})();