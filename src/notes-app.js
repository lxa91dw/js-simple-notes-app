'use strict'  

let notes = getSavedNotes()

const filters = {
    searchText: '',
    filterBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const now = moment().valueOf()
    const newID = newIndex()
    notes.push({
        id: newID,
        title: 'New Note',
        body: 'You clicked the Create Note button.  This will cause this note to be created in LocalStorage.',
        createdAt: now,
        updatedAt: now
    })
    saveNotes(notes)
    location.assign(`/edit.html#${newID}`)
    //renderNotes(notes, filters)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.filterBy = e.target.value
    renderNotes(notes, filters)
})

// document.querySelector('#name-form').addEventListener('submit', (e) => {
//     e.preventDefault()
//     console.log(e.target.elements.firstName.value)
//     e.target.elements.firstName.value = ''
// })

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }  
  })
