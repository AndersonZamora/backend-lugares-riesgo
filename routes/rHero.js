const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { registrarHero, loginHero } = require('../controllers/cHero');

const router = Router();

// router.post('/',
//     [
//         check('email', 'Email es obligatorio').isEmail(),
//         check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
//         validarCampos
//     ],
//     loginHero
// )

// router.post('/auth',
//     [
//         check('nombres', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
//         check('apellidos', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
//         check('celular', 'Este campo es obligatorio').not().isEmpty().isMobilePhone('es-PE'),
//         check('correo', 'Email no válido').isEmail(),
//         check('contrasenia', 'Este campo es obligatorio (minimo cuatro caracteres)').not().isEmpty().isLength({ min: 4, max: 15 }),
//         check('state', 'El estado es obligatorio ').not().isEmpty(),
//         validarCampos
//     ],
//     registrarHero
// );

module.exports = router;
