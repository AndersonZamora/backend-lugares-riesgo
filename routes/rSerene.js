const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getListAlerts } = require('../controllers/cSerene');

const router = Router();

router.use(validarJWT);

router.get('/risuto', getListAlerts)

module.exports = router;