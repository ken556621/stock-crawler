const db = require("../models");

const UserDb = db.User;

const userServices = {
    saveFavariteList: (req, res, callback) => {
        const {
            stockId
        } = req;

        UserDb.create({
            stockId
        })
    },
};

module.exports = userServices