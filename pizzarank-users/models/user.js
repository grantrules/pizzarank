var mongoose = require('mongoose');
var crypto = require('crypto');
var config = require('../config');

module.exports = function() {
    var userSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        email: {
            type: String,
            required: true,
            index: {
              unique: true,
              sparse: true
            }
        },
        hashed_password: String,
        role: String,
        date_added: Date,    
    });
    

    userSchema.statics.hashPassword = function(password,callback) {
        hash = crypto.createHash('sha256').update(password + config.secret)
            .digest('base64').toString();
        //if callback
        //    callback(hash);
        return hash;

    }
    
    userSchema.methods.getNameStub = function() {
        return `${this.first_name} ${this.last_name.charAt(0)}.`;
    }

    
    userSchema.methods.validatePassword = function(password) {
        return this.hashed_password == userSchema.statics.hashPassword(password);
    }
    
    userSchema.statics.ROLES = {
        user: "user",
        admin: "admin",
        superuser: "superuser",
        deactivated: "deactivated",
    };
    mongoose.model('User', userSchema);
}