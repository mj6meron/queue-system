const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signale = require('signale')

router.post('/register', async (req, res) => {

    // Validate User
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});   // The message is form the joi object in validation.js
    }


    // if existing user
    const emailExist = await User.findOne({ email: req.body.email });
    try {
            if (emailExist && (emailExist.active==true)) {
                console.log('found obj--> ' ,emailExist)
                return res.status(400).json({error: 'Email exists buddy! You are aready at the queue'});
            }
            else if (emailExist && (emailExist.active==false)){
                await Object.assign(emailExist, {"active": true, "datein": Date.now()})
                await emailExist.save()
                const token = jwt.sign({_id: emailExist._id}, process.env.TOKEN_SECRET);
                res.header('auth-token', token).json({token: token, redirect: 'queue_dash'});
            }
            else{
                const user = new User({
                    name: req.body.name,
                    pn: req.body.pn,   // this could be hashedPn in the future
                    email: req.body.email,
                    telnumber: req.body.telnumber
                });
                const savedUser = await user.save();
                const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
                res.header('auth-token', token).json({token: token, redirect: 'queue_dash'});
                signale.complete(savedUser)
            }
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/login', async (req, res) => {

    // Validate User
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }

    // if existing email
    const user = await User.findOne({ email: req.body.email });
    if (!user || (user.active ==false)) {
        return res.status(400).json({error: 'Email is not found! - You are not in the queue.'});
    }

    // Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({token: token, redirect: 'queue_dash'}); // attached token to the header

});





module.exports = router;