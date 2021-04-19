const db = require("../../models")
const userServices = require("../../services/userServices")

const stockController = {
    saveFavariteList: (req, res) => {
        // userServices.getInfo(req, res, (data) => {
        //     console.log(req, "Controller")
        //     res.json("data")
        // })
        console.log(req.body, "Controller")
        res.json("data")
    }
}

module.exports = stockController