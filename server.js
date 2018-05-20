const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials/");
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.set('view engine','hbs');

app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + "\n",(err) => {
        if(err){
            console.log("unable to append to file");
        }
    });
    next();
});
// app.use( (req,res,next) => {
//     res.render("default.hbs", {
//         title: "under maintanence",
//         welcomeMessage : "Please visit us tomorrow, we are currently in maintanence"
//     });
// });
app.use(express.static(__dirname+"/public"));

app.get('/', (req,res) => {
    // res.send({
    //     name : "sourabh",
    //     likes : [
    //         "coding",
    //         "gym"
    //     ]
    // });
    res.render("home.hbs",{
        title: "Home page",
        welcomeMessage : "Welcome to my site!"
    });
});

app.get('/about', (req,res) => {
    //res.send("about page");
    res.render("about.hbs",{
        title : "About Page",
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage : "We have encountered an error!"
    })
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});