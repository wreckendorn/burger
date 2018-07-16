var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    //function that returns all columns/values from table (cb)
    all: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },

    //function that inserts new values into specific columns from table
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ")";
        queryString += " VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString);

        connection.query(queryString, vals, function(err, results) {
            if(err) {
                throw err;
            }

            cb(results);
        });
    },

    //function that sets column where a condition applies from table
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);

        connection.query(queryString, function(err, results) {
            if(err) {
                throw err;
            }

            cb(results);
        });
    }
};

//exports orm to models/burger.js
module.exports = orm;