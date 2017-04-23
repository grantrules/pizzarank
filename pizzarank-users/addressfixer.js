var Restaurant = require('./models/restaurant');

var config = require('./config');
var mongoose = require('mongoose');
var http = require('http');
mongoose.connect(config.mongodb);

var url = "maps.googleapis.com"

var restaurants = [];
var inc = 0;

Restaurant.find({}).exec(function(err, rests) {
    restaurants = rests;
    
    fix();
    
});

var fix  = function() {
    var r = restaurants[inc++];
        var address = encodeURI(`${r.address.streetAddress}, ${r.address.city}, ${r.address.state} ${r.address.zipcode}`);
        
        var options = {
          host: url,
          path: `/maps/api/geocode/json?address=${address}`,
        };
        
        console.log(address);

        http.get(options, function(res) {
            var body = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {console.log('a');
              body += chunk;     
          });
            res.on('end', function(){
                var j = JSON.parse(body);
              
                console.log('woop');
                if (j.results[0]) {
                    console.log('got results');
                  var a = j.results[0].address_components;
                    var res = {};
                    
                    var types = new Set(["street_number","route","locality","sublocality","neighborhood","administrative_area_level_2","administrative_area_level_1","postal_code"]);
                    for (var b of a) {
                        var c = [...b.types].filter(x => types.has(x));
                        if (c.length > 0) {
                            res[c[0]] = b.short_name;
                        }
                    }
                  
                    
                                      
                    r.address.streetAddress = `${res.street_number} ${res.route}`;
                    r.address.city = res.locality ? res.locality : res.sublocality;
                    r.address.neighborhood = res.neighborhood;
                    r.address.state = res.administrative_area_level_1;
                    r.address.zipcode = res.postal_code;
                    r.address.borough = res.sublocality;
                    console.log(r);
                    
                    r.location = [j.results[0].geometry.location.lng,j.results[0].geometry.location.lat];
                    r.save();
                    
                    
                    
        } else { console.log('no results');}
                if (inc < restaurants.length - 1) {
                    setTimeout(fix,1000);
                }
        
        
        
            });
        });
}