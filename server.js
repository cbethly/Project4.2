const express = require("express");
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const bodyparser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const http = require('http');
var parseUrl = require('body-parser');
const app = express();

var mysql2 = require('mysql2');

let encodeUrl = parseUrl.urlencoded({ extended: false });

//session middleware
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));

app.use(cookieParser());

// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

// Database connection

const con = mysql2.createConnection({
    host: "localhost",
    user: "root", // my username
    password: "Bc@9996.", // my password
    database: "Student"
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
})


app.post('/register', encodeUrl, (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    con.connect(function(err) {
        if (err){
            console.log(err);
        };
        // checking user already registered or no
        con.query(`SELECT * FROM users WHERE name = '${name}' AND password  = '${password}'`, function(err, result){
            if(err){
                console.log(err);
            };
            if(Object.keys(result).length > 0){
                res.sendFile(__dirname + '/failReg.html');
            }else{
            //creating user page in userPage function
            function userPage(){
                // We create a session for the dashboard (user page) page and save the user data to this session:
                req.session.user = {
                    name: name,
                    email:email,
                    password: password 
                };

                res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Registration and Login</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="container">
                        <h3>Hi, ${req.session.user.name} ${req.session.user.email}</h3>
                        <a href="/">Log out</a>
                    </div>
                </body>
                </html>
                `);
            }
                // inserting new user data
                var sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
                con.query(sql, function (err, result) {
                    if (err){
                        console.log(err);
                    }else{
                        // using userPage function for creating user page
                        userPage();
                    };
                });

        }

        });
    });


});

// upload `login.html` file to /login page
app.get("/login", (req, res)=>{
    res.sendFile(__dirname + "/login.html");
});

// get user data to /dashboard page
app.post("/dashboard", encodeUrl, (req, res)=>{
    var name = req.body.name;
    var password = req.body.password;

    con.connect(function(err) {
        if(err){
            console.log(err);
        };
//get user data from MySQL database
        con.query(`SELECT * FROM users WHERE name = '${name}' AND password = '${password}'`, function (err, result) {
          if(err){
            console.log(err);
          };
// creating userPage function to create user page
          function userPage(){
            // We create a session for the dashboard (user page) page and save the user data to this session:
            req.session.user = {
                name: name,
                password: password 
            };

            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Registration and login</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container">
                    <h3>Hi, ${req.session.user.name} ${req.session.email}</h3>
                    <a href="/">Log out</a>
                </div>
            </body>
            </html>
            `);
        }

        if(Object.keys(result).length > 0){
            userPage();
        }else{
            res.sendFile(__dirname + '/failLog.html');
        }

        });
    });
});
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
//! Routes start
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/upload.html');
});
//@type   POST
//route for post data
app.post("/post", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:4000/images/' + req.file.filename
        var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
        con.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});

app.listen(4000, ()=>{
    console.log("Server running on port 4000");
});