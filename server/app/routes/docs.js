'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var Review = mongoose.model('Review');

router.post('/', function (req, res, next) {

  // Get Company from CIK
  Company.findById(req.body.id).exec()
    .then(function(foundCompany){

      // Add SEC Filings
      var filings = [];
      Object.keys(req.body.sec_filings).forEach(function(key){
        filings.push({
          url: req.body.sec_filings[key].url,
          year: req.body.sec_filings[key].year
        });
      })
      foundCompany.sec_filings = filings;
      foundCompany.save();

      // Updating Reviews
      Review.findOne({ company: req.body.id, year: req.body.year }).exec()
        .then(function(foundReview) {
          // If review does not exist, add!
          if (!foundReview) {
            Review.create({
              company: foundCompany._id,
              supporting_documents: req.body.docs,
              year: req.body.year
            }, function(err, createdReview) {
              // After creating review, save the ID in the company's reviews array
              foundCompany.reviews.push(createdReview._id);
              foundCompany.save();
              res.send(createdReview);
            });
          } else {
            foundReview.update({
              company: foundCompany.cik,
              supporting_documents: req.body.docs
            }, function(err, updatedReview) {
              res.send(updatedReview);
            });
          }

        });

    });
});

module.exports = router;
