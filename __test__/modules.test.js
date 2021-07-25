const User = require('../api/models/user');
const AnimalType = require('../api/models/animal_type');
const Location = require('../api/models/location');
const Ad = require('../api/models/ad');

const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://master_maxim:i7KN2twFhASWHUb@cluster0.fqllj.mongodb.net/AdoptMe?retryWrites=true&w=majority';

test('functional testing', () => {
    const location = new Location({
        name:       'Tashkent',
        longitude:  41.311081,
        latitude:   69.240562
    });

    const user = new User({
        token:      'dummyToken',
        firstname:  'Jujunya',
        lastname:   'Ejik',
        username:   'Rock Star',
        location,
    });

    const cat = new AnimalType({
        name:   'Cat',
        imgURL: 'http://catworld.com/dinamika.img'
    });

    const ad = new Ad({
        name:   'Have cats',
        type:   cat,
        sex:    false,
        age:    0,
        weight: 3,
        info:   'Gotta really cute cats',
        ownerID: user._id,
        location,
        is_fav: true
    });

    user.bookmarks.push(ad._id);
});