// this module varifies and sends data to api get requests in a securePage
const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req, res) => {
    console.log('we asked for ALL users OPEN ROUTE!')
    try {
        //  We simply return the list of all users
        User.find({}, function(err, users) {
            var usersList = [];
            users.forEach(function(user) {
              usersList.push(user);
            });
        console.log(' here is what we got:-> ALL USERS--> ', usersList)
            res.send(usersList);  
          })
    } catch (error) {
        console.log('We found an error - on getting ALL USERS on OPEN ROUTE', error)
        res.status(400).json('SomeThing went wrong :(, please try again later.')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id})
        res.send({user})
    } catch (error) {
        const formatId= "</br> </br></br>Request format example -> http......api/users/6256b37b271c26bcb91b5c9d"
        res.status(404).send("</br> </br>Found an error getting the user, Please make sure the ID is right." + formatId)
        console.log("Found an error getting the user, Please make sure the ID is right.")
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        Object.assign(user, req.body)
        await user.save()
        res.send({data : user})
    } catch (error) {
        const formatId= "</br> </br></br>Request format example -> http......api/users/6256b37b271c26bcb91b5c9d"
        res.status(404).send("</br> </br>Found an error getting the user, Please make sure the ID is right." + formatId)
        console.log("Couldn't update user, Please make sure the ID is right.")
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await user.remove()
        res.send(`User of id ${req.params.id} succefully Removed!`)
    } catch (error) {
        const formatId= "</br> </br></br>Request format example -> http......api/users/6256b37b271c26bcb91b5c9d"
        res.status(404).send("</br> </br>Found an error getting the user, Please make sure the ID is right." + formatId)
        console.log("Couldn't remove user!, Please make sure the ID is right.")
    }
})

module.exports = router;
/**
 * 
 * 
 */