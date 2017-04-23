var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');


var passport = require('passport');
var jwt = require('jsonwebtoken');

var Checkin = require('./checkin');
var controller = require('./controller');



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
        secretOrKey: config.secret
    },
    function(jwt_payload, done) {
        done(null, jwt_payload);
    }
));


var router = express.Router();


app.use('/api', router);

router.route('/checkins')
    .post(passport.authenticate('jwt', {session:false}), controller.postCheckins)

    .get(controller.getCheckins);
/*
router.route('/checkins/:checkin_id')
    .get(controller.getCheckin)

    .put(controller.putCheckin)

    .delete(controller.deleteCheckin);
*/
app.listen(config.port);

console.log('pizzarank-checkin running on ' + config.port);