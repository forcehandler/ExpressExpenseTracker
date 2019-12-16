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



module.exports.addExpense = function(userID, description, amount, date, categoryID, cb){
    console.log("Adding expense: " + description +" for userID: " + userID);
    var query = 'INSERT INTO ' + tableName + ' SET ?';
    var expense = new Expense(0, userID, description, amount, date, categoryID)
    console.log(expense)
    db.query(query, [expense], function(error, results, fields){
        console.log(results);
        console.log(fields)
    });
}

this.addExpense(1, "First expense for user 1", 56, '2019-12-4', 1, function(err, data){});

module.exports.getCategoryFromId = function(categoryID, cb){
    console.log("Fetching category of id: " + categoryID);
    var query = 'SELECT * from ' + tableName + ' where id = ?'
    console.log(query);
    db.query(query, [categoryID], function(error, results, fields){
        console.log(new Category(JSON.parse(results[0])))
    });
}

module.exports.updateCategoryNameById = function(categoryId, categoryName, cb){
    console.log("Updating category for id: " + categoryId);
    var query = 'UPDATE ' + tableName + ' SET name = ? WHERE id = ?'
    console.log(query);
    db.query(query, [categoryName, categoryId], function(error, results, fields){
        console.log(results);
    });
}


module.exports.deleteCategoryById = function(categoryId, cb){
    console.log("Deleting category of id: " + categoryId);
    var query = 'DELETE FROM ' + tableName + ' WHERE id = ?';
    console.log(query);
    db.query(query, [categoryId], function(error, results, fields){
        console.log(results);
        cb(error, results);
    })
}

// this.deleteCategoryById(4, function(err, data){
//     console.log(data);
// })

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