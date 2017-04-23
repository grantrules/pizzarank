var config = require('./config');
process.title = config.process_title;

var express = require('express');
var bodyParser = require('body-parser');


var passport = require('passport');
var jwt = require('jsonwebtoken');

var Restaurant = require('./models/restaurant');
var restaurantController = require('./controllers/restaurants');
var restaurantImageController = require('./controllers/restaurantimages');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

// LOCAL LOGIN

app.use(passport.initialize());

// JWT

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.JWTsecret
    },
    function(jwt_payload, done) {
        done(null, jwt_payload);
    }
));


var router = express.Router();

app.use('/api/restaurants/', router);

// RESTAURANTS
router.route('/restaurants')
    .post(restaurantController.postRestaurants)

    .get(restaurantController.getRestaurants);

router.route('/restaurantsearch')
    .get(restaurantController.getRestaurantSearch);

router.route('/restaurants/nearby')
    .get(restaurantController.getRestaurantsNearby);

router.route('/restaurants/:restaurant_id')
    .get(restaurantController.getRestaurant) // RESTAURANT_SLUG

    .put(restaurantController.putRestaurant)

    .delete(restaurantController.deleteRestaurant);

router.route('/ratings/:restaurant_id')
    .post(passport.authenticate('jwt', {session:false}), restaurantController.postRatings);

// RESTAURANT IMAGES
router.route('/restaurantimagesign')
    .get(passport.authenticate('jwt', {session:false}), restaurantImageController.getRestaurantImageSign);

router.route('/restaurantimages')
    .put(passport.authenticate('jwt', {session:false}), restaurantImageController.putRestaurantImages);


var server = app.listen(config.port);

process.on( 'SIGTERM', function () {
   server.close(function () {
       mongoose.disconnect();
       console.log(`${process.title} finished all requests, exiting gracefully`);
   });
});

console.log(`${process.title} running on ${config.port}`);