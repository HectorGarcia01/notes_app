const { Router } = require('express');
const router = Router();

const {
    renderSignUpForm,
    signUp,
    renderSignInForm,
    signIn,
    logout

} = require('../controllers/users.controller');

//Nuevo usuario
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signUp);

//Iniciar sesión
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signIn);

//Cerrar sesión
router.get('/users/logout', logout);

module.exports = router;