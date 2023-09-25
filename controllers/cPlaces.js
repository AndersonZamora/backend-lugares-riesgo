const { request, response } = require('express');
const { cnn } = require('../database/config');
const { queriePlaces } = require('../queries/queriePlaces');
const { getuser } = require('../helpers/getuser');

const createPlaces = async (req = request, res = response) => {

    try {

        const { crearLugar } = queriePlaces({ ...req.body });

        const { role } = getuser(req.header('x-token'));

        if (role != process.env.ROLE1) {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }
        }

        const pool = cnn();

        (await pool).query(`${crearLugar}`, (err, result) => {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 2, hable con el administrador'
                });
            }

            const { id } = result[0][0];

            if (id <= 0 || id == undefined) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error al registrar 3, hable con el administrador'
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

const getListPlaces = async (req = request, res = response) => {
    try {

        const pool = cnn();

        const { listarLugares } = queriePlaces();

        (await pool).query(`${listarLugares}`, (err, result) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: 'Error, hable con el administrador'
                });
                return;
            }

            res.json({
                ok: true,
                lugares: result[0]
            });

        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const updatePlaces = async (req = response, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al actualizar, Hable con el administrador'
            });
        }

        const { actualizarLugar } = queriePlaces({ ...req.body }, id);

        const pool = cnn();

        (await pool).query(`${actualizarLugar}`, (err, result) => {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 2, hable con el administrador'
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
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const deletePlaces = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al actualizar, Hable con el administrador'
            });
        }

        const { role } = getuser(req.header('x-token'));

        if (role != process.env.ROLE1) {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                });
            }
        }

        const { eliminarLugar } = queriePlaces({}, id);

        const pool = cnn();

        (await pool).query(`${eliminarLugar}`, (err, result) => {

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
    createPlaces,
    getListPlaces,
    updatePlaces,
    deletePlaces,
}