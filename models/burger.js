var orm = require("../config/orm.js");



var burger = {

    //calls ORM select all function which queries database with SELECT * FROM table(burgers).
    //it then returns the function value as the result(res) of the query
    all: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        });
    },
    //calls ORM create function which queries database with INSERT INTO table(burgers) (column name) (values(?))
    //it then returns the function value (cb) as the result(res) of the query
    create: function(cols, vals, cb) {
        orm.create("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    //calls ORM update function which queries database with UPDATE table(burgers) SET (col value) WHERE (condition)
    //it then returns the function value (cb) as the result(res) of the query
    update: function(objColVals, condition, cb) {
        orm.update("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    }

};

//exports to controllers/burgers_controller.js for router
module.exports = burger;