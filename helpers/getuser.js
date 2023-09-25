const jwt = require('jsonwebtoken');

const getuser = (token) => {

    const { role, uid } = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );

    return { role, uid }
}

module.exports = {
    getuser
}