const { request, response } = require('express');
const { querieInformation } = require('../queries/querieInformation');

const createInfo = async (req = request, res = response) => {

    try {

        const { crearInfo } = querieInformation({ ...req.body });

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

            conn.query(crearInfo, async (error, information) => {
                if (error) {

                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                const { id } = information[0][0];

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
            er: false,
            erros: {
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

const getListInfo = async (req = request, res = response) => {
    try {

        const { listarInfo } = querieInformation();

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

            conn.query(listarInfo, async (error, information) => {
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
                    infomacion: information[0]
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

const deleteInfo = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        const { eliminarInfo } = querieInformation({}, id);

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                er: false,
                erros: {
                    msg: 'Error al eliminar, Hable con el administrador'
                }
            });
        }

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

            conn.query(eliminarInfo, async (error, tipos) => {
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
    createInfo,
    getListInfo,
    deleteInfo,
}