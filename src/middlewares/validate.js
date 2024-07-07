const middleware = {};

middleware.isValidated = (schema, redirectUrl) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            const errors = error.details.map(err => ({ text: err.message }));
            res.render(redirectUrl, { errors });
        }
    }
};

module.exports = middleware;