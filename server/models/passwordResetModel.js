const pool = require('../db');
const crypto = require('crypto');

class PasswordReset {
    static async createToken(userId, expiresInMinutes = 60) {
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
        await pool.query(
            'INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)',
            [userId, token, expiresAt]
        );
        return token;
    }

    static async findByToken(token) {
        const result = await pool.query(
            'SELECT * FROM password_resets WHERE token = $1 AND expires_at > NOW()',
            [token]
        );
        return result.rows[0];
    }

    static async deleteByToken(token) {
        await pool.query('DELETE FROM password_resets WHERE token = $1', [token]);
    }
}

module.exports = PasswordReset;