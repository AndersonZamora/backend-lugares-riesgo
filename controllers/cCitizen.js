const { response } = require('express');
const bcryptj = require('bcryptjs');
const { cnn } = require('../database/config');
const { querieCitizen } = require('../queries/querieCitizen');
const { generarJWT } = require('../helpers/jwt');
const { querieAlert } = require('../queries/querieAlert');

const upContraCitizen = async (req, res = response) => {
    try {

        const { email, password, newPas } = req.body;

        const pool = cnn();

        const { loginCitizen } = querieCitizen({ correo: email });

        (await pool).query(loginCitizen, async (err, rows) => {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }

            if (rows[0][0].length <= 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Credenciales incorrectas 1'
                });
            }

            const datos = rows[0][0];

            const { Id, nombres, apellidos, celular, contrasenia, rol } = datos;

            const valid = bcryptj.compareSync(password, contrasenia);

            if (!valid) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Credenciales incorrectas 2'
                });
            }

            if (bcryptj.compareSync(newPas, contrasenia)) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ingrese una contraseña diferente a la actual'
                });
            }

            const salt = bcryptj.genSaltSync();
            const newContra = bcryptj.hashSync(newPas, salt);

            (await pool).query(`call Sp_Contra_Citzen(${Id}, '${newContra}');`, async (erros, result) => {

                if (erros) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error 4, hable con el administrador'
                    });
                }

                const { affectedRows } = result;

                if (affectedRows <= 0) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Ocurrio al actualizar, Hable con el administrador'
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
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const addAlertCitizen = async (req, res = response) => {
    try {

        const regist = req.body;
        const { uid } = req;
        const { registrarAlerta } = querieAlert(0, { idUser: uid, ...regist });

        const pool = cnn();

        (await pool).query(`${registrarAlerta}`, (err, result) => {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }

            const { id } = result[0][0];

            if (id <= 0 || id == undefined) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error al registrar 2, hable con el administrador'
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

const listAlertCitizen = async (req, res = response) => {
    try {

        const pool = cnn();
        const { uid } = req;

        const { listarAlertas } = querieAlert(uid);

        (await pool).query(`${listarAlertas}`, (err, result) => {
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
    upContraCitizen,
    addAlertCitizen,
    listAlertCitizen,
}
