'use strict'

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'expensemanager'
})

connection.connect(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('Successfully connected to ' + 'expensemanager' + ' database')
})

module.exports = connection;