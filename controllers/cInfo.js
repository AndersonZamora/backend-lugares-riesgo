const { request, response } = require('express');
const { cnn } = require('../database/config');
const { querieInformation } = require('../queries/querieInformation');

const createInfo = async (req = request, res = response) => {

    try {

        const { crearInfo } = querieInformation({ ...req.body });

        const pool = cnn();

        (await pool).query(`${crearInfo}`, (err, result) => {

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

const getListInfo = async (req = request, res = response) => {
    try {

        const pool = cnn();

        const { listarInfo } = querieInformation();

        (await pool).query(`${listarInfo}`, (err, result) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: 'Error, hable con el administrador'
                });
                return;
            }

            res.json({
                ok: true,
                infomacion: result[0]
            });

        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const deleteInfo = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al actualizar, Hable con el administrador'
            });
        }

        const { eliminarInfo } = querieInformation({}, id);

        const pool = cnn();

        (await pool).query(`${eliminarInfo}`, (err, result) => {

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
    createInfo,
    getListInfo,
    deleteInfo,
}