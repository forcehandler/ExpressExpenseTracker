'use strict'


// create table `incomes` (
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
var tableName = 'incomes'
var categoryTableName = 'categories'

var DB = {}

DB.getAllIncomesForUser = function(userID, cb){
    console.log("Fetching all incomes of userid: " + userID);
    var query = 'SELECT e.id, e.userID, e.description, e.amount, e.date, c.name as category, c.id as categoryID from ' + tableName + ' e, ' + categoryTableName + ' c where e.categoryID = c.id and e.userID = ?';
    console.log(query);
    db.query(query, [userID], function(error, results, fields){
        
        var obj = results[0]
        console.log(obj)
        // cb(null, new Income(obj.id, obj.userID, obj.description,
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


DB.addIncome = function(userID, description, amount, date, categoryID, cb){
    console.log("Adding income: " + description +" for userID: " + userID);
    var query = 'INSERT INTO ' + tableName + ' SET ?';
    var income = new Income(0, userID, description, amount, date, categoryID)
    console.log(income)
    db.query(query, [income], function(error, results, fields){
        console.log(results);
        console.log(fields)
        cb(error, results)
    });
}

// this.addIncome(1, "First Income for user 1", 56, '2019-12-4', 1, function(err, data){});

DB.getIncomeFromId = function(incomeID, cb){
    console.log("Fetching income of id: " + incomeID);
    var query = 'SELECT * from ' + tableName + ' where id = ?'
    console.log(query);
    db.query(query, [incomeID], function(error, results, fields){
        
        var obj = results[0]
        console.log(obj)
        // cb(null, new Income(obj.id, obj.userID, obj.description,
        //      obj.amount, obj.date, obj.categoryID));
        cb(null, results[0])
    });
}

DB.updateIncomeById = function(incomeID, userID, description, amount, date, categoryID, cb){
    console.log("Updating income for id: " + incomeID);
    var query = 'UPDATE ' + tableName + ' SET ? WHERE id = ?'
    var income = new Income(incomeID, userID, description, amount, date, categoryID)
    console.log(query);
    db.query(query, [income, incomeID], function(error, results, fields){
        console.log(results);
        cb(error, results)
    });
}

// console.log("outside this: ", this)
// DB.getIncomeFromId(2, function(err, data){
//     console.log("data: ",data)
//     console.log("this: ", this)
//     data.description= "Updated description"
//     DB.updateIncomeById(data.id, data)
// });


DB.deleteIncomeById = function(incomeID, cb){
    console.log("Deleting income of id: " + incomeID);
    var query = 'DELETE FROM ' + tableName + ' WHERE id = ?';
    console.log(query);
    db.query(query, [incomeID], function(error, results, fields){
        console.log(results);
        cb(error, results);
    })
}

DB.getIncomeByUserAndDate = function(userID, startDate, endDate, cb){
    console.log("Fetching incomes by date");
    var query = 'SELECT * from ' + tableName + ' WHERE userID = ? AND date >= ? and date <= ?';
    console.log(query);
    db.query(query, [userID, startDate, endDate], function(error, results, fields){
        console.log(results)
        cb(err, results)
    })
}

// DB.getIncomeByUserAndDate(1, '2019-12-03', '2019-12-04');

DB.getCategoryWiseIncomeSumBetweenDates = function(userID, startDate, endDate, cb){
    console.log("Fetching Categorywise sum of expenses between dates")
    var query = 'SELECT c.name, sum(e.amount) as amount from ' + tableName + ' e, categories c where e.categoryID = c.id and e.userID = ? and date between ? and ? group by(e.categoryID)'
    db.query(query, [userID, startDate, endDate], function(error, results, fields){
        console.log(results)
        cb(error, results)
    }) //  var query = 'SELECT c.name , sum(c.amount) from ' + tableName + ' e,' +
    // categoryID + ' c, where  '
}

// this.deleteIncomeById(1, function(err, data){
//     console.log(data);
// });

// this.getCategoryFromId(1, function(err, data){});
// this.addCategory(1, 'Groceries', 'Income', function(err, data){
//     console.log(data);
// });

function Income(id, userID, description, amount, date, categoryID){
    this.id = id;
    this.userID = userID;
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.categoryID = categoryID
}

module.exports = DB;