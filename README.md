# cash-machine

## A simple ATM emulator

Emits a set of bank notes for a given input value.

### Usage

#

```js
const CashMachine = require('cash-machine')

const cashMachine = new CashMachine({
  denominations: [100, 50, 20, 10]
})

cashMachine.withdraw(80) // returns [50, 20, 10]
cashMachine.withdraw(125) // throws NoteUnavailableError
```

### Example

#

To run the example code simply cd into the directory and run

```bash
$ yarn start
```

or

```bash
$ npm run start
```
