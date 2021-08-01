const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
});

const Token = mongoose.model('refresh_token', tokenSchema);
module.exports = Token;
