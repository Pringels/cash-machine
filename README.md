# cash-machine

## A simple ATM emulator

Emits a set of bank notes for a given input value.  
The machine will always attempt to return the lowest number of notes.

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

To run the example code simply cd into the directory and run the following commands:

```bash
$ npm install
...
$ npm run start
```
