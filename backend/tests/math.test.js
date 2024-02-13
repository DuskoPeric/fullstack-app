const {calculate} = require('../src/math')

test('Should calculate tip',()=>{
    const total= calculate(10);
    expect(total).toBe(20);
})
