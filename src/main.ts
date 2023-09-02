const path = require("path");
const getIgnores = require('./getIgnores.js');
const {getHashFilePairs} = require('./getHashPathPairs.js');
const backupFilesAsHashnames = require('./backupFilesAsHashnames.js');
const copy = require('./copy.js');
const createManifestFile = require('./createManifestFile.js');
const exclude = require('./exclude.js');
const fs = require('fs').promises;

async function script(src, dest = 'backups') {
    // create the destination folder if it does not exist
    await createFolderIfNotExists(dest);
    let ignores = await getIgnores('./.ignore');
    let hashFilePairs = await getHashFilePairs(src, ignores);
    let currentHashes = await backupFilesAsHashnames(dest);
    let toCopy = exclude(hashFilePairs, currentHashes);
    await copy(toCopy, dest);
    await createManifestFile(hashFilePairs, null, dest);
}

const src = process.argv[2];
const dest = process.argv[3];
script(src, dest).then(() => console.log('done'));

async function createFolderIfNotExists(folderPath) {
  try {
    await fs.access(folderPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(folderPath, { recursive: true });
    } else {
      throw error;
    }
  }
}