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

    if (emailExist) {
        return res.status(400).json({error: 'Email exists buddy! You are aready at the queue'});
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPn = await bcrypt.hash(req.body.pn, salt);

    // Create new User
    const user = new User({
        name: req.body.name,
        pn: hashPn,
        email: req.body.email,
        telnumber: req.body.telnumber
    });


    try {
        /*
        *  Save the user
        *  Redirect to batcave
        * response object containing :
                *  savedUser
                * token
        */
        const savedUser = await user.save();
        // then we create and assign token during registration to redirect to secure
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({token: token, redirect: 'queue_dash'});
        signale.complete(savedUser)
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
    if (!user) {
        return res.status(400).json({error: 'Email is not found'});
    }

    // Password correct?
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).json({error: 'Invalid password'});
    }

    // Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({token: token, redirect: 'batcave'}); // attached token to the header

});





module.exports = router;