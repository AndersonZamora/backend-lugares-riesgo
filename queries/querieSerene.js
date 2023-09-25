const { modelSerene } = require("../models/modelSerene");

const querieSerene = (id = 0, cont = '', ser = modelSerene) => {

    const actuContraSerene = `call Sp_Contra_Serene(${id},'${cont}')`;
    const actualizarSerene = `call Sp_Actualizar_Serene(${id},'${ser.nombres}', '${ser.apellidos}', '${ser.celular}')`;
    const logSerene = `call Sp_Login_Serene('${ser.correo}')`
    const obtenerAlertas = `call Sp_Obtener_Alerts_Ser()`

    return {
        actuContraSerene,
        actualizarSerene,
        logSerene,
        obtenerAlertas,
    }
}

module.exports = {
    querieSerene
}