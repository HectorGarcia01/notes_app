const User = require('../models/User');
const usersCtrl = {};

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signUp = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;

    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
    }

    if (password.length < 8) {
        errors.push({ text: 'La contraseña debe de tener un mínimo de 8 caracteres.' });
    }

    if (errors.length > 0) {
        return res.render('users/signup', { 
            errors,
            name,
            email
        });
    } 

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

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

module.exports = usersCtrl;