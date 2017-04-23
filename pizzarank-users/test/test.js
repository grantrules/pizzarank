var assert = require('assert');

mongoose = require('mongoose');
require('../models/user')();
var User = mongoose.model('User');



describe('User', function(){
    
    describe("getNameStub", function(){
        it('should return first name and last initial', function(){
            assert.equal("Billy W.",User({first_name:"Billy",last_name:"Walker"}).getNameStub())
        });
    });
    
    describe("hashPassword", function(){
        it('should return a password hashed with a specific secret', function() {
            assert.equal("B1+HtBYBMQ3h2BRWH0ERs+0N0h+gaBOclvqbU/B07xo=",User.hashPassword('password'));
            
        });
    })
})