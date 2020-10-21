function exercise(i) {
    if (typeof i !== 'number')
        throw new Error('Input should be number')
    if ((i % 3 === 0) && (i % 5 === 0))
        return 'Fizzbuzz'
    if ((i % 3 === 0))
        return 'Fizz'
    if ((i % 5 === 0))
        return 'buzz'
    return i
}

describe('Exercise Test Group', () => {
test('If invalid input', () => {
    expect(() => { exercise('a')}).toThrow()
    expect(() => { exercise(null)}).toThrow()
    expect(() => { exercise(undefined)}).toThrow()
    expect(() => { exercise({})}).toThrow()
});
    
test('Test', () => {
    const value = exercise(120);
    expect(value).toBe('Fizzbuzz')
});
    
})