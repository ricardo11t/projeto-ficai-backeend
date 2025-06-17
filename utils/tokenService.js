const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION

const generateToken = (usuario) => {
    return jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            role: usuario.role
        },
        SECRET,
        {expiresIn: EXPIRATION}
    );
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        throw new Error('Token inválido ou expirado.');
    }
}

module.exports = {
    generateToken,
    verifyToken
}