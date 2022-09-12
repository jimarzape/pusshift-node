var express = require('express');
var router = express.Router();
const fetch = require('isomorphic-fetch');
const redditController = require('../controllers/redditController')

router.post('/', function(req, res, next) {
    redditController.getSubmission(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
    // res.send('respond with a resources');
});

router.post('/favorite', function(req, res, next) {
    redditController.toggleFavorite(req.body)
    .then(result => res.send(result))
    .catch(err => next(err))
    // res.send('respond with a resources');
});


  module.exports = router;
