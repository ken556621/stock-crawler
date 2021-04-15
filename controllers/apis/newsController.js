const db = require('../../models')
const stockServices = require('../../services/stockServices')

const newsController = {
    getNews: (req, res) => {
        stockServices.getDailyNews(req, res, (data) => {
            res.json(data)
        })
    }
}

module.exports = newsController