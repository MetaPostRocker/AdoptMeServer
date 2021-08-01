const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const petTypeController = require('../controllers/pet_type_controller');
const tokenController = require('../controllers/token_controller');

// Pet Type Routes
router.get('/getAvailablePetTypes', petTypeController.getPetTypes);
router.post('/createPetType', petTypeController.createPetType);

// User Routes
router.post('/createUser', userController.create);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Token Routes
router.post('/refreshToken', tokenController.refreshToken);

module.exports = router;
