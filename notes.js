const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title is taken!'))
    }
}

const removeNote = (title) => {
    notes = loadNotes()
    const remainingNotes = notes.filter((note) => title !== note.title)

    if (remainingNotes.length === notes.length) {
        console.log(chalk.red('No note found!'))
    } else {
        console.log(chalk.green('Note removed!'))
        saveNotes(remainingNotes)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length === 0) {
        console.log(chalk.yellow('You have no notes!'))
    } else {
        console.log(chalk.bgGreen('Your notes'))
        notes.forEach((note) => console.log(note.title));
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (!note) {
        console.log(chalk.red('Note not found!'))
    } else {
        console.log(chalk.bold.inverse(note.title))
        console.log(note.body)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}