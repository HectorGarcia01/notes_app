const { Router } = require('express');
const router = Router();

const {isValidated } = require('../middlewares/validate');
const { createUserSchema, signInSchema } = require('../schemas/users.schema');
const {
    renderSignUpForm,
    signUp,
    renderSignInForm,
    signIn,
    logout

} = require('../controllers/users.controller');

//Nuevo usuario
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', isValidated(createUserSchema, 'users/signup'), signUp);

//Iniciar sesión
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', isValidated(signInSchema, 'users/signin'), signIn);

//Cerrar sesión
router.get('/users/logout', logout);

module.exports = router;