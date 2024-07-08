const { Router } = require('express');
const router = Router();

const {isValidated } = require('../middlewares/validate');
const { createUserSchema, signInSchema, updateUserSchema } = require('../schemas/users.schema');
const { isAuthenticated } = require('../middlewares/auth');
const {
    renderSignUpForm,
    signUp,
    renderUserProfile,
    renderEditProfileForm,
    updateUserProfile,
    renderSignInForm,
    signIn,
    logout
} = require('../controllers/users.controller');

//Nuevo usuario
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', isValidated(createUserSchema, null, 'addUser'), signUp);

//Iniciar sesión
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', isValidated(signInSchema, 'users/signin'), signIn);

//Ver perfil
router.get('/users/profile', isAuthenticated, renderUserProfile);

//Editar perfil
router.get('/users/edit-profile', isAuthenticated, renderEditProfileForm);
router.put('/users/edit-profile', isAuthenticated, isValidated(updateUserSchema, null, 'userUpdate'), updateUserProfile);

//Cerrar sesión
router.get('/users/logout', logout);

module.exports = router;