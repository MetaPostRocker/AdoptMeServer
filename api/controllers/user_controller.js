const bcrypt = require('bcryptjs');
const tokenController = require('./token_controller');
const User = require('../models/user');
const { JsonWebTokenError } = require('jsonwebtoken');

async function create(req, res) {
    const username = req.body.username;

    if (await User.findOne({ username })) {
        return res.status(403).json({
            msg: `User with username '${username}' already exists`,
        });
    }

    const newUser = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error(err);
            res.sendStatus(424);
        }
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;

            newUser
                .save()
                .then((user) => res.sendStatus(201))
                .catch((err) => {
                    console.error(err);
                    res.status(424).json({
                        msg: `Bcrypt error: ${err}`,
                    });
                });
        });
    });
}

async function login(req, res) {
    const username = req.body.username;

    if (!username) {
        return res.status(403).json({
            msg: `Provide username`,
        });
    }

    user = await User.findOne({ username });

    if (!user) {
        return res.status(403).json({
            msg: `User with username '${username}' doesn't exist`,
        });
    }

    if (!req.body.password) {
        return res.status(403).json({
            msg: `Provide password`,
        });
    }

    bcrypt.compare(req.body.password, user.password, async (err, match) => {
        if (err) {
            console.error(err);
            return res.sendStatus(424);
        }
        if (match) {
            const accessToken = tokenController.createAccessToken(user._id);
            const refreshToken = await tokenController.createRefreshToken(user._id);
            res.json({
                refreshToken,
                accessToken,
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                locationId: user.location._id,
            });
        } else {
            res.status(403).json({
                msg: 'Incorrect password',
            });
        }
    });
}

async function logout(req, res) {
    tokenController.deleteToken(req.body.token);
    res.sendStatus(204);
}

function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({
            msg: 'Token isn\'t provided',
        });

    const userId = tokenController.verifyToken(token);
    if (!userId)
        res.status(403).json({
            msg: 'Invalid token',
        });

    req.userId = userId;
    next();
}

module.exports = {
    create,
    login,
    logout,
    authenticateUser,
};
