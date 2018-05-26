const cashMachineForm = document.getElementById('cash-machine')
const errorBox = document.getElementById('error')
const noteDispenser = document.getElementById('note-dispenser')
const loader = document.getElementById('loader')

const hideElem = (elem, className) =>
  !elem.classList.contains(className) && elem.classList.add(className)

const renderNote = note =>
  `<li class="noteDispenser__note noteDispenser__note--${note}">${note}</li>`

const resetOutput = () => {
  hideElem(errorBox, 'error--hidden')
  hideElem(noteDispenser, 'noteDispenser--hidden')
  noteDispenser.innerHTML = ''
  errorBox.innerText = ''
}

const renderDispenser = ({ notes }) => {
  noteDispenser.innerHTML = notes.map(renderNote).join('')
  notes.length && noteDispenser.classList.remove('noteDispenser--hidden')
}

const renderError = ({ error }) => {
  errorBox.innerText = `Oops :( ${error}`
  errorBox.classList.remove('error--hidden')
}

const showLoader = () => loader.classList.remove('loader--hidden')
const hideLoader = () => hideElem(loader, 'loader--hidden')

const getNotes = amount => (
  resetOutput(),
  showLoader(),
  fetch(`api/withdraw?amount=${amount}`)
    .then(res => {
      hideLoader()
      if (res.status !== 200) {
        res.json().then(renderError)
        throw Error()
      }
      return res.json()
    })
    .then(renderDispenser)
    .catch(err => err)
)

cashMachineForm.addEventListener('submit', e => {
  e.preventDefault()
  getNotes(e.target.amount.value)
})
