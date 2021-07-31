const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
});

const Location = mongoose.model('location', locationSchema);
module.exports = Location;
