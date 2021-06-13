const db = require("../../models")
const stockServices = require("../../services/stockServices");

const volumnRankCrawler = require("../../crawler/volumnRankCrawler");
const companyInfoCrawler = require("../../crawler/companyInfoCrawler");
const industryListCrawler = require("../../crawler/industrialStockCrawler");

const fetchYearlyPriceVolumn = require("../../stockTradeApi/getYearlyPriceVolumn");
const fetchAllGrossMargin = require("../../stockTradeApi/getAllGrossMargin");
const fetchAllPriceEarnRatio = require("../../stockTradeApi/getAllPriceEarnRatio");
const fetchIndustryVolumn = require("../../stockTradeApi/getIndustryVolumn");



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
    getIndustryList: async (req, res) => {
        if (!req.body) {
            res.status(500).send("Industry id is required.");
            return
        }
        if (!req.body.industryId) {
            res.status(500).send("Industry id is required.");
            return
        }
        const result = await industryListCrawler(req.body.industryId);

        res.send(result)
    },
    getIndustryVolume: async (req, res) => {
        const result = await fetchIndustryVolumn();

        res.send({
            data: result
        })
    },
    getCompanyDetail: async (req, res) => {
        if (!req.body) {
            res.status(500).send("Stock id is required.");
            return
        }
        if (!req.body.stockId) {
            res.status(500).send("Stock id is required.");
            return
        }
        const result = await companyInfoCrawler(req.body.stockId);

        res.send({
            data: result
        })
    },
    getYearlyPriceAndVolumn: async (req, res) => {
        if (!req.body) {
            res.status(500).send("Stock id is required.");
            return
        }
        if (!req.body.stockId) {
            res.status(500).send("Stock id is required.");
            return
        }

        const result = await fetchYearlyPriceVolumn(req.body.stockId);

        res.send({
            data: result
        })
    },
    getAllGrossMargin: async (req, res) => {
        const result = await fetchAllGrossMargin();

        res.send({
            data: result
        })
    },
    getAllPriceEarnRatio: async (req, res) => {
        const result = await fetchAllPriceEarnRatio();

        res.send({
            data: result
        })
    }
}

module.exports = stockController