var express = require("express");
var router = express.Router();

//this was our model that used the orm functions
var burger = require("../models/burger.js");

//router functions look for URL and determine function from model to use, then render HTML with hb and data

//looks for localhost:3000/. once hit, it calls the model's all function (which calls the ORM's all function(which queries the database with SELECT * FROM table))
//then renders the HTML using the index page(which uses main layout)
router.get("/", function(req, res) {
    burger.all(function(data) {
        var handleBarsObject = {
            burgers: data
        };

        console.log(handleBarsObject);
        res.render("index", handleBarsObject);
    });
});

//looks for localhost:3000/api/burgers
//once hit, calls the model's create function (which calls the ORM;s create function(which queries the database with INSERT INTO burgers(cols) values(??)))
//returns a json object of the new key/value object that was added
router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name", "eaten"
    ],[
        req.body.name, req.body.eaten
    ], function(result) {
        console.log("burger might be created");
        console.log(req.body.name);
        res.json({ id: result.insertId });
    });
});

//looks for localhost:3000/api/burgers/someNumber
//once hit, calls the model's update function (which calls the ORM;s update function(which queries the database with SET column WHERE condition))
//returns a status of 200 to let us know it was changed
//or returns a 404 error if there were no rows that matched the condition
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("conditon", condition);
    burger.update({
        eaten: req.body.eaten
    }, condition, function(result){
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

//exports to server.js
module.exports = router;