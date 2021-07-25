const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnimalType = require('./animal_type');
const Location = require('./location');

const adSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: AnimalType.schema,
        required: true
    },
    // ture if male
    sex: {
        type: Boolean,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    location: {
        type: Location.schema,
        required: true
    },
    is_fav: {
        type: Boolean,
        default: false
    }
});

const Ad = mongoose.model('ad', adSchema);
module.exports = Ad;