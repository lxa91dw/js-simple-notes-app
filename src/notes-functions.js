'use strict'
  
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
// let initNotes = [
//     {
//         id: newIndex(),
//         title: 'Make the wine rack',
//         body: 'wine rack needs several coats of paint plus light sanding in between'
//     },
//     {
//         id: newIndex(),
//         title: 'React training',
//         body: 'need to spend at least 5 hours a week on React training'
//     },
//     {
//         id: newIndex(),
//         title: 'JavaScript Training',
//         body: 'Finish Chapter 8 by the end of this week, then start plowing into React as well'
//     },
//     {
//         id: newIndex(),
//         title: 'Start the Clean up my phone',
//         body: 'Clean up apps and photos to give me more space.'
//     },
//     {
//         id: newIndex(),
//         title: 'Make one w/o ',
//         body: 'This is to create a note that does not contain the letter T'
//     }

// ]


// check for existing saved data
const getSavedNotes = () => {

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
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

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
    statusEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    
    // remove button
    // const noteBtn = document.createElement('button')
    // noteBtn.textContent = 'x'
    // noteBtn.addEventListener('click', (e) => {
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })
    
    // add classes
    noteEl.classList.add('list-item')
    textEl.classList.add('list-item__title')
    statusEl.classList.add('list-item__subtitle')

    // add elements to Note
    textEl.appendChild(statusEl)
    // noteEl.appendChild(noteBtn)
    noteEl.appendChild(textEl)

    return noteEl
}

// Remove a note from the Notes list
const removeNote = (id) => {
    const noteIndex = findNoteIndex(id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Sort notes by one of three valid ways
const sortNotes = (notes, filters) => {
    let newNotes = []
    
    if (filters.filterBy === 'byEdited') {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.updatedAt > e2.updatedAt) return -1; else if (e1.updatedAt < e2.updatedAt) return 1; else return 0
            })
        
    } else if (filters.filterBy === 'byCreated') {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.createdAt > e2.createdAt) return -1; else if (e1.createdAt < e2.createdAt) return 1; else return 0})

    } else if (filters.filterBy === 'byAlpha') {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.title.toLowerCase() < e2.title.toLowerCase()) return -1; else if (e1.title.toLowerCase() > e2.title.toLowerCase()) return 1; else return 0})
    } else {
        newNotes = notes.sort(function (e1, e2) {
            if (e1.updatedAt < e2.updatedAt) return -1; else if (e1.updatedAt > e2.updatedAt) return 1; else return 0
            })
    }

    return newNotes
}

// render application notes
const renderNotes = function (notes, filters) {
    const notesEl = document.querySelector("#notes")
    notes = sortNotes(notes, filters)
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

const findNote = (id) => notes.find((note) => note.id === id)

const findNoteIndex = (id) => notes.findIndex((note) => note.id === id)
