'use strict'

var connection = require('./localDb.js')

var tableName = 'users';

var DB = {}

DB.getAllUsers = function(cb){
    console.log("Fetching ALL Users!")
    var query = 'SELECT * FROM users'
    connection.query(query, function(error, results, fields){
        console.log(JSON.stringify(results))
        cb(null, results)
    })
}

DB.getUserById = function(user_id, cb) {
    console.log("Fetching user by id : " + user_id);
    var query = 'SELECT * from ' + tableName + ' where id = ?';
    connection.query(query, [user_id], function(error, results, fields) {
        console.log(JSON.stringify(results))
        cb(null, results[0])
    })
}

DB.getUserbyName = function(username, cb) {
    console.log("Fetching user by name : " + username);
    var query = 'SELECT * from ' + tableName + ' where username = ?';
    connection.query(query, [username], function(error, results, fields) {
        console.log("Error from db : " + error)
        console.log(JSON.stringify(results))
        cb(null, results[0])
    })
}

DB.insertUser = function(username, password, email, isAdmin, cb){
    console.log("Inserting User with username: " + username)
    var userToInsert = new User(0, username, password, email, isAdmin)
    var query = `INSERT INTO users SET ?`
    connection.query(query, [userToInsert],function(error, results, fields){
        console.log(error)
        if(error && error.code == 'ER_DUP_ENTRY'){
            cb(new Error("Username already exists!"), null)
        }
        else {
            console.log(JSON.stringify(results))
            cb(null, results)
        }
    })
}

DB.deleteUser = function(id, cb){
    console.log("Deleting user with user id: " + id);
    var query = 'DELETE from users WHERE id = ?';
    connection.query(query, [id], function(error, results, fields){
        console.log(JSON.stringify(results))
        cb(null, results)
    })
}   // Delete user expenses as well

DB.modifyUser = function(id, username, password, email, isAdmin, cb){
    console.log("Updating user: " + username);
    var query = "UPDATE users SET ? WHERE id = ?";
    var updatedUser = new User(id, username, password, email, isAdmin);
    connection.query(query, [updatedUser, id], function(error, results, fields){
        console.log(JSON.stringify(results));
        cb(null,results)
    })
}

	
function User(id=0, username, password, email, isAdmin){
    this.id = id,
    this.username = username,
    this.password = password,
    this.email = email,
    this.isAdmin = isAdmin
}

module.exports = DB;