var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var checkinSchema = new mongoose.Schema({
    user: {
        stub: String,
        thumbnail: String,
        id: ObjectId,
    },
    venue: {
        id: ObjectId,
        name: String,
        slug: String,
        thumbnail: String,   
    },
    date_added: { type: Date, default: Date.now },
    note: String,
    public: { type: Boolean, default: true },
    location: {
        type: [Number],
        index: '2d'
    }
})

module.exports = mongoose.model('Checkin', checkinSchema);