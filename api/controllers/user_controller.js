const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function addUser(req, res) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'User with username "' + userParam.username + '" already exists';
    }

    const newUser = new User(userParam);

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;

            newUser
                .save()
                .then((user) => res.send(user))
                .catch((err) => console.error(err));
        });
    });
}

module.exports = {
    addUser,
};
