var express = require('express')
var router = express.Router()
var db = require('../db')
var loginEnsure = require('connect-ensure-login');


router.get('/', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Get all expenses of the user
    db.Expenses.getAllExpensesForUser(req.user.id, function(err, data) {
        if(err) {

        }
        else {
            console.log(data)
            db.Categories.getAllCategoriesofType('EXPENSE', function(err, categories){
                if(err) {

                }
                else {
                    res.render('expenses', {expenses: data,  categories: categories, user: req.user})
                }
            })
            
        }
    })
})

router.get('/:id', loginEnsure.ensureLoggedIn(), function(req, res){
    // Get details of a particular expense
    db.Expenses.getExpenseFromId(req.params.id, function(err, data) { 
        if(err) { 
            req.flash('error', 'No expense with given id found')
        }
        else {
            console.log(data)
            res.send(data)
        }
    })
})

router.post('/', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Add expense agains the currently logged in user
    db.Expenses.addExpense(req.user.id, req.body.description, req.body.amount, req.body.date, req.body.categoryID, function(err, data) {
        if(err) {
            res.send({errorString: "An error occured while adding the Expense"})
        }
        else {
            console.log(data)
            res.redirect('/expenses')
        }
    })
})

router.post('/modify', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Update a user expense
    console.log("Called post:", req.body)
    db.Expenses.updateExpenseById(req.body.id, req.user.id, req.body.description, req.body.amount, req.body.date, req.body.categoryID,
        function(err, data) {
            if(err) {
                res.send({errorString: "An error occurred while updating Expense"})
            }
            else {
                console.log(data)
                res.redirect('/expenses')
            }
        })
})

router.delete('/:id', loginEnsure.ensureLoggedIn(), function(req, res) {
    // Delete a particual expense
    db.Expenses.deleteExpenseById(req.params.id, function(err, data) {
        if(err){
            releaseEvents.send({errorString: "An error occurred while deleting expense"})
        }
        else {
            console.log(data)
            res.status(200).send("OK")
        }
    })
})


router.get('/:startdate/:enddate', loginEnsure.ensureLoggedIn(), function(req, res){
    console.log(req.params)
    db.Expenses.getExpenseByUserAndDate(req.user.id, req.params.startdate, req.params.enddate, function(err, data){
        if(err){

        }
        else{
            console.log("start date is : " + req.params.startdate + " end date is: "+ req.params.enddate)
            res.send(req.params.startdate)
        }
        

    })
    // get the expenses between startdate and enddate
    // var expenses = getexpensesbetweendatefilledwithcategories()
    // res.send(data)
  })
  
router.get('/:year/:month/sum', loginEnsure.ensureLoggedIn(), function(req, res){
    // get category-wise sum of expenses in the provided date range
    console.log("Sum of amount in a category: " + req.params)
    db.Expenses.getCategoryWiseExpenseSumBetweenDates(req.user.id, req.params.year, req.params.month, function(err, data) {
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