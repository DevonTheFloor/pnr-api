const express = require('express'),
api = express(),
annRoutes = require('./routes/annonce'),
helmet = require('helmet'),
mongoose = require('mongoose');

mongoose.connect(process.env.PNR_DBS,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log(':D Local ConneXion to MDB!'))
  .catch(() => console.log('8X Connexion à MongoDB échouée !'));

api.disable('x-powered-by');

api.use(express.json());
api.use('/images/', express.static(__dirname + '/images'));
api.use('/', annRoutes);


module.exports = api;