// userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const dotenv = require('dotenv')

dotenv.config()

const router = express.Router();
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!username || !password) {
        return res.json({ error: 'Empty Body' });
    }

    try {
        const userRegistration = await pool.query('INSERT INTO users (username, password) values ($1, $2);', [username, hashedPassword]);
        res.json(userRegistration.rows);
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    try {
        const userResult = await pool.query('SELECT username, password FROM users WHERE username = $1', [username]);

        if (userResult.rowCount === 1) {
            const hashedPasswordFromDB = userResult.rows[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

            if (passwordMatch) {
                res.json({ success: true });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;