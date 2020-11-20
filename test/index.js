const fs = require('fs');

fs.readdirSync(__dirname).forEach(file => {
    if (file.endsWith('.test.js')) {
        console.log(`### Running ${file}\n`);
        require(`./${file}`);
    }
});
