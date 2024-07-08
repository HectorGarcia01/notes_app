const User = require('../models/User');
const passport = require('passport');
const usersCtrl = {};

//Renderizar el formulario para registrar nuevo usuario
usersCtrl.renderSignUpForm = (req, res, errors = null, name = null, lastname = null, email = null) => {
    res.render('users/signup', { errors, name, lastname, email });
};

//Crear nuevo usuario
usersCtrl.signUp = async (req, res) => {
    const { name, lastname, email, password } = req.body; 

    try {
        const emailUser = await User.findOne({ email });

        if (emailUser) {
            const error_msg = 'El correo ya está en uso.';
            return res.render('users/signup', { error_msg, name, lastname });
        }

        const newUser = new User({ name, lastname, email, password });
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

//Renderizar el perfil de usuario
usersCtrl.renderUserProfile = (req, res) => {
    try {
        const { name, lastname, email } = req.user;
        res.render('users/profile', { name, lastname, email });
    } catch (error) {
        req.flash('error_msg', 'Error al obtener tus datos.');
        res.redirect('/notes');
    }
};

//Renderizar el formulario para actualizar perfil de usuario
usersCtrl.renderEditProfileForm = async (req, res, errors = null, success_msg = null) => {
    try {
        res.render('users/edit-profile', { user: req.user, errors, success_msg });
    } catch (error) {
        req.flash('error_msg', 'Error al obtener tus datos.');
        res.redirect('/users/profile');
    }
};

//Actualizar perfil de usuario
usersCtrl.updateUserProfile = async (req, res) => {
    try {
        const { name, lastname } = req.body;
        await User.findByIdAndUpdate(req.user.id, { name, lastname });
        req.flash('success_msg', 'Perfil actualizado con éxito.');
        res.redirect('/users/profile');
    } catch (error) {
        req.flash('error_msg', 'Error al actualizar tu perfil.');
        res.redirect('/users/profile');
    }
};

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