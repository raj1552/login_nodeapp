const bcrypt = require('bcrypt');
const pool = require('../../db/config')
const query = require('../query/GetUserByUsernameAndPasswordQuery')

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!username || !password) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const userRegistration = await pool.query( query.getUserByUsernameAndPassword, [username, hashedPassword]);

        res.json({ success: true, user: userRegistration.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    res.json({ success: true, user: req.authenticatedUser });
};

module.exports = { registerUser, loginUser };