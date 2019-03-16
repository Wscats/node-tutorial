const chai = require('chai')
const expect = chai.expect
const getNum = require('../index')

describe('Test', function () {
    it('should return 20 when the value is 10', function () {
        expect(getNum(10)).to.equal(20)
    })
    it('should return 1 when the value is 0', function () {
        expect(getNum(0)).to.equal(1)
    })
})