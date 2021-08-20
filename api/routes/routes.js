const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const adController = require('../controllers/ad_controller');
const petTypeController = require('../controllers/pet_type_controller');
const locationController = require('../controllers/location_controller');
const tokenController = require('../controllers/token_controller');

// Pet Type Routes
router.get('/getAvailablePetTypes', petTypeController.getPetTypes);
router.post('/createPetType', petTypeController.createPetType);

// Location Routes
router.get('/getAvailableLocations', locationController.getLocations);
router.post('/createLocation', locationController.createLocation);

// User Routes
router.post('/createUser', userController.create);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Token Routes
router.post('/refreshToken', tokenController.refreshToken);

// Ad Routes
router.get('/getAllAds', adController.getAds);
router.get('/getUserAds', userController.authenticateUser, adController.getAds);
router.post('/createAd', userController.authenticateUser, adController.createAd);
router.put('/editAd');

module.exports = router;
