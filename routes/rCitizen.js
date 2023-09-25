const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { upContraCitizen, addAlertCitizen, listAlertCitizen } = require('../controllers/cCitizen');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT);

router.post('/suru-koshin',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        check('newPas', 'Error, revise sus credenciales').not().isEmpty().isLength({ min: 4, max: 15 }),
        validarCampos
    ],
    upContraCitizen
);

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
