const { modelHero } = require('../models/modelHero');

const querieHero = (model = modelHero, id = 0) => {

    const { nombres, apellidos, celular, correo, contrasenia } = model;

    const crearHero = `call Sp_Registrar_Central('${nombres}', '${apellidos}', '${celular}', '${correo}', '${contrasenia}')`;
    const loginHero = `call Sp_Login_Central('${correo}')`

    return {
        crearHero,
        loginHero,
    }
}

module.exports = {
    querieHero
}