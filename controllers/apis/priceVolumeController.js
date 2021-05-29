const db = require("../../models")
const stockServices = require("../../services/stockServices")

const priceVolumeController = {
    getPriceVolume: (req, res) => {
        stockServices.getPriceVolume(req, res, (data) => {
            res.json(data)
        })
    }
}

module.exports = priceVolumeController