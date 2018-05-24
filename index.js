const { isDivisibleBy } = require('./utils/math');
const {
    NoteUnavailableError,
    InvalidArgumentError
} = require('./utils/errors')

class CashMachine {
    constructor({ denominationPriority } = { denominationPriority: 'large' }) {
        this._denominationPriority = denominationPriority;
        this._requestedAmount;

        this._stockedNotes = [100, 50, 20, 10];
        this._outputNoteBuffer = [];
    }

    _reset() {
        this._requestedAmount = null;
        this._outputNoteBuffer = [];
    }

    _divideAmount() {
        this._stockedNotes.forEach(note => {
            while (note <= this._requestedAmount) {
                this._outputNoteBuffer.push(note);
                this._requestedAmount -= note;
            }
        })
    }

    _calculateOutputNotes(amount) {
        this._requestedAmount = amount;
        while (this._requestedAmount > 0) {
            this._divideAmount();
        }
        const outputNotes = this._outputNoteBuffer;
        this._reset();
        return outputNotes;
    }

    _canProduceDenominations(amount) {
        if (this._stockedNotes.some(isDivisibleBy(amount))) {
            return true;
        }
        throw new NoteUnavailableError(
            'notes not avilable for specified amount'
        );
    }

    _isValidAmount(amount) {
        if (!Number.isNaN(parseFloat(amount)) &&
            Number.isFinite(amount) &&
            amount > 0) {
            return true;
        } else {
            throw new InvalidArgumentError(
                'The amount specified was not valid'
            );
        }
    }

    withdraw(amount) {
        if (amount &&
            this._isValidAmount(amount) &&
            this._canProduceDenominations(amount)) {
            return this._calculateOutputNotes(amount);
        } else {
            return [];
        }
    }
}



// const notes = [100, 50, 20, 10]

// const requests = [30, 80, 125, 60, 600]
// const requestsFull = [30, 80, 125, -130, null]

// const isDivisibleBy = amount => note => amount % note === 0;

// const sortByLargest = (a, b) => a < b

// const divideIntoNotes = (amount, notes) => {
//     const returnNotes = [];
//     while (amount > 0) {
//         notes.forEach(note => {
//             while (note <= amount) {
//                 returnNotes.push(note);
//                 amount -= note;
//             }
//         })
//     }
//     return returnNotes;
// }

// const getCash = amount => {
//     const divideByAmount = isDivisibleBy(amount);
//     const divide = notes.some(divideByAmount);
//     if (divide) {
//         let returnNotes = divideIntoNotes(amount, notes.sort(sortByLargest));
//         console.log('REUTNR NOTES', returnNotes);
//         memoizeCache.set(amount, returnNotes);
//     }

// }

// requests.map(getNotes)

module.exports = {
    CashMachine
}