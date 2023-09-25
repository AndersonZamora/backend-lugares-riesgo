const mysql = require('mysql2');

const cnn = async () => {
    try {

        const connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASS,
            database: process.env.DB,
        });

        return connection;

    } catch (error) {
        console.log(error);
        throw err;
    }
}

async function main() {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({ host: process.env.HOST, user: process.env.USER, password: process.env.PASS, database: process.env.DB });
    return { connection };
}

module.exports = {
    //dbConnection,
    cnn,
    main
}
