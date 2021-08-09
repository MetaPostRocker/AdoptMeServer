const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Location = require('./location');
const Ad = require('./ad');

const userSchema = new Schema({
    token: {
        type: String,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: Location.schema,
        required: true,
    },
    bookmarks: {
        type: [Schema.Types.ObjectId],
    },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
