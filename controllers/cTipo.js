const { response, request } = require('express');
const { cnn } = require('../database/config');
const { querieTipos } = require('../queries/querieTipos');

const getListTipos = async (req, res = response) => {
    try {

        const pool = cnn();

        const { listarTipo } = querieTipos();

        (await pool).query(`${listarTipo}`, (err, result) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: 'Error, hable con el administrador'
                });
                return;
            }

            res.json({
                ok: true,
                tipos: result[0]
            });

        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error, hable con el administrador'
        });
    }
}

const createTipo = async (req = request, res = response) => {
    try {

        const { tipo, numero } = { ...req.body };

        const { crearTipo, valTipo } = querieTipos({ tipo: tipo.toUpperCase(), numero }, 0);

        const pool = cnn();

        (await pool).query(`${valTipo}`, async (err, result) => {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error q1, hable con el administrador',
                    vtipo: '',
                    vnumero: ''
                });
            }

            const { vtipo } = result[0][0];
            const { vnumero } = result[1][0];

            if (vtipo == 1 || vnumero == 1) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error al registrar',
                    vtipo: (vtipo) ? '- Categoría ya registrado' : '',
                    vnumero: (vnumero) ? '- Número ya registrado' : ''
                });
            }

            (await pool).query(`${crearTipo}`, (err, resu) => {
                if (err) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error q2, hable con el administrador',
                        vtipo: '',
                        vnumero: ''
                    });
                }

                const { id } = resu[0][0];

                if (id <= 0 || id == undefined) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error al registrar, hable con el administrador',
                        vtipo: '',
                        vnumero: ''
                    });
                }

                return res.status(200).json({
                    ok: true,
                    succ: {
                        Id: id,
                        tipo: tipo.toUpperCase(),
                        numero
                    }
                });
            })
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error cas, hable con el administrador'
        });
    }
}

const deleteTipo = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al actualizar, Hable con el administrador'
            });
        }

        const { eliminarTipo } = querieTipos({}, id);

        const pool = cnn();

        (await pool).query(`${eliminarTipo}`, (err, result) => {

            if (err) {
                return res.status({
                    ok: false,
                    msg: 'Error, hable con el administrador'
                });
            }

            const { affectedRows } = result;

            if (affectedRows <= 0) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ocurrio al eliminar, Hable con el administrador'
                });
            }

            return res.json({
                ok: true
            });
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error, hable con el administrador'
        });
    }
}

module.exports = {
    getListTipos,
    createTipo,
    deleteTipo,
}