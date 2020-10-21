function sum(a,b) {
    return a + b;
}
function absolute(a) {
    return (a>=0)?a+10:a-10
}
function name(x) {
    return 'hello '+x
}
function object(id) {
    return { id: id, price: 10, group:'sale' }
}
function register(username) {
    if (!username) throw new Error('Username required')
    return { id: new Date().getTime(), username: username }
}

describe('All tests grouped', () => { 
    test('Our First Test', () => {
    const value = 32 + 2;
    expect(value).toBe(34);
    expect(value).toBeGreaterThanOrEqual(34);
});

test('Our Second Test', () => {
    const value = 32 - 2;
    expect(value).toBe(30);
    expect(value).toBeGreaterThanOrEqual(10);
});
    
test('Our Third Test:Sum', () => {
    const value = sum(2,3);
    expect(value).toBe(5);
});
    
test('Our Fourth Test:Absolute', () => {
    const value = absolute(-2);
    expect(value).toBe(-12);
});

})
describe('All tests grouped: Name', () => {
it('Our Fifth Test:Name', () => {
    const value = name('Sid');
    // expect(value).toBe('hello Sid');
    // expect(value).toMatch(/Sid/);
    expect(value).toContain('Sid');
});
it('Our Fifth Test:object', () => {
    const value = object(12);
    // expect(value).toEqual({ id: 12, price: 10 });
    expect(value).toMatchObject({ id: 12, price: 10 });
    expect(value).toHaveProperty('id',12);
});
it('if username is falsy', () => {
    const args = [null,undefined,NaN,"",0,false]
    args.forEach(a => { 
        expect(() => { register(a) }).toThrow();
    })
});
    it('if username is passed', () => {
    const result = register('Sid')
    expect(result).toMatchObject({ username: 'Sid' });
    expect(result.id).toBeGreaterThan(0);
});
})