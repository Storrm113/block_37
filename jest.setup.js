const pool = require("./db");

afterAll(async () => {
    await pool.end(); // Close database connection after tests
});
