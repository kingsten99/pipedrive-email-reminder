const jwt = require('jsonwebtoken');
const config = require('../../config/default.json');

const verifyToken = (req, res, next) => {
    // support Authorization: Bearer <token> and x-access-token
    let token = req.headers['authorization'] || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    if (typeof token === 'string' && token.toLowerCase().startsWith('bearer ')) {
        token = token.slice(7).trim();
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;