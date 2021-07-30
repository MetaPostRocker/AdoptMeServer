var mongoose = require('mongoose'),
  User = mongoose.model('user');
Location = mongoose.model('location');

module.exports = {
    create
};

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'User with username "' + userParam.username + '" already exist';
    }
    const user = new User(userParam);
    await user.save();
}
