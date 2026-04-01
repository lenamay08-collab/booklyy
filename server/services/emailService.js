const sendResetEmail = async (to, token) => {
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
};

module.exports = { sendResetEmail };