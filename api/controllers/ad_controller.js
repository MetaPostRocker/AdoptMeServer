const Ad = require('../models/ad');

function getAds(req, res) {

    let qry = {};

    if (req.body.userId != undefined) {
        qry.ownerId = req.body.userId;
    }

    Ad.find(qry)
        .then((data) => res.json(data))
        .catch((err) => console.error(err));
}

function createAd(req, res) {
    req.body.ownerId = req.body.userId;

    newAd = new Ad(req.body);

    newAd
        .save()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.error(err));
}

module.exports = {
    getAds,
    createAd,
};
