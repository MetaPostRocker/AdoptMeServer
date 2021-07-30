const express = require('express');
const router = express.Router();

const AnimalType = require('../models/animal_type')
const User = require('../models/user')
const userControls = require('../controls/user_controls');

// Logic
router.get('/getAvailablePetTypes', (req, res) => {
    AnimalType.find()
    .then(data => res.send(data))
    .catch(err => console.error(err));
    
});

router.post('/addPetType', (req, res) => {
    newAnimalType = new AnimalType({
        name : req.body.name,
        imgURL : req.body.imgURL
    });
    newAnimalType.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => console.error(err));
});

router.post('/createUser', register);

function register(req, res, next) {
    userControls.create(req.body)
        .then(() => res.json({message : "User created"}))
        .catch(err => next(err));
}

module.exports = router;
