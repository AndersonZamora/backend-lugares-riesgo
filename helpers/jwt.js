
const jwt = require('jsonwebtoken');

const generarJWT = (uid, name, role) => {

    const JWT = process.env.SECRET_JWT_SEED;

    return new Promise((resolve, reject) => {

        const payload = { uid, name, role };

        jwt.sign(payload, JWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                reject('No se puede generar el token');
            } else {
                resolve(token);

            }
        });
    });
};

const comprobarJWT = (token = '') => {
    try {
        const { uid, role } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        return [true, uid, role];

    } catch (error) {
        return [true, null, null];
    }
}

module.exports = {
    generarJWT,
    comprobarJWT,
};