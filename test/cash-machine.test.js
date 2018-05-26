const { assert, expect } = require('chai')
const CashMachine = require('../cash-machine')

const {
  NoteUnavailableError,
  InvalidArgumentError
} = require('../utils/errors')

describe('CashMachine', () => {
  let cashMachine

  before(() => {
    cashMachine = new CashMachine({
      denominations: [100, 50, 20, 10]
    })
  })

  it('should correctly denominate some valid cash amounts', () => {
    let cash = cashMachine.withdraw(30)
    expect(cash).to.be.eql([20, 10])

    cash = cashMachine.withdraw(80)
    expect(cash).to.be.eql([50, 20, 10])
  })

  it('should throw and error if requested amount cannot be divided', () => {
    assert.throw(
      () => cashMachine.withdraw(125),
      NoteUnavailableError,
      'notes not avilable for specified amount'
    )
  })

  it('should throw and error if requested amount was invalid', () => {
    assert.throw(
      () => cashMachine.withdraw(-125),
      InvalidArgumentError,
      'The amount specified was not valid'
    )
  })

  it('should return an empty set if no amount is supplied', () => {
    let cash = cashMachine.withdraw()
    expect(cash).to.be.eql([])
  })
})
