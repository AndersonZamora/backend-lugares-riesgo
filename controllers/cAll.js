const { response, request } = require('express');
const bcryptj = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { querieCitizen } = require('../queries/querieCitizen');
const { querieHero } = require('../queries/querieHero');
const { querieSerene } = require('../queries/querieSerene');
const { getuser } = require('../helpers/getuser');

const registrarCitizen = async (req = request, res = response) => {

    try {

        const { nombres, apellidos, celular, correo, contrasenia, dni } = req.body;

        const salt = bcryptj.genSaltSync();
        const newContra = bcryptj.hashSync(contrasenia, salt);

        const { crearCitizen } = querieCitizen({ nombres, apellidos, celular, correo, contrasenia: newContra, dni });

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
            conn.query(crearCitizen, async (error, citizen) => {
                if (error) {
                    const { sqlMessage } = error;
                    const email = sqlMessage.includes('correo') ? 'Correo ya en uso' : '';
                    const cel = sqlMessage.includes('celular') ? 'Celular ya registrado' : '';
                    const dn = sqlMessage.includes('dni') ? 'DNI ya registrado' : '';

                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            email,
                            cel,
                            dn,
                            msg: ''
                        }
                    });
                }

                const { id } = citizen[0][0];

                if (id <= 0 || id == undefined) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error al registrar, hable con el administrador'
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
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

const loginCitizen = async (req, res = response) => {
    try {

        const { email, password } = req.body;

        const { loginCitizen } = querieCitizen({ correo: email });

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

            conn.query(loginCitizen, async (err, citizen) => {
                if (err) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                if (citizen[0][0] === undefined || citizen[0][0].length <= 0) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Credenciales incorrectas'
                        }
                    });
                }

                const datos = citizen[0][0];

                const { Id, nombres, apellidos, contrasenia, rol } = datos;

                const valid = bcryptj.compareSync(password, contrasenia);

                if (!valid) {
                    return res.status(400).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Credenciales incorrectas'
                        }
                    });
                }

                const token = await generarJWT(Id, `${nombres} ${apellidos}`, rol);

                return res.json({
                    ok: true,
                    uid: Id,
                    name: `${nombres} ${apellidos}`,
                    token,
                    rol
                });
            });
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

const registrarHero = async (req, res = response) => {

    try {

        const { nombres, apellidos, celular, correo, contrasenia, state } = req.body;

        const secr = process.env.SECRET_CRE;

        if (secr !== state) {
            return res.status(404).json({
                ok: false,
                er: false,
                erros: {
                    msg: 'Sin privilegios'
                }
            });
        }

        const salt = bcryptj.genSaltSync();
        const newContra = bcryptj.hashSync(contrasenia, salt);

        const { crearHero } = querieHero({ nombres, apellidos, celular, correo, contrasenia: newContra });

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

            conn.query(crearHero, async (error) => {
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
                msg: 'Error catch, Hable con el administrador'
            }
        });
    }
}

const loginHero = async (req, res = response) => {

    try {

        const { email, password } = req.body;

        const { loginHero } = querieHero({ correo: email });

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

            conn.query(loginHero, async (err, central) => {
                if (err) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Error 2, hable con el administrador'
                        }
                    });
                }

                if (central[0][0] === undefined || central[0][0].length <= 0) {
                    return res.status(404).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Credenciales incorrectas'
                        }
                    });
                }

                const datos = central[0][0];

                const { Id, nombres, apellidos, celular, contrasenia, rol } = datos;

                const valid = bcryptj.compareSync(password, contrasenia);

                if (!valid) {
                    return res.status(400).json({
                        ok: false,
                        er: false,
                        erros: {
                            msg: 'Credenciales incorrectas'
                        }
                    });
                }

                const token = await generarJWT(Id, `${nombres} ${apellidos}`, rol);

                return res.json({
                    ok: true,
                    uid: Id,
                    name: `${nombres} ${apellidos}`,
                    celular,
                    token,
                    rol,
                })

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

const loginSerene = async (req, res = response) => {

    try {

        const { email, password } = req.body;

        const { logSerene } = querieSerene(0, '', { correo: email });

        req.getConnection((err, conn) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }

            conn.query(logSerene, async (error, serene) => {
                if (error) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error 2, hable con el administrador'
                    });
                }

                if (serene[0][0] === undefined || serene[0][0].length <= 0) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Credenciales incorrectas'
                    });
                }

                const datos = serene[0][0];

                const { Id, nombres, apellidos, celular, contrasenia, rol } = datos;

                const valid = bcryptj.compareSync(password, contrasenia);

                if (!valid) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Credenciales incorrectas'
                    });
                }

                const token = await generarJWT(Id, `${nombres} ${apellidos}`, rol);

                return res.json({
                    ok: true,
                    uid: Id,
                    name: `${nombres} ${apellidos}`,
                    celular,
                    token,
                    rol,
                })
            })
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const revalidarToken = async (req = request, res = response) => {

    try {
        const { uid, name } = req;

        const { role } = getuser(req.header('x-token'));

        const token = await generarJWT(uid, name, role);

        return res.json({
            ok: true,
            uid,
            name,
            token,
            role
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

module.exports = {
    registrarCitizen,
    loginCitizen,
    registrarHero,
    loginHero,
    loginSerene,
    revalidarToken
}