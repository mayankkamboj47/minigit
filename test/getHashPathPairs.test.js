const {getHashFilePairs, hash} = require('../getHashPathPairs.js');
const mock = require('mock-fs');

const files = {
    'test-folder': {
        'file1.txt': 'abc123',
        'file2.txt': 'def456'
    },
    'empty': {},
};

const hashFilePairs = {
    '6367c48dd193d56ea7b0baad25b19455e529f5ee': 'test-folder/file1.txt',
    '0b3d8b29493059afd7f9912106279c4643ac4939': 'test-folder/file2.txt'
};

describe('hash', () => {
    it('returns a hash of a given string', async () => {
        expect(hash('abc123')).toBe('6367c48dd193d56ea7b0baad25b19455e529f5ee');
        expect(hash('def456')).toBe('0b3d8b29493059afd7f9912106279c4643ac4939');
    });
});

describe('getHashFilePairs', () => {
    beforeAll(() => mock(files));
    afterAll(()=>mock.restore());

    it('returns a mapping of filenames to hashes', async () => {
        const hashes = await getHashFilePairs('test-folder');
        expect(hashes).toEqual(hashFilePairs);
    });

    it('excludes ignored files', async () => {
        const ignores = new Set(['file2.txt']);
        const hashes = await getHashFilePairs('test-folder', ignores);

        expect(hashes).toEqual({
            '6367c48dd193d56ea7b0baad25b19455e529f5ee': 'test-folder/file1.txt'
        });
    });

    it('handles empty folder', async () => {
        const hashes = await getHashFilePairs('empty');
        expect(hashes).toEqual({});
    });
});