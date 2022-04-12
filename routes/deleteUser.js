   
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('okay, you seem to want to delete a user now?')
});


module.exports = router;