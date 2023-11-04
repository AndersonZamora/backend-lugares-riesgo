const { Router } = require('express');
const { check } = require('express-validator');
const { validarRol } = require('../middlewares/validar-rol');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { createInfo, getListInfo, deleteInfo } = require('../controllers/cInfo');

const router = Router();

router.use(validarJWT);

router.get('/', getListInfo)

router.use(validarRol);

router.post('/',
    [
        check('datos', 'Campo requerido (sólo letras, números y puntos)').not().isEmpty().isLength({ mi: 5, nax: 255 }).isAlphanumeric('es-ES', { ignore: ' .:),(' }),
        check('link', 'Ingrese un link valido').not().isEmpty().isURL(),
        check('fecha', 'Fecha no valida').not().isEmpty().isLength({ mi: 5, max: 25 }).isAlphanumeric('es-ES', { ignore: ' -:' }),
        validarCampos
    ],
    createInfo
);

router.delete('/:id', deleteInfo);

module.exports = router;