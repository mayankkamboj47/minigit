const fs = require('fs').promises;
const path = require('path');
const createManifestFile = require('../createManifestFile.js');
const mock = require('mock-fs');

describe('createManifestFile', () => {
  const currentFiles = {
    'file1': 'test/file1.txt',
    'file2': 'test/file2.txt',
    'file3': 'test/file3.txt',
  };
  const timestamp = 1234567890;
  const manifestPath = 'test/manifests';

  beforeEach(() => {
    mock({
      'test' : {
        'file1.txt' : 'abc',
        'file2.txt' : 'cde',
        'file3.txt' : 'fgh',
        'manifests' : {},
      }
    });
    });

  afterEach(()=>mock.restore());

  it('should create a manifest file with the current files', async () => {
    await createManifestFile(currentFiles, timestamp, manifestPath);

    const files = await fs.readdir(manifestPath);
    expect(files).toEqual(['1234567890.json']);

    const contents = await fs.readFile(path.join(manifestPath, '1234567890.json'), 'utf-8');
    expect(JSON.parse(contents)).toEqual(currentFiles);
  });

  it('should create a manifest file with the current timestamp and default manifest path', async () => {
    const defaultManifestPath = 'backups';
    await createManifestFile(currentFiles, timestamp);

    const files = await fs.readdir(defaultManifestPath);
    expect(files.length).toBe(1);

    const contents = await fs.readFile(path.join(defaultManifestPath, files[0]), 'utf-8');
    expect(JSON.parse(contents)).toEqual(currentFiles);
  });
});