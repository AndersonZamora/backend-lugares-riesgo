const { response, request } = require('express');
const { querieTipos } = require('../queries/querieTipos');

const getListTipos = async (req, res = response) => {
    try {

        const { listarTipo } = querieTipos();

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

            conn.query(listarTipo, async (error, tipos) => {
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
                    tipos: tipos[0]
                });

            })
        });

    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            er: false,
            erros: {
                msg: 'Error catch, hable con el administrador'
            }
        });
    }
}

const createTipo = async (req = request, res = response) => {
    try {

        const { tipo, numero } = { ...req.body };

        const { crearTipo } = querieTipos({ tipo: tipo.toUpperCase(), numero }, 0);

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

            conn.query(crearTipo, async (error, tipos) => {
                if (error) {
                    const { sqlMessage } = error;
                    const tip = sqlMessage.includes('tipos.tipo') ? 'Servicio ya registrado' : '';
                    const cel = sqlMessage.includes('numero') ? 'Celular ya registrado' : '';

                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            tip,
                            cel,
                            msg: ''
                        }
                    });
                }

                const { id } = tipos[0][0];

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
                    uid: id,
                    tipo: tipo.toUpperCase()
                });
            })
        })

    } catch (error) {
        res.status(404).json({
            ok: false,
            erros: {
                msg: 'Error catch, hable con el administrador'
            }
        });
    }
}

const deleteTipo = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                erros: {
                    msg: 'Error al actualizar, Hable con el administrador'
                }
            });
        }

        const { eliminarTipo } = querieTipos({}, id);

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

            conn.query(eliminarTipo, async (error, tipos) => {
                if (error) {

                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }
                const { affectedRows } = tipos;

                if (affectedRows <= 0) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Ocurrio al eliminar, Hable con el administrador'
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
                msg: 'Error catch, hable con el administrador'
            }
        });
    }
}

module.exports = {
    getListTipos,
    createTipo,
    deleteTipo,
}