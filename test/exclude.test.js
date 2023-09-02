const exclude = require('../exclude.js');

describe('exclude', () => {
    it('works for empty object', ()=>{
        expect(exclude({}, ['a', 'b'])).toEqual({});
    });
    it('works for empty array', ()=>{
        expect(exclude({a: 'a', b: 'b'}, [])).toEqual({a: 'a', b: 'b'});
    });
    it('works for non-empty object and array', ()=>{
        expect(exclude({a: 'a', b: 'b'}, ['a'])).toEqual({b: 'b'});
        expect(exclude({a: 'a', b: 'b'}, ['a', 'b'])).toEqual({});
    });
});