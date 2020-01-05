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

DB.getAllExpensesForUser = function(userID, cb){
    console.log("Fetching all expenses of userid: " + userID);
    var query = 'SELECT e.id, e.userID, e.description, e.amount, e.date, c.name as category, c.id as categoryID from ' + tableName + ' e, ' + categoryTableName + ' c where e.categoryID = c.id and e.userID = ?';
    console.log(query);
    db.query(query, [userID], function(error, results, fields){
        
        var obj = results[0]
        console.log(obj)
        // cb(null, new Expense(obj.id, obj.userID, obj.description,
        //      obj.amount, obj.date, obj.categoryID));
        if(error) {
            cb(error, null)
        }
        else {
            results.map(rec => rec.date = rec.date.toISOString().split('T')[0])
            cb(null, results)
        }
    });
}


DB.addExpense = function(userID, description, amount, date, categoryID, cb){
    console.log("Adding expense: " + description +" for userID: " + userID);
    var query = 'INSERT INTO ' + tableName + ' SET ?';
    var expense = new Expense(0, userID, description, amount, date, categoryID)
    console.log(expense)
    db.query(query, [expense], function(error, results, fields){
        console.log(results);
        console.log(fields)
        cb(error, results)
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
        // cb(null, new Expense(obj.id, obj.userID, obj.description,
        //      obj.amount, obj.date, obj.categoryID));
        cb(null, results[0])
    });
}

DB.updateExpenseById = function(expenseID, userID, description, amount, date, categoryID, cb){
    console.log("Updating expense for id: " + expenseID);
    var query = 'UPDATE ' + tableName + ' SET ? WHERE id = ?'
    var expense = new Expense(expenseID, userID, description, amount, date, categoryID)
    console.log(query);
    db.query(query, [expense, expenseID], function(error, results, fields){
        console.log(results);
        cb(error, results)
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
        cb(error, results)
    })
}

// DB.getExpenseByUserAndDate(1, '2019-12-03', '2019-12-04');

DB.getCategoryWiseExpenseSumBetweenDates = function(userID, startDate, endDate, cb){
    console.log("Fetching Categorywise sum of expenses between dates")
    var query = 'SELECT c.name, sum(e.amount) from ' + tableName + 'e, categories c where e.categoryID = c.id and e.userID = ? and date between ? and ? group by(e.categoryID)'
    db.query(query, [userID, startDate, endDate], function(error, results, fields){
        console.log(results)
        cb(error, results)
    }) //  var query = 'SELECT c.name , sum(c.amount) from ' + tableName + ' e,' +
    // categoryID + ' c, where  '
}

//var query = "select sum(amount) as sum, c_name as category from expenses e, category c where e.c_id = c.c_id and id = ? and e_date between ? and ? group by(e.c_id)"



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

module.exports = DB;