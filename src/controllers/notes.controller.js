const Note = require('../models/Note');
const notesCtrl = {};

//Renderizar el formulario para crear una nueva nota
notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

//Crear una nueva nota
notesCtrl.createNewNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newNote = new Note({ title, description });
        await newNote.save();
        req.flash('success_msg', 'Nota agregada con éxito');
        res.redirect('/notes');
    } catch (error) {
        req.flash('error_msg', 'Error al agregar la nota');
        res.redirect('/notes/new');
    }
};

//Renderizar todas las notas
notesCtrl.renderNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('notes/all-notes', { notes });
    } catch (error) {
        req.flash('error_msg', 'Error al obtener las notas');
        res.redirect('/notes');
    }
};

//Renderizar el formulario para editar una nota
notesCtrl.renderEditForm = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            req.flash('error_msg', 'Nota no encontrada');
            return res.redirect('/notes');
        }

        res.render('notes/edit-note', { note });
    } catch (error) {
        req.flash('error_msg', 'Error al obtener la nota');
        res.redirect('/notes');
    }
};

//Actualizar una nota
notesCtrl.updateNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Note.findByIdAndUpdate(req.params.id, { title, description });
        req.flash('success_msg', 'Nota actualizada con éxito');
        res.redirect('/notes');
    } catch (error) {
        req.flash('error_msg', 'Error al actualizar la nota');
        res.redirect('/notes');
    }
};

//Eliminar una nota
notesCtrl.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Nota eliminada con éxito');
        res.redirect('/notes');
    } catch (error) {
        req.flash('error_msg', 'Error al eliminar la nota');
        res.redirect('/notes');
    }
};

module.exports = notesCtrl;