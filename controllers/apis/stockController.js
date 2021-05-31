const db = require("../../models")
const stockServices = require("../../services/stockServices")
const volumnRankCrawler = require("../../crawler/volumnRankCrawler");
const companyInfoCrawler = require("../../crawler/companyInfoCrawler");


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
    },
    getCompanyDetail: async (req, res) => {
        const result = await companyInfoCrawler();

        res.send(result)
    }
}

module.exports = stockController