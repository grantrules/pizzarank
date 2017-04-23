mongoose = require('mongoose');
require('../models/user')();
var jwt = require('jsonwebtoken');
var config = require('../config');

var User = mongoose.model('User');

// POST /api/users
exports.postUsers = function(req,res) {
    var user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        hashed_password: User.hashPassword(req.body.password)
    }
    
    console.log(`registering user ${user.email}`);

    User.create(user, function(user, err) {
        if (err)
            res.send(err);
        else
            res.json({'user': user, 'token': jwt.sign(user,config.JWTsecret)}); 
    });
        
};

// GET /api/users
exports.getUsers = function(req,res) {
     User.find(function(err, users) {
        if (err)
            res.json(err);
        else
            res.json(users);
    });
};

// GET /api/user/:user_id
exports.getUser = function(req,res) {
    User.findById(req.params.user_id, function(err,user) {
        if (err)
            res.json(err);
        res.json(user);
    });

};

// GET /api/userreviews/:user_id
exports.getUserRatings = function(req,res) {
    // should ratings be duplicated in the user model?
    //Restaurant.find({'ratings.user': req.params.user_id});
}

// PUT /api/user/:user_id
exports.putUser = function(req,res) {
    User.findOneAndUpdate(req.params.user_id, {
        name: req.body.name,
        email: req.body.email,
        hashed_password: User.hashPassword(req.body.password),
        
 
    }, function(err, user) {
        if (err)
            res.json(err);
        res.json(user);
    });

};

// DELETE /api/user/:user_id
exports.deleteUser = function(req,res) {
    User.findOneAndRemove(req.params.user_id, function(err){
        if (err)
            res.json(err);
    });
    
};
