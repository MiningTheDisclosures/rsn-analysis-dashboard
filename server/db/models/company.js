'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  "name": String,
  "UID": String,
  "industry": String,
  "sector": String,
  "peer_group": String,
  "email": String,
  "cik": String,
  "sic": {
    "code": String,
    "description": String
  },
  "entity_id": String,
  "ticker": {
    "symbol": String,
    "exchange": String
  },
  "reviews": [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  "sec_filings": [{
    "year": Number,
    "url": String
  }]
});

mongoose.model('Company', schema);