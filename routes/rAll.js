const { Router } = require('express');
const { check } = require('express-validator');
const { revalidarToken, registrarCitizen, loginCitizen, loginHero, registrarHero, loginSerene } = require('../controllers/cAll')
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/roguin/citizen',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    loginCitizen
)

router.post('/atarashi/citizen',
    [
        check('nombres', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('apellidos', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('celular', 'Este campo es obligatorio').not().isEmpty().isMobilePhone('es-PE'),
        check('correo', 'Email no válido').isEmail(),
        check('contrasenia', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 15 }),
        // check('state', 'El estado es obligatorio ').not().isEmpty(),
        validarCampos
    ],
    registrarCitizen
);

router.post('/roguin/hero',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    loginHero
)

router.post('/atarashi/hero',
    [
        check('nombres', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('apellidos', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('celular', 'Este campo es obligatorio').not().isEmpty().isMobilePhone('es-PE'),
        check('correo', 'Email no válido').isEmail(),
        check('contrasenia', 'Este campo es obligatorio (minimo cuatro caracteres)').not().isEmpty().isLength({ min: 4, max: 15 }),
        check('state', 'El estado es obligatorio ').not().isEmpty(),
        validarCampos
    ],
    registrarHero
);

router.post('/roguin/serene',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    loginSerene
)

router.post('/renew', validarJWT, revalidarToken);

module.exports = router;