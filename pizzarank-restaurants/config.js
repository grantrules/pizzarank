// i think setting these to env variables
// accessed with process.env makes the most
// sense

module.exports = {
    'port': process.env.PORT || 8090,
    'secret': 'bananaramalamwilliamvalderama',
    'mongodb': '127.0.0.1/pizzarank',
    'googlemaps_api_key': "AIzaSyBUPrJFr8AieVk3zJDVp1bbdUEmjSYNWao",
    'S3_BUCKET': 'pizzarank',
    'JWTsecret': 'whoputthebompinthebompdabompdabomp',
    'process_title': 'prRestaurants'
};