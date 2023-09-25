const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');
const { validarCampos } = require('../middlewares/validar-campos');
const { getListTipos, createTipo, deleteTipo } = require('../controllers/cTipo');

const router = Router();

router.use(validarJWT);

router.get('/', getListTipos);

router.use(validarRol);

router.post('/',
    [
        check('tipo', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 4, max: 15 }).isAlphanumeric('es-ES'),
        check('numero', 'Este campo es obligatorio').not().isEmpty().isLength({ min: 3, max: 12 }),
        validarCampos
    ],
    createTipo
);

router.delete('/:id', deleteTipo);

module.exports = router;
