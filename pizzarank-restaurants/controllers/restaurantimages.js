var Restaurant = require('../models/restaurant');
var config = require('../config');
var aws = require('aws-sdk');
var crypto = require('crypto');

// GET /api/restaurantimagesign/
exports.getRestaurantImageSign = function(req,res) {
    const s3 = new aws.S3();
    var fileName = crypto.createHash('sha256').update(new Date().getMilliseconds());
    var contentType = req.params.contentType;
    var s3params = {
        Bucket: config.S3_BUCKET,
        ContentType: contentType,
        Expires: 60,
        Key: fileName,
        ACL: "public-read",
    }
    
    s3.getSignedUrl('putObject', s3params, function(err,data) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        
        var url = "https://${config.S3_BUCKET}.s3.amazonaws.com/${fileName}"
        
        res.json({
            secret: crypto.createHash('sha256').update(url + "shabadoo" + config.secret)
            .digest('base64').toString(),
            signedRequest: data,
            fileName:  url
        });
        
    });
}

// PUT /api/restaurantimages/
exports.putRestaurantImages = function(req,res) {
    // maybe hash the filename with the secret key, client sends both after aws upload and we check against hash here
    if (req.params.hash != crypto.createHash('sha256').update(req.params.fileName + "shabadoo" + config.secret))
        return res.json('Error uploading file');
    
    // create image in mongo
}