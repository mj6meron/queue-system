const express = require('express');
const router = express.Router();
const User = require('../model/User')
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('okay, you seem to want to delete a user now? - pass an id to delete')
});
router.patch('/', async (req, res) => {
    
    const id = req.body.id

    // here we log out the user, But the data still remains as history
    // it is done with the 'active' attribute of the object schema USER
    try {
        console.log('we in thou  - >>  ' , id)
        const user = await User.findById(id)
        console.log('here we tryna set active false')
        console.log('current active ->' ,user.active)
        console.log('current dateout ->' ,user.dataout)
        await Object.assign(user, {"active": false, "dateout": Date.now()})
        await user.save()
        console.log('changed active ->' ,user.active)
        console.log('changed dateout ->' ,user.dataout)
        res.send("done!");
    } catch (error) {
        res.send("can't delete some wrong, error: " + error)
    }
})

module.exports = router;