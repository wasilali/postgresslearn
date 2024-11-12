const { createUser, findUserByEmail } = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_DB_URL,
});

async function register(req, reply) {
    const { name, email, password } = req.body;
    const user = await createUser(pool, name, email, password);
    reply.send({ user });
}

async function login(req, reply) {
    const { email, password } = req.body;
    const user = await findUserByEmail(pool, email);
    console.log(user,"user");
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return reply.status(401).send({ message: user.message });
    }
    const token = this.jwt.sign({ id: user.id }, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN });
    reply.send({ user, token }); 
}

async function getSingleUser(req, reply) {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    reply.send(user.rows[0]);
}

async function editPassword(req, reply) {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    try {
        // Get the user from the database
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = result.rows[0];

        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return reply.status(401).send({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

        reply.send({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

async function deleteUser(req, reply) {
    const userId = req.user.id;
    try {
        // Delete the user from the database
        await pool.query('DELETE FROM users WHERE id = $1', [userId]);
        reply.send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = { register, login, getSingleUser, editPassword, deleteUser };

