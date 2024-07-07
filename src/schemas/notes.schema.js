const Joi = require('joi');
const customErrorMessages = require('../utils/customError');

const validationSchemas = {};

validationSchemas.noteSchema = Joi.object({
    title: Joi.string()
        .label('Título')
        .min(5)
        .required()
        .trim()
        .pattern(new RegExp(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s-_#,$.;\/]+$/))
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.min': customErrorMessages['string.min'],
            'string.pattern.base': 'El campo {#label} contiene caracteres no permitidos. Se permite solo letras, números, espacios, guiones, guiones bajos, numeral, signo dólar, comas, puntos y comas, puntos y diagonales.'
        }),

    description: Joi.string()
        .label('Descripción')
        .min(5)
        .required()
        .trim()
        .pattern(new RegExp(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s-_#,$.;\/]+$/))
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.min': customErrorMessages['string.min'],
            'string.pattern.base': 'El campo {#label} contiene caracteres no permitidos. Se permite solo letras, números, espacios, guiones, guiones bajos, numeral, signo dólar, comas, puntos y comas, puntos y diagonales.'
        })
});

module.exports = validationSchemas;