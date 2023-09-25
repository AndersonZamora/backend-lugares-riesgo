const { modelCitizen } = require('../models/modelCitizen');

const querieCitizen = (model = modelCitizen, id) => {

    const { nombres, apellidos, celular, correo, contrasenia } = model;

    const crearCitizen = `call Sp_Registrar_Citizen('${nombres}', '${apellidos}', '${celular}', '${correo}', '${contrasenia}')`;
    const actualizarCitizen = `call Sp_Actualizar_Citzen(${id}, '${nombres}', '${apellidos}', '${celular}')`;
    const loginCitizen = `call Sp_Login_Citizen('${correo}')`

    return {
        crearCitizen,
        actualizarCitizen,
        loginCitizen,
    }
}

module.exports = {
    querieCitizen
}