const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

async function addUser(req, res) {
    const username = req.body.username;

    if (await User.findOne({ username })) {
        res.status(403).json({
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
                .then((user) => res.json(user))
                .catch((err) => {
                    console.error(err);
                    res.status(424).json({
                        msg: `Bcrypt error: ${err}`,
                    });
                });
        });
    });
}

async function loginUser(req, res) {
    const username = req.body.username;

    user = await User.findOne({ username });

    if (!user) {
        res.status(403).json({
            msg: `User with username '${username}' doesn't exist`,
        });
    }

    bcrypt.compare(req.body.password, user.password, (err, match) => {
        if (err) {
            console.error(err);
            res.sendStatus(424);
        }
        if (match) {
            const accessToken = jwt.sign(
                { username },
                secrets.ACCESS_TOKEN_SECRET
            );
            res.json({
                token: accessToken,
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                // locationId: user.location._id,
            });
        } else {
            res.status(403).json({
                msg: 'Incorrect password',
            });
        }
    });
}

function authenticateUser(req, res, next) {

    next();
}

module.exports = {
    addUser,
    loginUser,
};

/*{	
	"firstname" : "Bekhruz",
    "lastname": "Azam",
    "username": "MetaPostRocker",
    "password": "SillyPass"
}*/

// {
//     "username": "ZMetaPostRocker",
//     "password": "ZSillyPass"
// }
