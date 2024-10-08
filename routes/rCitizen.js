const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { addAlertCitizen, listAlertCitizen } = require('../controllers/cCitizen');


const router = Router();

router.use(validarJWT);

router.use('/suru-tame',
    [
        check('fecha', 'Este campo es obligatorio').not().isEmpty(),
        check('longitud', 'Campo requerido (sólo números, puntos, comas y guiones)').not().isEmpty().isDecimal(),
        check('latitud', 'Campo requerido (sólo números, puntos, comas y guiones)').not().isEmpty().isDecimal(),
        validarCampos
    ],
    addAlertCitizen
)

router.get('/risuto-suru', listAlertCitizen);

module.exports = router;
