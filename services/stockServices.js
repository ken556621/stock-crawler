const db = require("../models");
const stockDb = db.Stock;

const stockServices = {
    setStocks: (req, res, callback) => {
        stockDb.create({
            stockId: "00000",
            name: "test",
            industory: "test Industory"
        })
    }
}

module.exports = stockServices