const { response, request } = require('express');
const bcryptj = require('bcryptjs');
const { cnn } = require('../database/config');
const { querieAdmin } = require('../queries/querieAdmin');

const getListUsers = async (req, res = response) => {
    try {

        const pool = cnn();

        const { listaUsuarios } = querieAdmin();

        (await pool).query(`${listaUsuarios}`, (err, result) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: 'Error 2, hable con el administrador'
                });
                return;
            }

            res.json({
                ok: true,
                usuarios: result[0]
            });

        });


    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const deleteUser = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al eliminar, Hable con el administrador'
            });
        }

        const { eliminarUsuario } = querieAdmin(id);

        const pool = cnn();

        (await pool).query(`${eliminarUsuario}`, (err, result) => {

            if (err) {
                return res.status({
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
            msg: 'Error catch, hable con el administrador'
        });
    }
}

const getListSerene = async (req, res = response) => {
    try {

        const pool = cnn();

        const { listarSerenos } = querieAdmin();

        (await pool).query(`${listarSerenos}`, (err, result) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: 'Error 2, hable con el administrador'
                });
                return;
            }

            res.json({
                ok: true,
                serenos: result[0]
            });

        });


    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const createSerene = async (req = request, res = response) => {

    try {

        const { contrasenia, correo } = { ...req.body };

        const salt = bcryptj.genSaltSync();
        const newContra = bcryptj.hashSync(contrasenia, salt);

        const { registrarSereno, valSerene } = querieAdmin(0, { ...req.body, contrasenia: newContra }, correo);

        const pool = cnn();

        (await pool).query(`${valSerene}`, async (err, result) => {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error, hable con el administrador'
                });
            }

            const { vmail } = result[0][0];
            const { vcelular } = result[1][0];


            if (vmail == 1 || vcelular == 1) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Error al registrar',
                    vmail: (vmail) ? 'Correo ya registrado' : '',
                    vcelular: (vcelular) ? 'Celular ya registrado' : ''
                });
            }

            (await pool).query(`${registrarSereno}`, (err, resu) => {
                if (err) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error, hable con el administrador',
                        vmail: '',
                        vcelular: ''
                    });
                }

                const { id } = resu[0][0];

                if (id <= 0 || id == undefined) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Error al registrar, hable con el administrador',
                        vmail: '',
                        vcelular: ''
                    });
                }

                return res.status(200).json({
                    ok: true,
                    uid: id
                });
            })
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, Hable con el administrador'
        });
    }
}

const getSerene = async (req = request, res = response) => {
    try {
        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario, Hable con el administrador'
            });
        }

        const pool = cnn();
        const { obtenerSereno } = querieAdmin(id);

        (await pool).query(`${obtenerSereno}`, (err, result) => {

            if (err) {
                return res.status({
                    ok: false,
                    msg: 'Error 2, hable con el administrador'
                });
            }

            return res.json({
                ok: true,
                sereno: result[0][0]
            });
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Error catch, hable con el administrador'
        });
    }
}

const deleteSerene = async (req = request, res = response) => {
    try {

        const id = req.params.id;

        if (id <= 0) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al eliminar, Hable con el administrador'
            });
        }

        const { eliminarSereno } = querieAdmin(id);

        const pool = cnn();

        (await pool).query(`${eliminarSereno}`, (err, result) => {

            if (err) {
                return res.status({
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
            msg: 'Error catch, hable con el administrador'
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
}