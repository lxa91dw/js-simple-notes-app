'use strict'
  
const titleElement = document.querySelector("#note-title")
const bodyElement = document.querySelector("#note-body")
const dateElement = document.querySelector("#last-edited")

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = findNote(noteId)

if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
titleElement.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`

    saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`

    saveNotes(notes)
})

document.querySelector("#remove-note").addEventListener('click', (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

// document.querySelector("#screw-note").addEventListener('click', (e) => {
//     note.title = '@@@' + note.title
//     note.body = note.body + ' ...I added this to screw with the note body...'
//     saveNotes(notes)
// })

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
      notes = JSON.parse(e.newValue)
      note = findNote(noteId)
      if (!note){
          location.assign('/index.html')
      }

      titleElement.value = note.title
      bodyElement.value = note.body
  }  
})
