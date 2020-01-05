'use strict'


// create table `expenses` (
// 	`id` int NOT NULL auto_increment,
//     `userID` int NOT NULL,
//     `description` varchar(255),
//     `amount` int NOT NULL,
//     `categoryID` int NOT NULL,
//     `date` date,
//     primary key (`id`),
//     foreign key (`userID`) references users(`id`),
//     foreign key (`categoryID`) references categories(`id`)
// );


var db = require('./localDb.js')
var tableName = 'expenses'
var categoryTableName = 'categories'

var DB = {}

DB.addExpense = function(userID, description, amount, date, categoryID, cb){
    console.log("Adding expense: " + description +" for userID: " + userID);
    var query = 'INSERT INTO ' + tableName + ' SET ?';
    var expense = new Expense(0, userID, description, amount, date, categoryID)
    console.log(expense)
    db.query(query, [expense], function(error, results, fields){
        console.log(results);
        console.log(fields)
    });
}

// this.addExpense(1, "First expense for user 1", 56, '2019-12-4', 1, function(err, data){});

DB.getExpenseFromId = function(expenseID, cb){
    console.log("Fetching expense of id: " + expenseID);
    var query = 'SELECT * from ' + tableName + ' where id = ?'
    console.log(query);
    db.query(query, [expenseID], function(error, results, fields){
        
        var obj = results[0]
        console.log(obj)
        cb(null, new Expense(obj.id, obj.userID, obj.description,
             obj.amount, obj.date, obj.categoryID));
    });
}

DB.updateExpenseById = function(expenseID, expenseObj, cb){
    console.log("Updating expense for id: " + expenseID);
    var query = 'UPDATE ' + tableName + ' SET ? WHERE id = ?'
    console.log(query);
    db.query(query, [expenseObj, expenseID], function(error, results, fields){
        console.log(results);
    });
}

// console.log("outside this: ", this)
// DB.getExpenseFromId(2, function(err, data){
//     console.log("data: ",data)
//     console.log("this: ", this)
//     data.description= "Updated description"
//     DB.updateExpenseById(data.id, data)
// });


DB.deleteExpenseById = function(expenseID, cb){
    console.log("Deleting expense of id: " + expenseID);
    var query = 'DELETE FROM ' + tableName + ' WHERE id = ?';
    console.log(query);
    db.query(query, [expenseID], function(error, results, fields){
        console.log(results);
        cb(error, results);
    })
}

DB.getExpenseByUserAndDate = function(userID, startDate, endDate, cb){
    console.log("Fetching expenses by date");
    var query = 'SELECT * from ' + tableName + ' WHERE userID = ? AND date >= ? and date <= ?';
    console.log(query);
    db.query(query, [userID, startDate, endDate], function(error, results, fields){
        console.log(results)
    })
}

DB.getExpenseByUserAndDate(1, '2019-12-03', '2019-12-04');

DB.getCategoryWiseExpenseSumBetweenDates = function(userID, startDate, endDate, cb){
    console.log("Fetching Categorywise sum of expenses between dates")
    var query = 'SELECT c.name, sum(c.amount) from ' + tableName + ' e, ' +
     categoryID + ' c, where '
}
// this.deleteExpenseById(1, function(err, data){
//     console.log(data);
// });

// this.getCategoryFromId(1, function(err, data){});
// this.addCategory(1, 'Groceries', 'EXPENSE', function(err, data){
//     console.log(data);
// });

function Expense(id, userID, description, amount, date, categoryID){
    this.id = id;
    this.userID = userID;
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.categoryID = categoryID
}