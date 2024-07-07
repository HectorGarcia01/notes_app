const { renderSignUpForm } = require('../controllers/users.controller');
const { renderEditForm } = require('../controllers/notes.controller');
const middleware = {};

middleware.isValidated = (schema, redirectUrl, data) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            const errors = error.details.map(err => ({ text: err.message }));
            
            if (data === 'addUser') {
                return renderSignUpForm(req, res, errors, req.body.name, req.body.email);
            }

            if (data === 'notes') {
                return renderEditForm(req, res, errors, 'Datos restaurados exitosamente.');
            }

            res.render(redirectUrl, { errors });
        }
    }
};

module.exports = middleware;