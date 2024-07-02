const { Router } = require('express');
const router = Router();

const { 
    renderNoteForm, 
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');

//Nueva nota
router.get('/notes/add', renderNoteForm);
router.post('/notes/new-note', createNewNote);

//Obtener todas las notas
router.get('/notes', renderNotes);

//Editar notas
router.get('/notes/edit/:id', renderEditForm);
router.put('/notes/edit/:id', updateNote);

//Eliminar notas
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;