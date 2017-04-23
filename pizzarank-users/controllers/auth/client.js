var Client = require('../models/auth/client');

// POST /api/client
exports.postClients = function(req, res) {
  // Create a new instance of the Client model
  var client = new Client();

  // Set the client properties that came from the POST data
  client.name = req.body.name;
  client.id = req.body.id;
  client.hashed_secret = req.body.secret;
  client.hashed_userId = req.user._id;

  // Save the client and check for errors
  client.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Client added to the locker!', data: client });
  });
};

// GET /api/clients
exports.getClients = function(req, res) {
  // Use the Client model to find all clients
  Client.find({ userId: req.user._id }, function(err, clients) {
    if (err)
      res.send(err);

    res.json(clients);
  });
};
