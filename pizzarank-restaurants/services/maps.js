config = require('../config.js');

module.exports = require('@google/maps').createClient({
//    Promise: require('q').Promise,
    key: config.googlemaps_api_key,
});