'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/company', require('./company'));
router.use('/review', require('./review'));
router.use('/docs', require('./docs'));
router.use('/csv', require('./csv'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
