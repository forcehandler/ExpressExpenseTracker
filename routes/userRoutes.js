var express = require('express')
var router = express.Router()
var db = require('../db')

router.get('/', function(req, res){
    //Return list of all users view
    db.Users.getAllUsers(function(err, data){
        console.log(data)
        res.send(data)
    })
})

router.get('/:id', function(req, res){
    //Return user with particular id
    db.Users.getUserById(req.params.id, function(err, data){
        if(data.length == 0){
            res.send({errorString:"No such user with id: " + req.params.id + ' exists!'})
        }
        else {
            console.log(req.params.id)
            res.send(data[0])
        }
    }) 
})

router.post('/', function(req, res) {
    db.Users.insertUser(req.body.username, req.body.password, req.body.email, 0, function(err, data){
        console.log(data)
        if(err){
            console.log("Get the error: " + err)
            res.send({username:false})
        }
        else{  
            res.redirect('/login')
        }
       
    })
})

router.put('/:id', function(req, res) {
    // Update user profile
    db.Users.modifyUser(req.params.id, req.body.username, req.body.password, req.body.email, 0, function(err, data){
        if(err){
            res.send({errorString:"An error occured while updating profile!"})
        }
        else{
            console.log(data)
            res.send("Done")
        }
    })
})

router.delete('/:id', function(req, res) {
    // Delete the user with given id
    db.Users.deleteUser(req.params.id, function(err, data){
        console.log(data)
        res.send("Deleted user with id: " + req.params.id)
    })
})

module.exports = router