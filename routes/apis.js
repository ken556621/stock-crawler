const express = require('express')
const router = express.Router()

const newsController = require('../controllers/apis/newsController');


// News
router.get('/stock/news', newsController.getNews)


module.exports = router