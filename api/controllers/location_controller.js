const Location = require('../models/location');

function getLocations(req, res) {
    Location.find()
        .then((data) => res.json(data))
        .catch((err) => console.error(err));
}

function createLocation(req, res) {
    newLocation = new Location(req.body);

    newLocation
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.error(err));
}

module.exports = {
    getLocations,
    createLocation,
};
