const { Schema, model } = require('mongoose');

//Definir el esquema Note
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Crear y exportar el modelo Note
module.exports = model('Note', NoteSchema);