const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');
const Token = require('../models/token');

function createAccessToken(userId) {
    const accessToken = jwt.sign({ userId }, secrets.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m',
    });

    return accessToken;
}

async function createRefreshToken(userId) {
    const refreshToken = jwt.sign({ userId }, secrets.REFRESH_TOKEN_SECRET);

    token = new Token({
        content: refreshToken,
    });

    await token.save().catch((err) => console.error(err));

    return refreshToken;
}

async function refreshToken(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);

    if (!(await Token.findOne({ content: refreshToken }))) {
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken, secrets.REFRESH_TOKEN_SECRET, (err, userId) => {
        if (err) return res.sendStatus(403);
        const accessToken = createAccessToken(userId);
        res.json({ accessToken });
    });
}

function verifyToken(accessToken) {
    try {
        return jwt.verify(accessToken, secrets.ACCESS_TOKEN_SECRET);
    } catch (err) {}
}

function deleteToken(refreshToken) {
    Token.deleteOne({ content: refreshToken });
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    refreshToken,
    verifyToken,
    deleteToken,
};
