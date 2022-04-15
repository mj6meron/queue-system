   
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../model/User')

router.get('/', (req, res) => {
    res.send('we edit a user here - listning')
});

router.patch('/saveChanges', async (req, res) => {
    const token = req.header('auth-token');
    console.log('we tryna edit with token -> ', token)
    if (!token) {
        return res.status(401).json('Access Denied');
    }

    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log('varified   --->  ', verified._id)
    const theUser = await User.findById(verified._id)
   console.log(' here is the req.body = ', req.body)
    Object.assign(theUser, req.body)
    await theUser.save()
    console.log('here we got the final save user ->' , theUser)

    // Create and assign token
    res.header('auth-token', token).json({token: token, redirect: 'queue_dash'}); // attached token to the header

});


module.exports = router;