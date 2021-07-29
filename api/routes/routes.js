const express = require('express');
const router = express.Router();

const AnimalType = require('../models/animal_type')

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


module.exports = router;