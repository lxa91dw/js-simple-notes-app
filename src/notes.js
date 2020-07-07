import moment from 'moment'

let notes = []

const newIndex = () => {
    const index = localStorage.getItem('index')

    if (index) {
        const nextIndex = Number(index) + 1
        localStorage.setItem('index', String(nextIndex))
        return String(nextIndex)
    } else {
        localStorage.setItem('index', String(50))
        return '50'

    }
}


// check for existing saved data
const loadNotes = () => {

    const notesJSON = localStorage.getItem('notes')
    try {
        if (notesJSON) {
            return JSON.parse(notesJSON)
        } else {
            now = moment().valueOf()
            newNote = [{
                id: newIndex(),
                title: 'A note to get you started',
                body: 'This is just a simple default note to get your notes list started',
                createdAt: now,
                updatedAt: now
            }]
            saveNotes(newNote)
            return newNote

    }} catch (e) {
        return []

    }

}

// save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//expose notes from function
const getNotes = () => notes

const createNote = () => {
    const now = moment().valueOf()
    const newID = newIndex()
    notes.push({
        id: newID,
        title: 'New Note',
        body: 'You clicked the Create Note button.  This will cause this note to be created in LocalStorage.',
        createdAt: now,
        updatedAt: now
    })
    saveNotes()
    return newID
}

notes = loadNotes()

// Remove a note from the Notes list
const removeNote = (id) => {
    const noteIndex = findNoteIndex(id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort notes by one of three valid ways
const sortNotes =  (filters) => {
    let newNotes = []
    
    if (filters.sortBy === 'byEdited') {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.updatedAt > e2.updatedAt) return -1; else if (e1.updatedAt < e2.updatedAt) return 1; else return 0
            })
        
    } else if (filters.sortBy === 'byCreated') {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.createdAt > e2.createdAt) return -1; else if (e1.createdAt < e2.createdAt) return 1; else return 0})

    } else if (filters.sortBy === 'byAlpha') {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.title.toLowerCase() < e2.title.toLowerCase()) return -1; else if (e1.title.toLowerCase() > e2.title.toLowerCase()) return 1; else return 0})
    } else {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.updatedAt < e2.updatedAt) return -1; else if (e1.updatedAt > e2.updatedAt) return 1; else return 0
            })
    }

    return newNotes
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

export { getNotes, createNote, removeNote, sortNotes, updateNote }
