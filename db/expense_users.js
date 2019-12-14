'use strict'

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'somya',
    password: 'somya',
    database: 'expensemanager'
})

connection.connect(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('Successfully connected to ' + 'expensemanager' + ' database')
})

var DB = {}

DB.getAllUsers = function(cb){
    console.log("Fetching ALL Users!")
    var query = 'SELECT * FROM users'
    connection.query(query, function(error, results, fields){
        console.log(JSON.stringify(results))
    })
}

DB.insertUser = function(username, password, email, isAdmin, cb){
    console.log("Inserting User with username: " + username)
    var userToInsert = new User(0, username, password, email, isAdmin)
    var query = `INSERT INTO users SET ?`
    connection.query(query, [userToInsert],function(error, results, fields){
        console.log(JSON.stringify(results))
    })
}

DB.deleteUser = function(id, username, cb){
    console.log("Deleting user with username: " + username);
    var query = 'DELETE from users WHERE id = ?';
    connection.query(query, [id], function(error, results, fields){
        console.log(JSON.stringify(results))
    })
}

DB.modifyUser = function(id, username, password, email, isAdmin, cb){
    console.log("Updating user: " + username);
    var query = "UPDATE users SET ? WHERE id = ?";
    var updatedUser = new User(id, username, password, email, isAdmin);
    connection.query(query, [updatedUser, id], function(error, results, fields){
        console.log(JSON.stringify(results));
    })
}


DB.modifyUser(3, "testUser1", "updatedPassword", "nayaemail@email.com", 1)

function User(id=0, username, password, email, isAdmin){
    this.id = id,
    this.username = username,
    this.password = password,
    this.email = email,
    this.isAdmin = isAdmin
}