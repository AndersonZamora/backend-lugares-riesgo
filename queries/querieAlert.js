const { modelAlert } = require("../models/modelAlert");

const querieAlert = (id = 0, ser = modelAlert) => {

    const registrarAlerta = `call Sp_Registrar_Alerta(${ser.idUser}, '${ser.fecha}', '${ser.longitud}', '${ser.latitud}')`;
    const listarAlertas = `call Sp_Obtener_AlertUsuario_All(${id})`;
    const actualizarAlerta = `call Sp_Actualizar_Alerta(${id},'${ser.estado}')`;

    return {
        registrarAlerta,
        listarAlertas,
        actualizarAlerta
    }
}

module.exports = {
    querieAlert
}