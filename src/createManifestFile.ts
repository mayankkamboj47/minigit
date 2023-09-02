const path = require('path');
const fs   = require('fs').promises;

async function createManifestFile(currentFiles, timestamp = null, manifestPath = null) {
    let contents =  JSON.stringify(currentFiles, null, 2);
    // if timestamp is not provided, create a UNIX timestamp
    if(!timestamp) timestamp = Math.floor(Date.now() / 1000);
    const filename = `${timestamp}.json`;
    // if manifestPath is not provided, set it to a 'backups' folder in the current directory
    manifestPath = path.join(__dirname, manifestPath || 'backups')
    // if the manifestPath does not exist, create it
    try {
        await fs.access(manifestPath);
    } catch(e) {
        await fs.mkdir(manifestPath);
    }
    // save the manifest file
    await fs.writeFile(path.join(manifestPath, filename), contents, 'utf-8');
}
module.exports = createManifestFile;