const express = require('express')
const app = express()

const CashMachine = require('../cash-machine')

const denominations = [100, 50, 20, 10]
const cashMachine = new CashMachine({ denominations })

app.use(express.static('static'))

app.get('/api/withdraw', (req, res) => {
  try {
    let notes = cashMachine.withdraw(
      req.query.amount ? parseFloat(req.query.amount) : null
    )
    res.send({ notes })
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

app.get('/api/denominations', (req, res) => res.send(denominations))

app.listen(3001, () =>
  console.log('Example cash machine app listening on port 3000!')
)
