const { response } = require('express');
const { querieAlert } = require('../queries/querieAlert');

const addAlertCitizen = async (req, res = response) => {
    try {

        const regist = req.body;
        const { uid } = req;
        const { registrarAlerta } = querieAlert(0, { idUser: uid, ...regist });

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

            conn.query(registrarAlerta, async (error, alerts) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                const { id } = alerts[0][0];

                if (id <= 0 || id == undefined) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error al registrar, hable con el administrador',
                        }
                    });
                }

                return res.status(200).json({
                    ok: true,
                    uid: id
                });
            })
        })

    } catch (error) {
        res.status(404).json({
            ok: false,
            erros: {
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

const listAlertCitizen = async (req, res = response) => {
    try {

        const { uid } = req;

        const { listarAlertas } = querieAlert(uid);

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

            conn.query(listarAlertas, async (error, alerts) => {
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

module.exports = {
    addAlertCitizen,
    listAlertCitizen,
}
