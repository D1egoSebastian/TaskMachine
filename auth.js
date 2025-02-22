const jwt = require ('jsonwebtoken');
const secretKey = 'mysecretkey';

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {generateToken, verifyToken};