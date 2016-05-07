'use strict';

var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var Review = mongoose.model('Review');

router.param('id', function(req, res, next, id) {
  Review.findById(id).populate('company').exec()
  .then(function(review) {
    if (!review) throw HttpError(404);
    else {
      req.review = review;
      next();
    }
  })
});

router.get('/:id', function(req, res, next) {
  res.json(req.review);
});

router.post('/', function(req, res, next) {
  Company.findById(req.body.company).exec()
    .then(function(foundCompany) {
      Review.create({ 'company': req.body.company, 'year': req.body.year}, function (err, newReview) {
        foundCompany.reviews.push(newReview);
        foundCompany.save();
        res.json(newReview);
      });
    });
});

router.post('/import', function(req, res, next) {
  var dataPath = path.join(__dirname, '../../..', 'data', 'data.json');
  fs.readFile(dataPath, function(err, data) {
    var parsedData = JSON.parse(data);
    parsedData.forEach(function(row) {
      // Create Company
      Company.create({
        UID: row.UID,
        name: row.CompanyName,
        MTD14_Pilot: row.MTD14_Pilot,
        industry: row.Industry,
        sector: row.Sector,
        peer_group: row['Peer Group'],
        entity_id: row.entityid,
        cik: row.cik,
        sic: {
          code: row.siccode,
          description: row.sicdescription
        },
        ticker: {
          symbol: row.primarysymbol,
          exchange: row.primaryexchange
        }
      }, function(err, createdCompany) {
        // Push Filings into Created Company
        if (row.SD_url_2016) {
          createdCompany.sec_filings.push({
            year: 2015,
            url: row.SD_url_2015
          });
        }
        if (row.SD_url_2015) {
          createdCompany.sec_filings.push({
            year: 2015,
            url: row.SD_url_2015
          });
        }
        if (row.SD_url_2014) {
          createdCompany.sec_filings.push({
            year: 2014,
            url: row.SD_url_2014
          });
        }
        // Create Review
        Review.create({
          year: 2015,
          company: createdCompany._id,
          evaluation: {
            "MA1_1A_1": row["MA1_1A_1"],
            "MA1_1A_2": row["MA1_1A_2"],
            "MA1_1A_3": row["MA1_1A_3"],
            "MA1_1A_4": row["MA1_1A_4"],
            "MA1_1B_1": row["MA1_1B_1"],
            "MA1_1B_2": row["MA1_1B_2"],
            "MA1_2_1": row["MA1_2_1"],
            "MA1_2_2": row["MA1_2_2"],
            "MA1_2_3": row["MA1_2_3"],
            "MA2_3_1": row["MA2_3_1"],
            "MA2_3_2": row["MA2_3_2"],
            "MA2_3_3": row["MA2_3_3"],
            "MA2_3_4": row["MA2_3_4"],
            "MA2_3_5": row["MA2_3_5"],
            "MA3_4_1": row["MA3_4_1"],
            "MA3_4_2": row["MA3_4_2"],
            "MA2_5_1": row["MA2_5_1"],
            "MA2_5_2": row["MA2_5_2"],
            "MA2_5_3": row["MA2_5_3"],
            "MA2_5_4": row["MA2_5_4"],
            "MA2_5_5": row["MA2_5_5"],
            "MA2_5_6": row["MA2_5_6"],
            "MA2_6_1": row["MA2_6_1"],
            "MA2_6_2": row["MA2_6_2"],
            "MA2_6_3": row["MA2_6_3"],
            "MA3_7_1": row["MA3_7_1"],
            "MA3_7_2": row["MA3_7_2"],
            "MA3_7_3": row["MA3_7_3"],
            "MA3_7_4": row["MA3_7_4"],
            "MA3_7_5": row["MA3_7_5"],
            "MA3_7_6": row["MA3_7_6"],
            "MA3_8_1": row["MA3_8_1"],
            "MA3_8_2": row["MA3_8_2"],
            "MA3_8_3": row["MA3_8_3"],
            "MA3_8_4": row["MA3_8_4"],
            "MA3_8_5": row["MA3_8_5"],
            "MA3_8_6": row["MA3_8_6"],
            "MA4_9_2": row["MA4_9_2"],
            "MA4_9_1": row["MA4_9_1"],
            "MA4_9_4": row["MA4_9_4"],
            "MA4_10_1": row["MA4_10_1"],
            "MA4_10_2": row["MA4_10_2"],
            "MA4_10_3": row["MA4_10_3"],
            "MA4_11_1": row["MA4_11_1"],
            "MA4_11_2": row["MA4_11_2"],
            "MA4_11_3": row["MA4_11_3"],
            "MA4_12_1": row["MA4_12_1"],
            "MA4_12_2": row["MA4_12_2"],
            "MA4_12_3": row["MA4_12_3"],
            "MA4_12_4": row["MA4_12_4"],
            "MA4_12_5": row["MA4_12_5"],
            "MA4_13_1": row["MA4_13_1"],
            "MA4_13_2": row["MA4_13_2"],
            "MA4_14_1": row["MA4_14_1"],
            "MA4_14_2": row["MA4_14_2"],
            "MA4_15_1": row["MA4_15_1"],
            "MA4_15_2": row["MA4_15_2"],
            "MA4_15_3": row["MA4_15_3"],
            "MA4_15_4": row["MA4_15_4"],
            "MA4_15_5": row["MA4_15_5"],
            "MA5_16_1": row["MA5_16_1"],
            "MA5_16_2": row["MA5_16_2"],
            "MA5_17_1": row["MA5_17_1"],
            "MA5_17_2": row["MA5_17_2"],
            "MA5_17_3": row["MA5_17_3"],
            "MA5_17_4": row["MA5_17_4"],
            "MA5_17_5_XX": row["MA5_17_5_XX"],
            "MA5_17_6_XX": row["MA5_17_6_XX"],
            "MA5_17_7_XX": row["MA5_17_7_XX"],
            "MA5_18_1": row["MA5_18_1"],
            "MA5_18_2": row["MA5_18_2"],
            "MA5_19_6": row["MA5_19_6"],
            "MA5_19_3": row["MA5_19_3"],
            "MA5_19_4": row["MA5_19_4"],
            "MA5_19_5": row["MA5_19_5"],
            "MA5_19_2": row["MA5_19_2"],
            "MA5_19_1": row["MA5_19_1"],
            "MA5_20_1": row["MA5_20_1"],
            "MA5_20_2": row["MA5_20_2"]
          }
        }, function(err, createdReview) {
          // console.log(err);
          // console.log(createdReview);
          // Push Supporting Documents into Review
          // createdReview.supporting_documents.push({
          //   type: "SD",
          //   url: row.SD_url_2014
          // });
          // createdReview.supporting_documents.push({
          //   type: "SD",
          //   url: row.SD_url_2014
          // });
          // Push Review into Company
          createdCompany.reviews.push(createdReview);
          // Save All
          createdCompany.save();
        });
      });
    });
    res.send(data);
  });
});

router.post('/import-supporting-docs', function(req, res, next) {

  var dataPath = path.join(__dirname, '../../..', 'data', 'docs-data.json');
  var regex = /^(\d{4})/;

  fs.readFile(dataPath, function(err, data) {

    var parsedData = JSON.parse(data);
    parsedData.forEach(function(row) {
      Company.findOne({ cik: row.ret_cik }).populate('reviews').exec(function(err, foundCompany) {
        if (foundCompany && foundCompany.reviews) {
          for (var i = 0; i < foundCompany.reviews.length; i++ ) {
            if (regex.exec(row.ret_filing_date)[0] == foundCompany.reviews[i].year) {
              // row should be the supporting doc we want to insert into the review
              Review.findById(foundCompany.reviews[i]._id, function(err, foundReview) {
                // console.log(foundReview);
                foundReview.supporting_documents.push({
                  title: row.ret_title,
                  description: row.ret_description,
                  sec_accession_number: row.ret_sec_accession_number,
                  filing_date: row.ret_filing_date,
                  url: row.ret_url,
                  company_cik: row.ret_cik
                });
                foundReview.save();
              })
            }
          }
        }
      })
    });

    res.json("Added")

  });

});

router.put('/updateEvaluation', function(req, res, next) {
  Review.findById(req.body.id, function(err, foundReview) {
    // console.log(review);
    foundReview.evaluation = req.body.evaluation;
    foundReview.save();
    res.json(foundReview);
  });
});

module.exports = router;
