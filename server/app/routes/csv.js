'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var Company = mongoose.model('Company');
var Review = mongoose.model('Review');
var json2csv = require('json2csv');

// Fields for CSV across Review Years
var fieldsForYears = ['year','company.name','company.industry','company.sector','company.peer_group','evaluation.MA1_1A_1','evaluation.MA1_1A_2','evaluation.MA1_1A_3','evaluation.MA1_1A_4','evaluation.MA1_1B_1','evaluation.MA1_1B_2','evaluation.MA1_2_1','evaluation.MA1_2_2','evaluation.MA1_2_3','evaluation.MA2_3_1','evaluation.MA2_3_2','evaluation.MA2_3_3','evaluation.MA2_3_4','evaluation.MA2_3_5','evaluation.MA3_4_1','evaluation.MA3_4_2','evaluation.MA2_5_1','evaluation.MA2_5_2','evaluation.MA2_5_3','evaluation.MA2_5_4','evaluation.MA2_5_5','evaluation.MA2_5_6','evaluation.MA2_6_1','evaluation.MA2_6_2','evaluation.MA2_6_3','evaluation.MA3_7_1','evaluation.MA3_7_2','evaluation.MA3_7_3','evaluation.MA3_7_4','evaluation.MA3_7_5','evaluation.MA3_7_6','evaluation.MA3_8_1','evaluation.MA3_8_2','evaluation.MA3_8_3','evaluation.MA3_8_4','evaluation.MA3_8_5','evaluation.MA3_8_6','evaluation.MA4_9_2','evaluation.MA4_9_1','evaluation.MA4_9_4','evaluation.MA4_10_1','evaluation.MA4_10_2','evaluation.MA4_10_3','evaluation.MA4_11_1','evaluation.MA4_11_2','evaluation.MA4_11_3','evaluation.MA4_12_1','evaluation.MA4_12_2','evaluation.MA4_12_3','evaluation.MA4_12_4','evaluation.MA4_12_5','evaluation.MA4_13_1','evaluation.MA4_13_2','evaluation.MA4_14_1','evaluation.MA4_14_2','evaluation.MA4_15_1','evaluation.MA4_15_2','evaluation.MA4_15_3','evaluation.MA4_15_4','evaluation.MA4_15_5','evaluation.MA5_16_1','evaluation.MA5_16_2','evaluation.MA5_17_1','evaluation.MA5_17_2','evaluation.MA5_17_3','evaluation.MA5_17_4','evaluation.MA5_17_5_XX','evaluation.MA5_17_6_XX','evaluation.MA5_17_7_XX','evaluation.MA5_18_1','evaluation.MA5_18_2','evaluation.MA5_19_6','evaluation.MA5_19_3','evaluation.MA5_19_4','evaluation.MA5_19_5','evaluation.MA5_19_2','evaluation.MA5_19_1','evaluation.MA5_20_1','evaluation.MA5_20_2']
var fieldsForYearsNames = ['Year','Company','Industry','Sector','Peer Group','MA1_1A_1','MA1_1A_2','MA1_1A_3','MA1_1A_4','MA1_1B_1','MA1_1B_2','MA1_2_1','MA1_2_2','MA1_2_3','MA2_3_1','MA2_3_2','MA2_3_3','MA2_3_4','MA2_3_5','MA3_4_1','MA3_4_2','MA2_5_1','MA2_5_2','MA2_5_3','MA2_5_4','MA2_5_5','MA2_5_6','MA2_6_1','MA2_6_2','MA2_6_3','MA3_7_1','MA3_7_2','MA3_7_3','MA3_7_4','MA3_7_5','MA3_7_6','MA3_8_1','MA3_8_2','MA3_8_3','MA3_8_4','MA3_8_5','MA3_8_6','MA4_9_2','MA4_9_1','MA4_9_4','MA4_10_1','MA4_10_2','MA4_10_3','MA4_11_1','MA4_11_2','MA4_11_3','MA4_12_1','MA4_12_2','MA4_12_3','MA4_12_4','MA4_12_5','MA4_13_1','MA4_13_2','MA4_14_1','MA4_14_2','MA4_15_1','MA4_15_2','MA4_15_3','MA4_15_4','MA4_15_5','MA5_16_1','MA5_16_2','MA5_17_1','MA5_17_2','MA5_17_3','MA5_17_4','MA5_17_5_XX','MA5_17_6_XX','MA5_17_7_XX','MA5_18_1','MA5_18_2','MA5_19_6','MA5_19_3','MA5_19_4','MA5_19_5','MA5_19_2','MA5_19_1','MA5_20_1','MA5_20_2']

router.get('/year/:year', function(req, res, next) {
  Review.find({year: req.params.year}).populate('company').exec()
    .then(function(reviews) {
      json2csv({ data: reviews, fields: fieldsForYears, fieldNames: fieldsForYearsNames, quotes: '' }, function(err, csv) {
        res.send(csv);
      });
    }, function(err) {
      res.send(err);
    });
});

// Fields for CSV across a Company
var fieldsForCompany = ['year','company.name','company.industry','company.sector','company.peer_group','evaluation.MA1_1A_1','evaluation.MA1_1A_2','evaluation.MA1_1A_3','evaluation.MA1_1A_4','evaluation.MA1_1B_1','evaluation.MA1_1B_2','evaluation.MA1_2_1','evaluation.MA1_2_2','evaluation.MA1_2_3','evaluation.MA2_3_1','evaluation.MA2_3_2','evaluation.MA2_3_3','evaluation.MA2_3_4','evaluation.MA2_3_5','evaluation.MA3_4_1','evaluation.MA3_4_2','evaluation.MA2_5_1','evaluation.MA2_5_2','evaluation.MA2_5_3','evaluation.MA2_5_4','evaluation.MA2_5_5','evaluation.MA2_5_6','evaluation.MA2_6_1','evaluation.MA2_6_2','evaluation.MA2_6_3','evaluation.MA3_7_1','evaluation.MA3_7_2','evaluation.MA3_7_3','evaluation.MA3_7_4','evaluation.MA3_7_5','evaluation.MA3_7_6','evaluation.MA3_8_1','evaluation.MA3_8_2','evaluation.MA3_8_3','evaluation.MA3_8_4','evaluation.MA3_8_5','evaluation.MA3_8_6','evaluation.MA4_9_2','evaluation.MA4_9_1','evaluation.MA4_9_4','evaluation.MA4_10_1','evaluation.MA4_10_2','evaluation.MA4_10_3','evaluation.MA4_11_1','evaluation.MA4_11_2','evaluation.MA4_11_3','evaluation.MA4_12_1','evaluation.MA4_12_2','evaluation.MA4_12_3','evaluation.MA4_12_4','evaluation.MA4_12_5','evaluation.MA4_13_1','evaluation.MA4_13_2','evaluation.MA4_14_1','evaluation.MA4_14_2','evaluation.MA4_15_1','evaluation.MA4_15_2','evaluation.MA4_15_3','evaluation.MA4_15_4','evaluation.MA4_15_5','evaluation.MA5_16_1','evaluation.MA5_16_2','evaluation.MA5_17_1','evaluation.MA5_17_2','evaluation.MA5_17_3','evaluation.MA5_17_4','evaluation.MA5_17_5_XX','evaluation.MA5_17_6_XX','evaluation.MA5_17_7_XX','evaluation.MA5_18_1','evaluation.MA5_18_2','evaluation.MA5_19_6','evaluation.MA5_19_3','evaluation.MA5_19_4','evaluation.MA5_19_5','evaluation.MA5_19_2','evaluation.MA5_19_1','evaluation.MA5_20_1','evaluation.MA5_20_2']
var fieldsForCompanyNames = ['Year','Company','Industry','Sector','Peer Group','MA1_1A_1','MA1_1A_2','MA1_1A_3','MA1_1A_4','MA1_1B_1','MA1_1B_2','MA1_2_1','MA1_2_2','MA1_2_3','MA2_3_1','MA2_3_2','MA2_3_3','MA2_3_4','MA2_3_5','MA3_4_1','MA3_4_2','MA2_5_1','MA2_5_2','MA2_5_3','MA2_5_4','MA2_5_5','MA2_5_6','MA2_6_1','MA2_6_2','MA2_6_3','MA3_7_1','MA3_7_2','MA3_7_3','MA3_7_4','MA3_7_5','MA3_7_6','MA3_8_1','MA3_8_2','MA3_8_3','MA3_8_4','MA3_8_5','MA3_8_6','MA4_9_2','MA4_9_1','MA4_9_4','MA4_10_1','MA4_10_2','MA4_10_3','MA4_11_1','MA4_11_2','MA4_11_3','MA4_12_1','MA4_12_2','MA4_12_3','MA4_12_4','MA4_12_5','MA4_13_1','MA4_13_2','MA4_14_1','MA4_14_2','MA4_15_1','MA4_15_2','MA4_15_3','MA4_15_4','MA4_15_5','MA5_16_1','MA5_16_2','MA5_17_1','MA5_17_2','MA5_17_3','MA5_17_4','MA5_17_5_XX','MA5_17_6_XX','MA5_17_7_XX','MA5_18_1','MA5_18_2','MA5_19_6','MA5_19_3','MA5_19_4','MA5_19_5','MA5_19_2','MA5_19_1','MA5_20_1','MA5_20_2']

router.get('/company/:id', function(req, res, next) {
  Review.find({ company: req.params.id}).populate('company').exec()
    .then(function(reviews) {
      json2csv({ data: reviews, fields: fieldsForCompany, fieldNames: fieldsForCompanyNames, quotes: '' }, function(err, csv) {
        res.send(csv);
      });
    }, function(err){
      res.send(err);
    });
})

module.exports = router;
