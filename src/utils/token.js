const jwt = require('jsonwebtoken');
const config = require('../../config/default.json');

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
};