const { modelCitizen } = require('../models/modelCitizen');

const querieCitizen = (model = modelCitizen, id) => {

    const { nombres, apellidos, celular, correo, contrasenia, dni } = model;

    const crearCitizen = `call Sp_Registrar_Citizen('${nombres}', '${apellidos}', '${celular}', '${correo}', '${contrasenia}','${dni}')`;
    const loginCitizen = `call Sp_Login_Citizen('${correo}')`

    return {
        crearCitizen,
        loginCitizen,
    }
}

module.exports = {
    querieCitizen
}