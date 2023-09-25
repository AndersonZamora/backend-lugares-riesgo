const { request, response } = require('express');
const { cnn } = require('../database/config');
const { querieSerene } = require('../queries/querieSerene');

const getListAlerts = async (req = request, res = response) => {
    try {

        const pool = cnn();

        const { obtenerAlertas } = querieSerene();

        (await pool).query(`${obtenerAlertas}`, (err, result) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: 'Error, hable con el administrador'
                });
                return;
            }

            res.json({
                ok: true,
                alertas: result[0]
            });

        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

module.exports = {
    getListAlerts
}