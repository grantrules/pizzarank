var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    hashed_secret: { type: String, required: true },
    hashed_userId: { type: String, required: true }
});

var hash = function(str, callback) {
    callback(sh1(str + config.secret));
}

module.exports = mongoose.model('Client', ClientSchema);