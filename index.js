const express = require('express')
const mongoose = require('mongoose')
const signale = require('signale')
const dotenv = require('dotenv')
const authorize = require('./routes/authorize')
const deleteUser = require('./routes/deleteUser')
const editUser = require('./routes/editUser')
const home = require('./routes/home')
const openRoute = require('./routes/openRoute.js')
const getDetails = require('./routes/getDetails')
const queue_dash = require('./routes/queue_dash')

const PORT = process.env.PORT || 1995

// Activate Dontenv - helps us read from the .env file
dotenv.config()

// Connect to database
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology:true, useNewUrlParser: true}, ()=>{
    signale.success('connected to the whole world wit my database')
})

const app = express()

// some middlewares
app.use(express.static('public'))
app.use(express.json())


// Routes - REST APIs
app.use('/authorize', authorize)
app.use('/deleteUser', deleteUser)
app.use('/editUser', editUser)
app.use('/queue_dash', queue_dash)
app.use('/getDetails', getDetails)
app.use('/api/users', openRoute)
app.use('/getDetails', getDetails)
app.use('/', home)

app.get('/', (req, res)=>{
    res.send('welcome to the app server!')
})




// Listen
app.listen( PORT, ()=>{
    console.log('server listening on PORT : ', PORT)
})
console.log('hey there!')