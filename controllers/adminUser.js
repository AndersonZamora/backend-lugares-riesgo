const { response, request } = require('express');
const bcryptj = require('bcryptjs');
const { querieAdmin } = require('../queries/querieAdmin');
const { querieAlert } = require('../queries/querieAlert');

const getListUsers = async (req, res = response) => {
    try {

        const { listaUsuarios } = querieAdmin();

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

            conn.query(listaUsuarios, async (error, citizen) => {
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
                    usuarios: citizen[0]
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

const deleteUser = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                er: false,
                erros: {
                    msg: 'Error al eliminar, Hable con el administrador'
                }
            });
        }

        const { eliminarUsuario } = querieAdmin(id);

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

            conn.query(eliminarUsuario, async (error, citizen) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 1, hable con el administrador'
                        }
                    });
                }

                const { affectedRows } = citizen;

                if (affectedRows <= 0) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Ocurrio al eliminar, Hable con el administrador'
                        }
                    });
                }

                res.json({
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

const deleteAlertUser = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                er: false,
                erros: {
                    msg: 'Error al eliminar, Hable con el administrador'
                }
            });
        }

        const { eliminarUsuarioAlerta } = querieAdmin(id);

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

            conn.query(eliminarUsuarioAlerta, async (error, citizen) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 1, hable con el administrador'
                        }
                    });
                }

                const { affectedRows } = citizen;

                if (affectedRows <= 0) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Ocurrio al eliminar, Hable con el administrador'
                        }
                    });
                }

                res.json({
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

const getListSerene = async (req, res = response) => {
    try {

        const { listarSerenos } = querieAdmin();

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

            conn.query(listarSerenos, async (error, serene) => {
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
                    serenos: serene[0]
                });

            })
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            erros: {
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

const createSerene = async (req = request, res = response) => {

    try {

        const { contrasenia, correo } = { ...req.body };

        const salt = bcryptj.genSaltSync();

        const newContra = bcryptj.hashSync(contrasenia, salt);

        const { registrarSereno } = querieAdmin(0, { ...req.body, contrasenia: newContra }, correo);

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

            conn.query(registrarSereno, async (error, serene) => {
                if (error) {
                    const { sqlMessage } = error;
                    const email = sqlMessage.includes('correo') ? 'Correo ya en uso' : '';
                    const cel = sqlMessage.includes('celular') ? 'Celular ya registrado' : '';

                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            email,
                            cel,
                            msg: ''
                        }
                    });
                }

                const { id } = serene[0][0];

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

const getSerene = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                er: false,
                erros: {
                    msg: 'No existe el usuario, Hable con el administrador'
                }
            });
        }

        const { obtenerSereno } = querieAdmin(id);

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

            conn.query(obtenerSereno, async (error, serene) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                return res.json({
                    ok: true,
                    sereno: serene[0][0]
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

const deleteSerene = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                er: false,
                erros: {
                    msg: 'Error al eliminar, Hable con el administrador'
                }
            });
        }

        const { eliminarSereno } = querieAdmin(id);

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

            conn.query(eliminarSereno, async (error, serene) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                const { affectedRows } = serene;

                if (affectedRows <= 0) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Ocurrio al eliminar, Hable con el administrador'
                    });
                }

                return res.json({
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

const listAlertCitizenAdmin = async (req, res = response) => {
    try {

        const id = req.params.id;

        const { listarAlertas } = querieAlert(id);

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
    createSerene,
    deleteUser,
    deleteSerene,
    getListUsers,
    getListSerene,
    getSerene,
    listAlertCitizenAdmin,
    deleteAlertUser
}