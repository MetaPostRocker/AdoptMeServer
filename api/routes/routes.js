const express = require('express');
const router = express.Router();

// Logic
router.get('/', (req, res) => res.json([{
    msg:'Got it'
}]));


module.exports = router;