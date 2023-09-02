const fs = require('fs').promises;

async function getIgnores(gitignorePath: string): Promise<Set<string>> {
  const ignores = new Set<string>();
  try {
    const gitignore : string = await fs.readFile(gitignorePath, 'utf8');
  
    gitignore.split(/\r?\n/).forEach(line => {
      if (line && !line.startsWith('#')) {
        ignores.add(line);
        ignores.add(line + '/**')
      }
    });
    return ignores;
  } catch(e) {
    if (e.code !== 'ENOENT') throw e;
    return new Set();
  }
}

module.exports = getIgnores;