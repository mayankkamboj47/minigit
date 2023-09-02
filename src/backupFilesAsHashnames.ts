const glob = require('glob-promise');

module.exports = async function backupFilesAsHashnames(backupDir) {
    // gets the filenames without extensions for .bkp files using glob
    const pattern = `${backupDir}/*.bkp`;
    const matches = await glob(pattern, {});
    return matches.map(path => {
        const filename = path.split(/[\\/]/).pop();                    // get the portion after the last slash
        const hashname = filename.split('.').slice(0, -1).join('.');// get the portion before the last dot
        return hashname;
    });
}
