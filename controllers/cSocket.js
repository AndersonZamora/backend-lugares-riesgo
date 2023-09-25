const { cnn } = require('../database/config');
const { querieAlert } = require('../queries/querieAlert');

const citizenConectado = async (uid = 0, stado = false) => {

    try {

        const pool = await cnn();

        pool.query(`call Sp_Citizen_Conectado(${uid}, ${stado})`);

    } catch (error) {
        return "Error";
    }
}

const sereneConectado = async (uid = 0, stado = false) => {

    try {

        const pool = await cnn();

        pool.query(`call Sp_Serene_Conectado(${uid}, ${stado})`);

    } catch (error) {
        return "Error";
    }
}


const nuevaAlerta = async (model) => {

    try {

        const { registrarAlerta } = querieAlert(0, { ...model });

        const pool = cnn();

        (await pool).query(`${registrarAlerta}`, async (err, result) => {

            if (err) {
                return {
                    ok: false,
                    msg: 'Error 1, hable con el administrador'
                };
            }

            const { id } = result[0][0];

            console.log(id);

            if (id <= 0 || id == undefined) {
                return {
                    ok: false,
                    msg: 'Error al registrar 2, hable con el administrador'
                };
            }

            return {
                ok: true,
                uid: id
            };
        });
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            msg: 'catch error'
        }
    }
}

module.exports = {
    citizenConectado,
    sereneConectado,
    nuevaAlerta,
}