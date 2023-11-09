const express = require('express')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
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

var sessionId = 0

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
    else if(sessionToken === sessionId){
        res.sendFile(path.join(__dirname, 'home.html'))
    } else {
        res.redirect('/login')
    }
});

app.get('/login', (req, res) => {
    const sessionToken = req.cookies['session-token']
    console.log(sessionToken)
    if(!sessionToken){
        res.sendFile(path.join(__dirname, 'public/login.html'))
    } else if(sessionToken != sessionId){
        res.sendFile(path.join(__dirname, 'public/login.html'))
    } else {
        res.redirect('/')
    }
})

app.get('/todolist', (req, res) => {
    const sessionToken = req.cookies['session-token']
    console.log(sessionToken)
    if(!sessionToken){
        res.redirect('/login')
    }
    else if(sessionToken == sessionId){
        res.sendFile(path.join(__dirname, 'public/todolist.html'))
    } else {
        res.redirect('/login')
    }
})

app.get('/settings', (req, res) => {
    const sessionToken = req.cookies['session-token']
    console.log(sessionToken)
    if(!sessionToken){
        res.redirect('/login')
    }
    else if(sessionToken == sessionId){
        res.sendFile(path.join(__dirname, 'public/settings.html'))
    } else {
        res.redirect('/login')
    }
})

app.post('/api/logout', (req, res) => {
    res.cookie('session-token', '', {
        maxAge: 0
    })
    res.status(200).json({message: 'OK', redirect: '/login'});
})

app.post('/api/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)
    if(username === "admin" && password === "password"){
        //generate session token (any random string of length 9)
        sessionId = Math.random().toString(36).substring(2, 11)
        res.cookie('session-token', sessionId, {
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