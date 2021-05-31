const db = require("../../models")
const userServices = require("../../services/userServices")

const stockController = {
    saveFavariteList: (req, res) => {
        // userServices.getInfo(req, res, (data) => {
        //     res.json("data")
        // })
        res.json("data")
    }
}

module.exports = stockController