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

app.listen(port, ()=>{
    console.log(`Hosting on ${port}`)
})