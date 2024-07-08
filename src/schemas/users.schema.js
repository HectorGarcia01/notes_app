const Joi = require('joi');
const customErrorMessages = require('../utils/customError');

const validationSchemas = {};

validationSchemas.createUserSchema = Joi.object({  
    name: Joi.string()
    .label('Nombre')
    .min(5)
    .required()
    .trim()
        .pattern(new RegExp(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s-_]+$/))
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.min': customErrorMessages['string.min'],
            'string.pattern.base': 'El campo {#label} contiene caracteres no permitidos. Se permite solo letras, números, espacios, guiones y guiones bajos.'
        }),

    lastname: Joi.string()
        .label('Apellido')
        .min(3)
        .required()
        .trim()
        .pattern(new RegExp(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s-_]+$/))
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.min': customErrorMessages['string.min'],
            'string.pattern.base': 'El campo {#label} contiene caracteres no permitidos. Se permite solo letras, números, espacios, guiones y guiones bajos.'
        }),

    email: Joi.string()
        .label('Correo')
        .email({ tlds: { allow: ['com'] } })
        .required()
        .trim()
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.email': customErrorMessages['string.email']
        }),
    
    password: Joi.string()
        .label('Contraseña')
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*\\s).*$'))
        .min(8)
        .max(25)
        .required()
        .trim()
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.min': customErrorMessages['string.min'],
            'string.max': customErrorMessages['string.max'],
            'string.pattern.base': customErrorMessages['string.pattern.base']
        }),

    confirm_password: Joi.string()
        .label('Repetir Contraseña')
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'any.only': customErrorMessages['any.only']
        })
});

validationSchemas.signInSchema = Joi.object({
    email: Joi.string()
        .label('Correo')
        .email({ tlds: { allow: ['com'] } })
        .required()
        .trim()
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.email': customErrorMessages['string.email']
        }),
    password: Joi.string()
        .label('Contraseña')
        .required()
        .trim()
        .messages({
            'string.empty': customErrorMessages['string.empty']
        })
});

validationSchemas.updateUserSchema = Joi.object({
    name: Joi.string()
        .label('Nombre')
        .min(5)
        .required()
        .trim()
        .pattern(new RegExp(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s-_]+$/))
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.min': customErrorMessages['string.min'],
            'string.pattern.base': 'El campo {#label} contiene caracteres no permitidos. Se permite solo letras, números, espacios, guiones y guiones bajos.'
        }),
    lastname: Joi.string()
        .label('Apellido')
        .min(3)
        .required()
        .trim()
        .pattern(new RegExp(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s-_]+$/))
        .messages({
            'string.empty': customErrorMessages['string.empty'],
            'string.min': customErrorMessages['string.min'],
            'string.pattern.base': 'El campo {#label} contiene caracteres no permitidos. Se permite solo letras, números, espacios, guiones y guiones bajos.'
        })
});

module.exports = validationSchemas;