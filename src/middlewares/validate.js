const middleware = {};

middleware.isValidated = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            const errors = error.details.map(err => ({ text: err.message }));
            console.log(errors);
            res.render('users/signup', { errors });
        }
    }
};

module.exports = middleware;