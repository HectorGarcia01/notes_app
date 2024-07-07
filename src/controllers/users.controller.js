const User = require('../models/User');
const passport = require('passport');
const usersCtrl = {};

//Renderizar el formulario para registrar nuevo usuario
usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

//Crear nuevo usuario
usersCtrl.signUp = async (req, res) => {
    const { name, email, password } = req.body; 

    try {
        const emailUser = await User.findOne({ email });

        if (emailUser) {
            req.flash('error_msg', 'El correo ya está en uso.');
            return res.redirect('/users/signup');
        }

        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

        req.flash('success_msg', 'Se ha registrado con éxito.');
        res.redirect('/users/signin');
    } catch (error) {
        req.flash('error_msg', 'Ha ocurrido un error en el registro.');
        res.redirect('/users/signup');
    }
};

//Renderizar el formulario para iniciar sesión
usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

//Inicio de sesión
usersCtrl.signIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

//Cerrar sesión
usersCtrl.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Se ha cerrado la sesión con éxito.');
        res.redirect('/users/signin');
    });
};

module.exports = usersCtrl;