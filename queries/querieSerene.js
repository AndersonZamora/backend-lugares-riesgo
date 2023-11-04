const { modelSerene } = require("../models/modelSerene");

const querieSerene = (id = 0, cont = '', ser = modelSerene) => {

    const logSerene = `call Sp_Login_Serene('${ser.correo}')`
    const obtenerAlertas = `call Sp_Obtener_Alerts_Ser()`;
    const obtenerAlerta = `call Sp_Obtener_Alert(${id})`;

    return {
        logSerene,
        obtenerAlertas,
        obtenerAlerta
    }
}

module.exports = {
    querieSerene
}