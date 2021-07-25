const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgURL: {
        type:  String,
        required: true
    }
});

const AnimalType = mongoose.model('animal_type', animalTypeSchema);
module.exports = AnimalType;