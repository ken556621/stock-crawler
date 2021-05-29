const db = require("../../models")
const stockServices = require("../../services/stockServices")
const volumnRankCrawler = require("../../crawler/volumnRankCrawler");

const stockController = {
    getInfo: (req, res) => {
        stockServices.getInfo(req, res, (data) => {
            res.json(data)
        })
    },
    getVolumeRank: (req, res) => {
        const result = volumnRankCrawler();

        res.send(result)
    }
}

module.exports = stockController