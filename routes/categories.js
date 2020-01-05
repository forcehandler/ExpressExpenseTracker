var express = require('express')
var router = express.Router()
var db = require('../db')


router.get('/', function(req, res) {
    // Get all categories
    db.Categories.getAllCategories(function(err, data) {
        if(err){

        }
        else {
            console.log("Got the data: " + data)
            res.send(data)
        }
    })
})

router.get('/:id', function(req, res){
    console.log("Fetching category by id: " + req.params.id)
    db.Categories.getCategoryFromId(req.params.id, function(err, data){
        if(err) {

        }
        else {
            console.log(data)
            res.send(data[0])
        }
    })
})

router.post('/', function(req, res){
    // Add a category for a user
    db.Categories.addCategory(req.body.id, req.body.categoryName, req.body.categoryType, function(err, data){
        if(err){

        }
        else {
            console.log("Got the data " + data)
            res.send(data)
        }
    })
})

module.exports = router