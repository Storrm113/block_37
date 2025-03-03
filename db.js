const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10, // Maximum number of connections
    idleTimeoutMillis: 30000, // Close idle connections after 30s
    connectionTimeoutMillis: 2000, // Timeout if unable to connect
});

// Test Database Connection
pool.connect()
    .then(() => console.log("🟢 PostgreSQL Connected Successfully"))
    .catch(err => console.error("🔴 Database Connection Error:", err.stack));

module.exports = pool;