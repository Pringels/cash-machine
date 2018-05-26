const { expect } = require('chai')
const BankAccount = require('../bank-account')

describe('BankAccount', () => {
  let bankAccount

  before(() => {
    bankAccount = new BankAccount({
      initialBalance: 10
    })
  })

  it('should always have funds', () => {
    expect(bankAccount.getBalance()).to.be.equal(10)
    expect(bankAccount.hasFunds()).to.be.true
    bankAccount.deduct(10)
    expect(bankAccount.getBalance()).to.be.equal(0)
    expect(bankAccount.hasFunds()).to.be.true
  })
})
