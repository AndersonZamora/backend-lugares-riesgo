const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getListAlerts, updateAlerta } = require('../controllers/cSerene');

const router = Router();

router.use(validarJWT);

router.get('/risuto', getListAlerts);

router.post('/risuto/up', updateAlerta);

module.exports = router;