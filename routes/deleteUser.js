const express = require('express');
const router = express.Router();
const User = require('../model/User')
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('okay, you seem to want to delete a user now? - pass an id to delete')
});
router.patch('/', async (req, res) => {
    const token = req.header('auth-token');
    console.log('we tryna edit with token -> ', token)
    if (!token) {
        return res.status(401).json('Access Denied');
    }
    const varified = jwt.verify(token, process.env.TOKEN_SECRET)
    const id = varified._id

    // here we log out the user, But the data still remains as history
    // it is done with the 'active' attribute of the object schema USER
    try {
        const user = await User.findById(id)
        console.log('here we tryna set active: false and dayout: now')
        console.log('current active ->' ,user.active)
        console.log('current dateout ->' ,user.dataout)
        await Object.assign(user, {"active": false, "dateout": Date.now()})
        await user.save()
        console.log('changed active ->' ,user.active)
        console.log('changed dateout ->' ,user.dataout)
        res.send(" Logged out. done!");
    } catch (error) {
        res.send("can't delete some wrong, error: " + error)
    }
})

module.exports = router;