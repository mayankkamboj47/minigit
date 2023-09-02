const path = require('path');
const fs   = require('fs').promises;

module.exports = async function copy(destSrcPairs, destFolder) {
    const pathExtension = '.bkp';
    let promises = [];
    for(let dest in destSrcPairs){
        const src = destSrcPairs[dest];
        const destPath = path.join(destFolder, dest + pathExtension);
        const srcPath = path.join(__dirname, src);
        promises.push(fs.copyFile(srcPath, destPath));
    };
    await Promise.all(promises);
}

