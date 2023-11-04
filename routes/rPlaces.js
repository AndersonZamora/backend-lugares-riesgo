const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { createPlaces, getListPlaces, deletePlaces } = require('../controllers/cPlaces');
const { validarRol } = require('../middlewares/validar-rol');

const router = Router();

router.use(validarJWT);

router.get('/', getListPlaces)

router.use(validarRol);

router.post('/',
    [
        check('detalle', 'Campo requerido (sólo letras y números)').not().isEmpty().isLength({ mi: 1 }).isAlphanumeric('es-ES', { ignore: ' ' }),
        check('direccion', 'Campo requerido (sólo letras, números, puntos y guion bajo)').not().isEmpty().isLength({ mi: 1 }).isAlphanumeric('es-ES', { ignore: ' .-_' }),
        check('barrio', 'Campo requerido (sólo letras, números)').not().isEmpty().isLength({ mi: 1 }).isAlphanumeric('es-ES', { ignore: ' ' }),
        check('longitud', 'Campo requerido (sólo números, puntos, comas y guiones)').not().isEmpty().isDecimal(),
        check('latitud', 'Campo requerido (sólo números, puntos, comas y guiones)').not().isEmpty().isDecimal(),
        check('nivel', 'Campo requerido (sólo letras, números)').not().isEmpty().isLength({ min: 1, max: 25 }).isAlphanumeric('es-ES', { ignore: ' ' }),
        validarCampos
    ],
    createPlaces
);


router.delete('/:id', deletePlaces);

module.exports = router;