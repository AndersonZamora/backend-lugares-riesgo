async function main() {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({ host: process.env.HOST, user: process.env.USER, password: process.env.PASS, database: process.env.DB });
    return { connection };
}

module.exports = {
    main
}
