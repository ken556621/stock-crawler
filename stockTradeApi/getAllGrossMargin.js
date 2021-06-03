const axios = require("axios");


const fetchAllGrossMargin = async () => {
    const res = await axios.get(`https://www.wantgoo.com/stock/all-profit-margin`);

    return res.data
};

module.exports = fetchAllGrossMargin;