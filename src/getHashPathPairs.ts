const fs = require('fs').promises;
const glob = require('glob-promise');
const crypto = require('crypto');

const statPath = async (path : string) => {
    const stat = await fs.stat(path)
    return [path, stat]
}

const readPath = async (path : string) => {
    const content = await fs.readFile(path, 'utf-8')
    return [path, content]
}

const hash = (str : string) : string => {
    const hasher = crypto.createHash('sha1').setEncoding('hex')
    hasher.write(str)
    hasher.end()
    return hasher.read()
}

const getHashFilePairs = async (dir : string, ignores? : Set<string>) => {
    if(!ignores) ignores = new Set()

    const pattern = `${dir}/**/*`
    // ignore any directories to begin with
    const matches = await glob(pattern, { ignore: Array.from(ignores).map(ignore => `${dir}/${ignore}`) })

    // to avoid idle times, we fetch all stats and contents in parallel
    const stats = await Promise.all(matches.map(path => statPath(path)))
    const files = stats.filter(([path, stat]) => stat.isFile())
    const contents = await Promise.all(
        files.map(([path, _]) => readPath(path)))
    
    // finally, we return a map of file-content hashes to file paths. In the future, we
    // may want to use streams to avoid loading all the contents into memory at once.
    let hashFilePairs = {};
    for(let [path, content] of contents) {
        hashFilePairs[hash(content)] = path
    }
    return hashFilePairs;
}

module.exports.getHashFilePairs = getHashFilePairs
module.exports.hash = hash
module.exports.readPath = readPath
module.exports.statPath = statPath