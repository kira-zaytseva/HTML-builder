const { join } = require('path');
const { createReadStream } = require('node:fs');
  
(async () => {   
    for await (const chunk of createReadStream(join(__dirname, './text.txt'),{encoding: 'utf-8'}))
      console.log(chunk);
})();

