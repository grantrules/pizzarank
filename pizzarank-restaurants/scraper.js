var scrapeIt = require('scrape-it');
var Restaurant = require('./models/restaurant');

var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.mongodb);
var boro = 'Manhattan';
var pizzaurl = "https://www.yelp.com/search?find_desc=Pizza&find_loc=Manhattan%2C+New+York%2C+NY&start="

var urls = [];
var pizzas = [];
var num = 0;
var max = 20;

var urlnum = 0;

var doop = function(err,page) {
    
    
    
    
    if (page) {
        //console.log(page.urls);
        urls = urls.concat(page.urls);
    }

    if (num > max) {
        urls = urls.filter(onlyUnique);
        console.log(urls);

        blap();
        return;
    }
    scrapeIt(pizzaurl + new String(num*10), {
        urls: {
            listItem: ".indexed-biz-name",
            data: {
                url: {
                    selector: "a",
                    attr: "href"
                }
            }
        }
    },
             doop);

    num++;

}

var onlyUnique = function(value, index, self) { 
    return self.indexOf(value) === index;
}

var blap = function(err,page) {
    
    if (urlnum >= urls.length) {
        console.log(pizzas);
        return;
    }
    
    var url = urls[urlnum].url;
    
    if (page) {
        
        var r = new Restaurant();
        r.name = page.title;
        r.address = {
            streetAddress: page.streetaddress,
            city: page.city,
            state: page.state,
            zipcode: page.postalcode,
            borough: boro
        };
        r.phoneNumber = page.phone;
        r.save(function(err){
            if (err) {
                console.log(err);
            }
        });
        console.log('added '+page.title);
        //pizzas.push(page);
    }
    
    scrapeIt("http://www.yelp.com"+url, {
        streetaddress: "[itemprop='streetAddress']",
        city: "[itemprop='addressLocality']",
        state: "[itemprop='addressRegion']",
        postalcode: "[itemprop='postalCode']",

        title: ".biz-page-title",
        phone: ".biz-phone",
    }, blap);
    urlnum++;
}

doop();