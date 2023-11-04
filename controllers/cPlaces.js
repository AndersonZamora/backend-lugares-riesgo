const { request, response } = require('express');
const { queriePlaces } = require('../queries/queriePlaces');

const createPlaces = async (req = request, res = response) => {

    try {

        const { crearLugar } = queriePlaces({ ...req.body });

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

            conn.query(crearLugar, async (error, places) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                const { id } = places[0][0];

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

const getListPlaces = async (req = request, res = response) => {
    try {

        const { listarLugares } = queriePlaces();

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

            conn.query(listarLugares, async (error, places) => {
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
                    lugares: places[0]
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

const deletePlaces = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                er: false,
                erros: {
                    msg: 'Error al actualizar, Hable con el administrador'
                }
            });
        }

        const { eliminarLugar } = queriePlaces({}, id);

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

            conn.query(eliminarLugar, async (error, places) => {
                if (error) {

                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                const { affectedRows } = places;

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
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

module.exports = {
    createPlaces,
    getListPlaces,
    deletePlaces,
}