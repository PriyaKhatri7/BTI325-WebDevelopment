/*********************************************************************************
* BTI325 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Priya Khatri Student ID: 110149176 Date: Sept/9/2019
*
* Online (Heroku) URL: (make sure you include the link ending with .com, not .git
* https://git.heroku.com/shrouded-fortress-22861.git
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

//setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Priya Khatri - 110149176");
});

//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);