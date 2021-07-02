const db = require("../../models")

const fetchTwIndex = require("../../economicApi/getTwIndex");



const economicController = {
    getTwIndex: async (req, res) => {
        const result = await fetchTwIndex();

        res.send(result)
    }
}

module.exports = economicController