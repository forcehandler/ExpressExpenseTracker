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
            db.Categories.getAllCategoriesofType('INCOME',function(err, categories){
                if(err) {
                    
                }
                else {
                    res.render('incomes', {incomes: data,  categories: categories, user: res.user})
                }
            })
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
            res.redirect('/incomes')
        }
    })
})

router.post('/modify', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Update a user income
    console.log("Called post:", req.body)
    db.Incomes.updateIncomeById(req.body.id, req.user.id, req.body.description, req.body.amount, req.body.date, req.body.categoryID,
        function(err, data) {
            if(err) {
                res.send({errorString: "An error occurred while updating Income"})
            }
            else {
                console.log(data)
                res.redirect('/incomes')
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
            res.status(200).send("OK")
        }
    })
})


router.get('/:startdate/:enddate', function(req, res){
    res.send(req.params.startdate)
    // get the incomes between startdate and enddate
    // var incomes = getincomesbetweendatefilledwithcategories()
    // res.send(data)
    console.log(req.params)
    db.Incomes.getIncomeByUserAndDate(req.user.id, req.params.startdate, req.params.enddate, function(err, data){
        if(err){

        }
        else{
            console.log("start date is : " + req.params.startdate + " end date is: "+ req.params.enddate)
            res.send(req.params.startdate)
        }
        

    })
  })
  
router.get('/:year/:month/sum', function(req, res){
    // get category-wise sum of incomes in the provided date range
    console.log("Sum of amount in a category: " + req.params)
    db.Incomes.getCategoryWiseIncomeSumBetweenDates(req.user.id, req.params.year, req.params.month, function(err, data) {
        if(err){
            console.log(err)
        }
        else {
            console.log(data)
            res.send(data)
        }
    })
  })


module.exports = router