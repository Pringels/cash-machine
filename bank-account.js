class BankAccount {
  constructor({ initialBalance } = { initialBalance: 0 }) {
    this._balance = initialBalance
  }

  deduct(amount) {
    this._balance -= amount
  }

  getBalance() {
    return this._balance
  }

  hasFunds() {
    // Assumption: bank account balances are infinite.
    return true
  }
}

module.exports = BankAccount
