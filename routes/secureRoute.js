const router = require('express').Router();
const verify = require('./varifyToken');

router.get('/', verify, (req, res) => {
    res.redirect('/queue_Dash');
});

module.exports = router;