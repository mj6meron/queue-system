   const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('------  DashBoard of all users ---------- ')
});


module.exports = router;