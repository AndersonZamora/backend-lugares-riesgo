const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');
const { validarCampos } = require('../middlewares/validar-campos');
const { getListUsers, deleteUser, createSerene, getListSerene, getSerene, deleteSerene, listAlertCitizenAdmin, deleteAlertUser } = require('../controllers/adminUser');

const router = Router();
router.use(validarJWT);
router.use(validarRol);

router.get('/risuto/citizen', getListUsers);

router.get('/risuto/alerts/:id', listAlertCitizenAdmin);

router.delete('/risuto/citizen/:id', deleteUser);

router.delete('/risuto/alerts/user/:id', deleteAlertUser);

router.post('/risuto/serene',
    [
        check('nombres', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('apellidos', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 30 }),
        check('celular', 'Este campo es obligatorio').not().isEmpty().isMobilePhone('es-PE'),
        check('correo', 'Email no válido').isEmail(),
        check('contrasenia', 'Este campo es obligatorio (minimo cuatro caracteres)').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    createSerene
);
router.get('/risuto/serene', getListSerene);

router.get('/risuto/serene/:id', getSerene);

router.delete('/risuto/serene/:id', deleteSerene);

module.exports = router;

