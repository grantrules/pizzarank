var mongoose = require('mongoose');
var slug = require('slug')

var ObjectId = mongoose.Schema.ObjectId;

var imageSchema = new mongoose.Schema({
    title: String,
    comment: String,
    date_added: { type: Date, default: Date.now },
    filename: String,
    user: { type: ObjectId },
});


var ratingSchema = new mongoose.Schema({
    title: String,
    rating: { type: Number, min: 1, max: 5 },
    body: String,
    updates: [new mongoose.Schema({
        body: String,
        date_added: { type: Date, default: Date.now },
        response: { type: Boolean, default: false },

    })],
    date_added: { type: Date, default: Date.now },
    images: [imageSchema],
    user: { type: ObjectId },
});

//module.exports = mongoose.model('Rating', ratingSchema);

var restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: String,

    owner: { type: ObjectId },
    
    // group together address, city, state and make sure they're unique.. street address alone isn't unique
    address: { 
        streetAddress: String,
        city: String,
        state: String,
        zipcode: String,
        neighborhood: String,
        borough: String,
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    location: {
        type: [Number],
        index: '2d'
    },
    phoneNumber: String,
    plainSlicePrice: Number,
    closed: {
        type: Boolean,
        default: false
    },
    ratings: [ratingSchema],
    images: [imageSchema],
    
    
});

restaurantSchema.pre('save', function(next){
    if (!this.slug) {
        // TODO need to search for existing slugs xxx, xxx-1, xxx-2
        this.slug = slug(this.name, {lower:true});
    }
    next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);



var ownerClaimScheme = new mongoose.Schema({
    user: { type: ObjectId },
    restaurant: { type: ObjectId, ref: 'Restaurant' },
    date_added: {
        type: Date,
        default: Date.now
    },
});