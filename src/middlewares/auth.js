const middleware = {};

middleware.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash('error_msg', 'No estás autorizado para acceder a estos recursos. Primero inicia sesión.');
    res.redirect('/users/signin');
};

module.exports = middleware;