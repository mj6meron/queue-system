// this module varifies and sends data to api get requests in a securePage
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/aUser', async (req, res) => {
    console.log('we called the get here!')
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json('Access Denied');
    }
    
    try {
        //  This makes sure that every api call has a token and varified
        console.log("token that made the api Get request : ---> ", token)
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log('varified   --->  ', verified)
        req.user = verified;
        const mydata = await User.find({ _id: verified._id})
        const theOne = {"name":mydata[0].name, "pn":mydata[0].pn, "email":mydata[0].email, "telnumber":mydata[0].telnumber}
        console.log(theOne)
        res.json(theOne)
    } catch (error) {
        console.log('We found an error from varifyToken', error)
        res.status(400).json('Invalid Token')
    }
})

router.get('/myId', async (req,res)=>{
    console.log('get my ID request!!!')
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json('Access Denied');
    } else {
        const varifiedID = jwt.verify(token, process.env.TOKEN_SECRET)
        res.send([{"id":varifiedID._id}])
    }
})

router.get('/allUsers', async (req, res) => {
    console.log('get ALL USERS request!!!')
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json('Access Denied');
    }
    
    try {

        //  This makes sure that every api call has a token and varified - GET USER!
        console.log("token that made the api Get request : ---> ", token)
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log('varified   --->  ', verified)
        req.user = verified;
        const mydata = await User.find({ _id: verified._id})
        const theOne = {"name":mydata[0].name, "pn":mydata[0].pn, "email":mydata[0].email, "telnumber":mydata[0].telnumber}
  
        // Respond a list of all users aftr authorized!
        User.find({}, function(err, users) {
            var usersList = [];
            users.filter(x=>x.active==true).forEach( async (user) =>{
              usersList.push(user);
            })
            res.send(usersList);  
          })
    } catch (error) {
        console.log('We found an error from varifyToken', error)
        res.status(400).json('Invalid Token')
    }
})

module.exports = router;
