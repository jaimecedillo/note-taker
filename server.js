// required dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
// id generator
const { v4: uuidv4 } = require('uuid');


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

// create new note function
function createNewNote(body, notesArray) {
    const newNote = body;
    newNote.id = uuidv4();
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};

// Get API notes
app.get('/api/notes', async (req, res) => {
    try {
        let allNotes = await fs.readFileSync(
            path.join(__dirname, './db/db.json'), "utf8");
        res.json(JSON.parse(allNotes));
    } catch (err) {
        res.json(err)
    }
});
// post API notes
app.post('/api/notes', async (req, res) => {
    let allNotes = await fs.readFileSync(
        path.join(__dirname, './db/db.json'), "utf8");

    const note = await createNewNote(req.body, JSON.parse(allNotes));
    if ((req.body.text) === '' || (req.body.title) === '') {
        res.status(400).send('Cannot be empty');
    }
    else {
        res.json(note);
        console.log("New note created!")
    }
});

// delete API notes
app.delete('/api/notes/:id', async (req, res) => {
    let allNotes = await fs.readFileSync(
        path.join(__dirname, './db/db.json'), "utf8"
    );
    let newNotes = JSON.parse(allNotes).filter((note) => {
        return note.id !== req.params.id;
    })
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(newNotes, null, 2)
    )
    return res.json(newNotes);
})

// notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// index route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// Server listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});