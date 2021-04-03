const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');

// parse incoming string or array data
// app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
// app.use(express.json());

// app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log(notes);
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});