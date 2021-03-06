const express = require('express'),
  router = express.Router(),
  multer = require('../middlewares/multer-config'),
  annCtrl = require('../controllers/annonce');
var RateLimit = require('express-rate-limit');
var MongoStore = require('rate-limit-mongo');

var limiter = new RateLimit({
  store: new MongoStore({
    uri: process.env.PNR_LIMIT_STORE,
    user: '',
    password: '',
    // should match windowMs
    expireTimeMs: 15 * 60 * 1000,
    errorHandler: console.error.bind(null, 'rate-limit-mongo')
    // see Configuration section for more options and details
  }),
  max: 50,
  // should match expireTimeMs
  windowMs: 15 * 60 * 1000
});

//  apply to all requests
//app.use(limiter);

router
  .get('/une/:id', annCtrl.getOne)
  .get('/voir/', annCtrl.getAll)
  .get('/accueil/', annCtrl.getAccueil)
  .post('/rechercher/', annCtrl.getRecherche)
  .post('/poster/',multer, annCtrl.postAnnonce)
  .post('/suppression/',limiter, annCtrl.delAnnonce);

module.exports = router;