   
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('we are on the home page')
});


module.exports = router;