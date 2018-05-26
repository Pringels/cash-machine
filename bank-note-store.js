/**
 * Assumption: bank notes are infinite.
 * This requirement could change in future, hence we abstract note storage
 * and management to a dedicated object.
 */

class BankNoteStore {
  constructor(denominations = []) {
    this._denominations = denominations
  }

  getDenominations() {
    return [...this._denominations]
  }
}

module.exports = BankNoteStore
