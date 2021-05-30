const db = require("../../models")
const stockServices = require("../../services/stockServices")
const volumnRankCrawler = require("../../crawler/volumnRankCrawler");

const stockController = {
    getInfo: (req, res) => {
        stockServices.getInfo(req, res, (data) => {
            res.json(data)
        })
    },
    getVolumeRank: async (req, res) => {
        const result = await volumnRankCrawler();

        res.send(result)
    },
    getIndustryVolume: async (req, res) => {
        stockServices.getIndustryVolume(req, res, (data) => {
            res.json(data)
        })
    }
}

module.exports = stockController