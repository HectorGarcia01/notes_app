const { Router } = require('express');
const router = Router();

const { isValidated } = require('../middlewares/validate');
const { noteSchema } = require('../schemas/notes.schema');
const { 
    renderNoteForm, 
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');
const { isAuthenticated } = require('../middlewares/auth');

//Nueva nota
router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', isAuthenticated, isValidated(noteSchema, 'notes/new-note'), createNewNote);

//Obtener todas las notas
router.get('/notes', isAuthenticated, renderNotes);

//Editar notas
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit/:id', isAuthenticated, isValidated(noteSchema, null, 'notes'), updateNote);

//Eliminar notas
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;