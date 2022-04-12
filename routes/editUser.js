   
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('we edit a user here - listning')
});


module.exports = router;