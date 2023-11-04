const { request, response } = require('express');
const { querieSerene } = require('../queries/querieSerene');
const { querieAlert } = require('../queries/querieAlert');

const getListAlerts = async (req = request, res = response) => {
    try {

        const { obtenerAlertas } = querieSerene();

        req.getConnection((err, conn) => {
            if (err) {

                return res.status(404).json({
                    ok: false,
                    er: false,
                    erros: {
                        msg: 'Error 1, hable con el administrador'
                    }
                });
            }

            conn.query(obtenerAlertas, async (error, alerts) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 1, hable con el administrador'
                        }
                    });
                }

                res.json({
                    ok: true,
                    alertas: alerts[0]
                });

            })
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            er: false,
            erros: {
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

const updateAlerta = async (req = request, res = response) => {
    try {

        const { id, estado } = req.body;

        const { actualizarAlerta } = querieAlert(id, { estado });

        req.getConnection((err, conn) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    er: false,
                    erros: {
                        msg: 'Error 1, hable con el administrador'
                    }
                });
            }

            conn.query(actualizarAlerta, async (error) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                return res.status(200).json({
                    ok: true
                });
            })
        })

    } catch (error) {
        res.status(404).json({
            ok: false,
            er: false,
            erros: {
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

module.exports = {
    getListAlerts,
    updateAlerta
}