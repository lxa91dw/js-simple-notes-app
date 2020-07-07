  
import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

// generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // setup note link
    textEl.id = note.id

    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'unnamed note'
    }
    noteEl.href = `/edit.html#${note.id}`

    //status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
        
    // add classes
    noteEl.classList.add('list-item')
    textEl.classList.add('list-item__title')
    statusEl.classList.add('list-item__subtitle')

    // add elements to Note
    textEl.appendChild(statusEl)
    noteEl.appendChild(textEl)

    return noteEl
}

// render application notes
const renderNotes = function () {
    const filters = getFilters()

    const notesEl = document.querySelector("#notes")
    const notes = sortNotes(filters)
    let filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => notesEl.appendChild(generateNoteDOM(note)))
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No Notes to Show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector("#note-title")
    const bodyElement = document.querySelector("#note-body")
    const dateElement = document.querySelector("#last-edited")

    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)
    
    if (!note) {
        location.assign('/index.html')
    }
    
    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}

const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateLastEdited, renderNotes, generateNoteDOM, initializeEditPage }