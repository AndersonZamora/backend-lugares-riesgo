const { response, request } = require('express');
const bcryptj = require('bcryptjs');
const { cnn } = require('../database/config');
const { querieCitizen } = require('../queries/querieCitizen');
const { generarJWT } = require('../helpers/jwt');
const { querieHero } = require('../queries/querieHero');
const { getuser } = require('../helpers/getuser');
const { querieSerene } = require('../queries/querieSerene');

const registrarCitizen = async (req, res = response) => {

    try {

        const { nombres, apellidos, celular, correo, contrasenia } = req.body;

        const salt = bcryptj.genSaltSync();
        const newContra = bcryptj.hashSync(contrasenia, salt);

        const { crearCitizen } = querieCitizen({ nombres, apellidos, celular, correo, contrasenia: newContra });

        const pool = cnn();

        (await pool).query(`${crearCitizen}`, (error, result) => {

            if (error) {
                console.log(error)
                return res.status(404).json({
                    ok: false,
                    msg: `Error 1, hable con el administrador ${error.code}`
                });
            }

            const { id } = result[0][0];

            if (id <= 0 || id == undefined) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error al registrar, hable con el administrador'
                });
            }

            return res.json({
                ok: true,
                uid: id
            });
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const loginCitizen = async (req, res = response) => {
    try {

        const { email, password } = req.body;

        const pool = cnn();

        const { loginCitizen } = querieCitizen({ correo: email });

        (await pool).query(loginCitizen, async (err, rows) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }

            if (rows[0][0] === undefined || rows[0][0].length <= 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Credenciales incorrectas'
                });
            }

            const datos = rows[0][0];

            const { Id, nombres, apellidos, contrasenia, rol } = datos;

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
                token,
                rol
            })

        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
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
                msg: 'Sin privilegios'
            });
        }

        const salt = bcryptj.genSaltSync();
        const newContra = bcryptj.hashSync(contrasenia, salt);

        const { crearHero } = querieHero({ nombres, apellidos, celular, correo, contrasenia: newContra });

        const pool = cnn();

        (await pool).query(`${crearHero}`, (err, result) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error, hable con el administrador'
                });
            }

            const { id } = result[0][0];

            if (id <= 0 || id == undefined) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error al registrar, hable con el administrador'
                });
            }

            return res.json({
                ok: true,
                uid: id
            });
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const loginHero = async (req, res = response) => {
    try {

        const { email, password } = req.body;

        const pool = cnn();

        const { loginHero } = querieHero({ correo: email });

        (await pool).query(loginHero, async (err, rows) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }

            if (rows[0][0] === undefined || rows[0][0].length <= 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Credenciales incorrectas'
                });
            }

            const datos = rows[0][0];

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

        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const loginSerene = async (req, res = response) => {
    try {

        const { email, password } = req.body;

        const pool = cnn();

        const { logSerene } = querieSerene(0, '', { correo: email });

        (await pool).query(logSerene, async (err, rows) => {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }

            if (rows[0][0] === undefined || rows[0][0].length <= 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Credenciales incorrectas'
                });
            }

            const datos = rows[0][0];

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