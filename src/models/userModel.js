const bcrypt = require('bcrypt');

async function createUser(pg, name, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pg.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function findUserByEmail(pg, email) {
    try {
        const result = await pg.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error finding user by email:', error.message);
        throw error;
    }
}

module.exports = { createUser, findUserByEmail };