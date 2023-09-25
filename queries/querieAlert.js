const { modelAlert } = require("../models/modelAlert");

const querieAlert = (id = 0, ser = modelAlert) => {

    const registrarAlerta = `call Sp_Registrar_Alerta(${ser.idUser}, '${ser.fecha}', '${ser.longitud}', '${ser.latitud}')`;
    const listarAlertas = `call Sp_Obtener_AlertUsuario_All(${id})`;

    return {
        registrarAlerta,
        listarAlertas
    }
}

module.exports = {
    querieAlert
}