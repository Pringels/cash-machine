const { expect } = require('chai')
const BankNoteStore = require('../bank-note-store')

describe('BankNoteStore', () => {
  let store

  before(() => {
    store = new BankNoteStore([1, 2, 3, 4])
  })

  it('should return expected denominations', () => {
    expect(store.getDenominations()).to.be.eql([1, 2, 3, 4])
  })
})
