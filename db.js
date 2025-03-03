const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

if (process.env.NODE_ENV !== 'test') {
    pool.connect()
        .then(() => console.log("🟢 PostgreSQL Connected Successfully"))
        .catch(err => console.error("🔴 Database Connection Error:", err.stack));
}

module.exports = pool;
