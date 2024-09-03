const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');

router.use('/searchPOST', SiteController.searchPOST);
router.use('/search', SiteController.search);

router.use('/home', SiteController.index);
router.use('/', SiteController.index);

module.exports = router;
