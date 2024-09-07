const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');

router.post('/search', SiteController.searchPOST);
router.get('/search', SiteController.search);

router.get('/home', SiteController.index);
router.get('/', SiteController.index);

module.exports = router;
