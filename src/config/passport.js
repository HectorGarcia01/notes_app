const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

//Configuración de la estrategia de autenticación local
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //Confirmar si existe el correo en la bd
    const user = await User.findOne({  email });

    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado.' });
    }

    //Validar la contraseña del usuario
    const match = await user.matchPassword(password);

    if (!match) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
    }

    return done(null, user);
}));

//Serializar el usuario para almacenarlo en la sesión
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Deserializar el usuario a partir del ID almacenado en la sesión
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});