const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const axios = require('axios')
const port = process.env.WEB_PORT || 3000

app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.get('*.css', (req, res, next) => {
    res.set('Content-Type', 'text/css');
    next();
  });

//request session token from the client


app.get('/', (req, res) => {
    //call localhost:3000/session to get the session token
        // Get the session ID from the client cookie
    const sessionId = req.sessionID
    document.cookie = 'session=' + sessionId + '; path=/;';
    console.log(sessionId)
    // Check if the session ID is valid (e.g. exists in the session store)
    if (isValidSessionId(sessionId)) {
        // Retrieve user data from the database using the session ID
        const userData = getUserData(sessionId)
        res.sendFile(path.join(__dirname, 'public/index.html'))
        // Render the index.html template with the user data
        //******WIP*****
    } else {
        // Redirect the user to the login page
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    //check if username and password is valid
    //if valid, create a session and redirect to index.html and send status code 200
    //if not valid, redirect to login.html and send error status code 401
})

app.post('/api/savenotes', (req, res) => {
    //reciever note from client
    //save note to database
    res.sendStatus(200)
})

app.listen(port, ()=>{
    console.log(`Hosting on ${port}`)
})