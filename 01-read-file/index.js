const { join } = require('path')
const { open } = require('node:fs/promises');
  
(async () => {
    const file = await open(join(__dirname, './text.txt'));
    
    for await (const chunk of file.createReadStream({encoding: 'utf-8'}))
      console.log(chunk);

    await file.close();
})();

