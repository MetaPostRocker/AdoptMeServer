const PetType = require('../models/pet_type');

function getPetTypes(req, res) {
    PetType.find()
        .then((data) => res.json(data))
        .catch((err) => console.error(err));
}

function createPetType(req, res) {
    newPetType = new PetType(req.body);

    newPetType
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.error(err));
}

module.exports = {
    getPetTypes,
    createPetType,
};
