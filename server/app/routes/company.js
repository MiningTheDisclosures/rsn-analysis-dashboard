'use strict'

var router = require('express').Router();
var mongoose = require('mongoose');
var Company = mongoose.model('Company');


// Fetch Company
router.param('id', function(req, res, next, id) {
  Company.findById(id).exec()
  .then(function(company) {
    if (!company) throw HttpError(404);
    else {
      req.company = company;
      next();
    }
  })
});

// Send back a company
router.get('/:id', function(req, res, next) {
  console.log("sending back the company")
  res.json(req.company);
});

// Get all companies
router.get('/', function(req, res, next) {
  Company.find().populate('reviews').exec()
  .then(function(companies) {
    console.log(companies);
    res.json(companies);
  });

});

router.post('/', function(req, res, next) {
  Company.create(req.body.company, function (err, newCompany) {
    console.log(newCompany);
    res.json(newCompany);
  });
});

router.put('/', function(req, res, next) {
  Company.update(req.body.company, function(err, updatedCompany) {
    res.json(updatedCompany);
  });
});

module.exports = router;