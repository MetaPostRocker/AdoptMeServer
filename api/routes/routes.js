const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const petTypeController = require('../controllers/pet_type_controller');

// Pet Type Routes
router.get('/getAvailablePetTypes', petTypeController.getPetTypes);

router.post('/addPetType', petTypeController.addPetType);

// User Routes
router.post('/addUser', userController.addUser);

module.exports = router;
