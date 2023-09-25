const { response } = require('express');
const bcryptj = require('bcryptjs');
const { cnn } = require('../database/config');
const { querieHero } = require('../queries/querieHero');
const { generarJWT } = require('../helpers/jwt');

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

            if (rows[0][0].length <= 0) {
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

module.exports = {
    loginHero,
    registrarHero
}
