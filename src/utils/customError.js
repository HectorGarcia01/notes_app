const customErrorMessages = {
    'string.empty': 'El campo {#label} es obligatorio.',
    'string.email': 'Debe ser un correo electrónico válido y con extensión ".com"',
    'string.min': '{#label} debe tener un mínimo de {#limit} caracteres.',
    'string.max': '{#label} debe tener un máximo de {#limit} caracteres.',
    'string.pattern.base': 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y no puede contener espacios.',
    'any.only': 'Las contraseñas no coinciden.'
};

module.exports = customErrorMessages;