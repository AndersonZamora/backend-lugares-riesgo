const { modelSerene } = require("../models/modelSerene");

const querieAdmin = (id = 0, ser = modelSerene) => {

    const listaUsuarios = `call Sp_Lista_Citizen()`;
    const eliminarUsuario = `call Sp_Eliminar_Citizen(${id})`;
    const eliminarUsuarioAlerta = `call Sp_Eliminar_User_Alert(${id})`;
    const listarSerenos = `call Sp_Lista_Serene()`;
    const registrarSereno = `call Sp_Registrar_Serene('${ser.nombres}', '${ser.apellidos}', '${ser.celular}', '${ser.correo}', '${ser.contrasenia}')`;
    const eliminarSereno = `call Sp_Eliminar_Serene(${id})`;
    const obtenerSereno = `call Sp_Obtener_Citizen(${id})`;

    return {
        listaUsuarios,
        eliminarUsuario,
        listarSerenos,
        registrarSereno,
        eliminarSereno,
        obtenerSereno,
        eliminarUsuarioAlerta,
    }
}

module.exports = {
    querieAdmin
}