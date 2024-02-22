const mysql2 = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 1,
    enableKeepAlive: true,
});

module.exports = pool

