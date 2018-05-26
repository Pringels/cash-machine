const { isDivisibleBy, isPositiveFloat } = require('./utils/math')
const { NoteUnavailableError, InvalidArgumentError } = require('./utils/errors')

const BankNoteStore = require('./bank-note-store')
const BankAccount = require('./bank-account')

class CashMachine {
  constructor({ denominations } = {}) {
    this._requestedAmount
    this._outputNoteBuffer = []

    this._store = new BankNoteStore(denominations)
    this._denominations = this._store.getDenominations()

    /**
     * Dummy account which might be injected in future
     */
    this._account = new BankAccount()
  }

  _reset() {
    this._requestedAmount = null
    this._outputNoteBuffer = []
  }

  _divideAmountIntoNotes() {
    this._denominations.forEach(denomination => {
      while (denomination <= this._requestedAmount) {
        this._outputNoteBuffer.push(denomination)
        this._requestedAmount -= denomination
      }
    })
  }

  _calculateOutputNotes(amount) {
    this._requestedAmount = amount
    while (this._requestedAmount > 0) {
      this._divideAmountIntoNotes()
    }
    const outputNotes = this._outputNoteBuffer
    this._reset()
    return outputNotes
  }

  _canProduceDenominations(amount) {
    if (this._denominations.some(isDivisibleBy(amount))) {
      return true
    }
    throw new NoteUnavailableError('notes not avilable for specified amount')
  }

  _isValidAmount(amount) {
    if (isPositiveFloat(amount)) {
      return true
    } else {
      throw new InvalidArgumentError('The amount specified was not valid')
    }
  }

  withdraw(amount) {
    if (
      amount !== undefined &&
      amount !== null &&
      this._isValidAmount(amount) &&
      this._canProduceDenominations(amount) &&
      this._account.hasFunds()
    ) {
      this._account.deduct(amount)
      return this._calculateOutputNotes(amount)
    } else {
      return []
    }
  }
}

module.exports = CashMachine
