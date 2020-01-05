'use strict'

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@1234',
    database: 'expense_manager_db'
})

connection.connect(function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('Successfully connected to ' + 'expensemanager' + ' database')
})

module.exports = connection;