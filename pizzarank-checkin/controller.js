var Checkin = require('./checkin');

// GET /api/checkin?user_id=,venue_id=,sort=

// POST /api/checkins
exports.postCheckins = function(req,res) {
    var checkin = new Checkin();
    checkin.user = req.body.user;
    checkin.venue = req.body.venue;
    checkin.note = req.body.note;
    checkin.public = req.body.public;
    checkin.location = req.body.location;
       

    checkin.save(function(err) {
        if (err)
            return res.send(err);
        res.json({ message: 'Checkin created!' });
    });
        
};



// GET /api/restaurants
/* PARAMS:
    user_id
    venue_id
    sort
    sortdir
    after
    limit
*/
exports.getCheckins = function(req,res) {
    
    var after = parseInt(req.query.after) || 0;
    var limit = parseInt(req.query.limit) || 15;

     Checkin.find({}).skip(after).limit(limit).exec(function(err, checkins) {
        if (err)
            return res.json(err);
        res.json(checkins);
    });
};

/*
// GET /api/restaurantsearch
// params: name
exports.getRestaurantSearch = function(req,res) {
    var name = req.query.name;
    Restaurant.find({name: new RegExp(name, "i")},
        function(err,restaurants) {
            if (err)
                return res.json(err);
            res.json(restaurants);
        });
}

// GET /api/restaurants/nearby
exports.getRestaurantsNearby = function(req,res) {
    var lat = req.query.lat;
    var long = req.query.long;
    
    Restaurant.find(
        {
            location: { $nearSphere: [long, lat], $maxDistance: 1 }
        },
        function(err,restaurants) {
            if (err)
                return res.json(err);
            res.json(restaurants);
        }
        
    );
}

// GET /api/restaurant/:restaurant_id <-- SLUG
exports.getRestaurant = function(req,res) {
    Restaurant.findOne({slug: req.params.restaurant_id}, function(err,restaurant) {
        if (err)
            return res.json(err);
        res.json(restaurant);
    });

};

// PUT /api/restaurant/:restaurant_id
exports.putRestaurant = function(req,res) {
    Restaurant.findOneAndUpdate(req.params.restaurant_id, {
        name: req.body.name,
        address: {
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            neighborhood: req.body.neighborhood,
            borough: req.body.borough,
        },
        location: {
            type: [req.body.long, req.body.lat]
        },
        phoneNumber: req.body.phoneNumber,
        plainSlicePrice: req.body.plainSlicePrice,
        closed: req.body.closed,
                
        
    }, function(err, restaurant) {
        if (err)
            return res.json(err);
        res.json(restaurant);
    });

};

// DELETE /api/restaurant/:restaurant_id
exports.deleteRestaurant = function(req,res) {
    Restaurant.findOneAndRemove(req.params.restaurant_id, function(err){
        if (err)
            return res.json(err);
    });
    
};

// POST /api/ratings/:restaurant_id
exports.postRatings = function(req,res) {
    Restaurant.findById(req.params.restaurant_id, function(err,restaurant){
        if (err)
            return res.json(err);
        
        var rating = {
            title: req.body.title,
            rating: req.body.rating,
            body: req.body.body,
            user: req.user._id
        };
        
        restaurant.ratings.push(rating);
        
        restaurant.save(function(err){
            if (err)
                return res.json(err);
            return res.json({ message: "Rating saved" });
        });
    });
}


*/