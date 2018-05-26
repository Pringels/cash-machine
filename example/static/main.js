const cashMachineForm = document.getElementById('cash-machine')
const errorBox = document.getElementById('error')
const noteDispenser = document.getElementById('note-dispenser')

const renderNote = note =>
  `<li class="noteDispenser__note noteDispenser__note--${note}">${note}</li>`

const resetOutput = () => {
  !errorBox.classList.contains('error--hidden') &&
    errorBox.classList.add('error--hidden')
  errorBox.innerText = ''

  !noteDispenser.classList.contains('noteDispenser--hidden') &&
    noteDispenser.classList.add('noteDispenser--hidden')
  noteDispenser.innerHTML = ''
}

const renderDispenser = ({ notes }) => {
  noteDispenser.innerHTML = notes.map(renderNote).join('')
  notes.length && noteDispenser.classList.remove('noteDispenser--hidden')
}

const renderError = ({ error }) => {
  errorBox.innerText = `Oops :( ${error}`
  errorBox.classList.remove('error--hidden')
}

const getNotes = amount =>
  fetch(`api/withdraw?amount=${amount}`)
    .then(res => {
      resetOutput()
      if (res.status !== 200) {
        res.json().then(renderError)
        throw Error()
      }
      return res.json()
    })
    .then(renderDispenser)
    .catch(err => err)

cashMachineForm.addEventListener('submit', e => {
  e.preventDefault()
  getNotes(e.target.amount.value)
})
