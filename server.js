var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");
var bcrypt = require('bcrypt');

var app = express();

    app.use(express.static(__dirname + "/public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(methodOverride('X-HTTP-Method-Override')); 
  
    app.use(session({
        cookieName: 'session',
        secret: 'MySecretString',
        duration: 30 * 60 * 1000,
    
   resave: true,
        saveUninitialized: true,
        saveUninitialized: true
    }));

    
    
        
    app.post("/login", function (req, res, next) {
        
        var passwordHash = bcrypt.hashSync("MyPassword", 10);
        var receivedUser = req.body.user;
        var receivedPass = req.body.pass;
        if (receivedUser === "MyUser" && bcrypt.compareSync(receivedPass, passwordHash)) {
            req.session.user = "user";
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    });
    
    app.get("/me", function (req, res, next) {
        
        if (req.session.user) {
            res.send(req.session.user);
            res.status(200).end();
        } else {
            res.status(401).end();
        }
    });
    app.get("/logout", function (req, res, next) {
        
        req.session.destroy(function(err) {
          res.status(200).end();
        });
        
    });
    
    var server = app.listen(8080, function () {
      console.log("App running");
    });
