const getIgnores = require('../getIgnores.js');
const mock = require('mock-fs');

describe('getIgnores', () => {
  beforeEach(()=>{
    mock({
      'test.gitignore' : 'foo\nbar',
      'empty.gitignore' : '',
      'test2.gitignore' : '#startoffile\nfoo\n#bar\n\nbar'
  });
  });
  afterEach(()=>mock.restore());
  it('returns a Set', async () => {
    const ignores = await getIgnores('test.gitignore');
    expect(ignores).toBeInstanceOf(Set); 
  });

  it('returns empty Set for empty gitignore', async () => {
    const ignores = await getIgnores('empty.gitignore');
    expect(ignores.size).toBe(0);
  });

  it('returns Set with entries from gitignore', async () => {
    const ignores = await getIgnores('test.gitignore');
    expect(ignores).toEqual(new Set(['foo', 'bar', 'foo/**', 'bar/**']));
  });

  it('ignores comments and empty lines', async () => {
    const ignores = await getIgnores('test2.gitignore');
    expect(ignores).toEqual(new Set(['foo', 'bar', 'foo/**', 'bar/**'])); 
  });
});