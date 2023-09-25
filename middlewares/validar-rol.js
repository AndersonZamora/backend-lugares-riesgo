const { getuser } = require("../helpers/getuser");

const validarRol = (req, res = response, next) => {

    try {

        const { role } = getuser(req.header('x-token'));

        if (role != process.env.ROLE1) {
            throw error;
        }

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Sin privilegios'
        });
    }

    next();
}

module.exports = {
    validarRol
};
