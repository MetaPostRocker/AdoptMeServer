const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: true,
    },
});

const PetType = mongoose.model('pet_type', petTypeSchema);
module.exports = PetType;
