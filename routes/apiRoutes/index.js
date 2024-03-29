// Var declaration/dependencies
const router = require('express').Router();
const fs = require('fs');

// Reads the database file and return the saved notes as a json
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Post request receives new note to save on the request body, add it to the database file, and return the new note to the client
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        const note = req.body;
        const id = (notes.length).toString();
        note.id = id;
        notes.push(note);

        fs.writeFileSync('db/db.json', JSON.stringify(notes));

        res.json(notes);
    });
});

// Deletes a selected note based on id(deleted starter sample note, it had no id and could not be deleted)(bonus)
router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        const id = req.params.id;
        const deleted = notes.filter((target) => target.id != id);

        fs.writeFileSync('./db/db.json', JSON.stringify(deleted));

        res.json(notes);
    });
});

module.exports = router;