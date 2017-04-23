// i think setting these to env variables
// accessed with process.env makes the most
// sense

module.exports = {
    'port': process.env.PORT || 8092,
    'secret': 'bananaramalamwilliamvalderama',
    'mongodb': '127.0.0.1/pizzarank-checkin',
    'googlemaps_api_key': "AIzaSyBUPrJFr8AieVk3zJDVp1bbdUEmjSYNWao",
};