const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

const { notes } = require('./db/db.json');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return newNote;
};

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(notes);
});

app.post('/api/notes', (req, res) => {

    const note = createNewNote(req.body, notes);
    if ((req.body) !== 'string') {
        res.status(400).send('Cannot be empty');
    }
    else {
    }
    res.json(note);
    console.log("New note created!")
});



app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});