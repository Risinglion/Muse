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
console.log(port)
app.get('/', (req, res) => {
    //get session-token from cookie
    const sessionToken = req.cookies['session-token']
    console.log(sessionToken)
    //if session-token is not set, redirect to login page
    if(!sessionToken){
        res.redirect('/login')
    }
    //if session-token is set, redirect to notes page
    else if(sessionToken == '123456789'){
        res.sendFile(path.join(__dirname, 'home.html'))
    } else {
        res.redirect('/login')
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'))
})

app.post('/api/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)
    if(username === "admin" && password === "password"){
        res.cookie('session-token', '123456789', {
            maxAge: 1000 * 60 * 60, // 1 hour
            //secure: true, // Only send the cookie over HTTPS
            httpOnly: true, // Only allow the browser to access the cookie
        });
        res.status(200).json({message: 'OK', redirect: '/'});
    }
    else{
        res.sendStatus(401)
    }
})

app.post('/api/savenotes', (req, res) => {
    //reciever note from client
    //save note to database
    res.sendStatus(200)
})

app.listen(port, ()=>{
    console.log(`Hosting on ${port}`)
})