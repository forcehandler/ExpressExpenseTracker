var express = require('express')
var router = express.Router()
var db = require('../db')
var loginEnsure = require('connect-ensure-login');


router.get('/', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Get all incomes of the user
    db.Incomes.getAllIncomesForUser(req.user.id, function(err, data) {
        if(err) {

        }
        else {
            console.log(data)
            res.send(data)
        }
    })
})

router.get('/:id', loginEnsure.ensureLoggedIn(), function(req, res){
    // Get details of a particular income
    db.Incomes.getIncomeFromId(req.params.id, function(err, data) { 
        if(err) { 
            req.flash('error', 'No income with given id found')
        }
        else {
            console.log(data)
            res.send(data)
        }
    })
})

router.post('/', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Add income agains the currently logged in user
    db.Incomes.addIncome(req.user.id, req.body.description, req.body.amount, req.body.date, req.body.categoryID, function(err, data) {
        if(err) {
            res.send({errorString: "An error occured while adding the Income"})
        }
        else {
            console.log(data)
            res.send(data)
        }
    })
})

router.put('/', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Update a user income
    db.Incomes.updateIncomeById(req.body.id, req.user.id, req.body.description, req.body.amount, req.body.date, req.body.categoryID,
        function(err, data) {
            if(err) {
                res.send({errorString: "An error occurred while updating Income"})
            }
            else {
                console.log(data)
                res.send(data)
            }
        })
})

router.delete('/:id', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Delete a particual income
    db.Incomes.deleteIncomeById(req.params.id, function(err, data) {
        if(err){
            releaseEvents.send({errorString: "An error occurred while deleting income"})
        }
        else {
            console.log(data)
            res.send(data)
        }
    })
})


router.get('/incomes/:startdate/:enddate', function(req, res){
    res.send(req.params.startdate)
    // get the incomes between startdate and enddate
    // var incomes = getincomesbetweendatefilledwithcategories()
    // res.send(data)
  })
  
router.get('/incomes/:startdate/:enddate/sum', function(req, res){
    // get category-wise sum of incomes in the provided date range
    
  })


module.exports = router