'use strict'

var db = require('./localDb.js')
var tableName = 'categories'

// Tries to match the categories table enum
var categoryTypes = {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE'
}

module.exports.getAllCategories = function(cb){
    console.log("Fetching all categories");
    var query = 'SELECT * from ' + tableName;
    console.log(query);
    db.query(query, function(error, results, fields){
        console.log(error)
        console.log(results)
        if(error){

        }
        else{
            cb(null, results)
        }
    });
}

module.exports.getAllCategoriesofType = function(type, cb){
    console.log("Fetching all categories of type : " + type);
    var query = 'SELECT * from ' + tableName + ' where type = ?';
    console.log(query);
    db.query(query, [type] ,function(error, results, fields){
        console.log(error)
        console.log(results)
        if(error){

        }
        else{
            cb(null, results)
        }
    });
}

module.exports.addCategory = function(userID, categoryName, categoryType, cb){
    console.log("Adding category: " + categoryName +" for userID: " + userID);
    var query = 'INSERT INTO ' + tableName + ' SET ?';
    var category = new Category(0, userID, categoryName, categoryType)
    console.log(query)
    db.query(query, [category], function(error, results, fields){
        console.log(results);
        console.log(fields)
    });
}

module.exports.getCategoryFromId = function(categoryID, cb){
    console.log("Fetching category of id: " + categoryID);
    var query = 'SELECT * from ' + tableName + ' where id = ?'
    console.log(query);
    db.query(query, [categoryID], function(error, results, fields){
        console.log(error)
        cb(null, results)
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

function Category(id, userID, name, type){
    this.id = id;
    this.userID = userID;
    this.name = name;
    if(type == categoryTypes.INCOME || type == categoryTypes.EXPENSE){
        this.type = type
    }
    else{
        throw new Error("Wrong category type provided: " + type)
    }
}