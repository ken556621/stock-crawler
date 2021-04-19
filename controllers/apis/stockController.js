const db = require("../../models")
const stockServices = require("../../services/stockServices")

const stockController = {
    getInfo: (req, res) => {
        stockServices.getInfo(req, res, (data) => {
            res.json(data)
        })
    }
}

module.exports = stockController