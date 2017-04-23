var config = require('./config');
process.title = config.process_title

var express = require('express');
var bodyParser = require('body-parser');


var passport = require('passport');
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;


var userController = require('./controllers/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

// LOCAL LOGIN

app.use(passport.initialize());
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
    
        var User = mongoose.model('User');

        User.findOne({'email': email}, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    
    }
));

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

/*
var GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost/auth/google/return',
        realm: 'http://localhost/'
    },
    function(identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));
*/

var router = express.Router();


app.use('/api/users/', router);

// USERS
router.route('/users')
    .post(userController.postUsers)

    .get(passport.authenticate('jwt', {session:false}), userController.getUsers);

router.route('/user/:user_id')
    .get(userController.getUser)

    .put(userController.putUser)

    .delete(userController.deleteUser);

// LOGIN
router.route('/login')
    .post(passport.authenticate('local', {session: false}), function(req, res) {
        res.json({'user': req.user, 'token': jwt.sign(req.user,config.JWTsecret)});
    }
);

var server = app.listen(config.port);

process.on( 'SIGTERM', function () {
   server.close(function () {
       mongoose.disconnect();
       console.log(`${process.title} finished all requests, exiting gracefully`);
   });
});

console.log(`${process.title} running on ${config.port}`);