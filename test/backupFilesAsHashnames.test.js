const backupFilesAsHashnames = require('../backupFilesAsHashnames.js');
const mock = require('mock-fs');

describe('backupFilesAsHashnames', () => {
    beforeEach(() => {
        mock({
            'test/backups': {
                'file1.bkp': 'abc123',
                'file2.bkp': 'def456',
                'file3.bkp': 'ghi789'
            },
            'test/empty': {}
        });
    });
    afterEach(()=>mock.restore());
  it('should return an array of filenames without extensions', async () => {
    const backupDir = './test/backups';
    const expectedFiles = ['file1', 'file2', 'file3'];
    const files = await backupFilesAsHashnames(backupDir);
    expect(files).toEqual(expectedFiles);
  });

  it('should return an empty array if no .bkp files are found', async () => {
    const backupDir = './test/empty';
    const expectedFiles = [];
    const files = await backupFilesAsHashnames(backupDir);
    expect(files).toEqual(expectedFiles);
  });
});