const copy = require('../copy.js');
const mock = require('mock-fs');
const fs = require('fs').promises;

describe('copy', () => {
  const destSrcPairs = {
    'file1': 'test/file1.txt',
    'file2': 'test/file2.txt',
    'file3': 'test/file3.txt',
  };
  const destFolder = 'test/backup';

  beforeEach(()=>{
    mock({
      'test': {
        'file1.txt': 'abc123',
        'file2.txt': 'def456',
        'file3.txt': 'ghi789',
        'backup'   : {}
      }
    });
  });

  afterEach(()=>mock.restore());

  it('should copy all files to the destination folder', async () => {
    await copy(destSrcPairs, destFolder); // error is within the function, not outside of it. use console.logs to print the input values at different points please

    const files = await fs.readdir(destFolder);
    expect(files).toEqual(['file1.bkp', 'file2.bkp', 'file3.bkp']);
  });

  it('should throw an error if the source file does not exist', async () => {
    destSrcPairs['file4'] = 'test/nonexistent.txt';

    await expect(copy(destSrcPairs, destFolder)).rejects.toThrow();
  });
});