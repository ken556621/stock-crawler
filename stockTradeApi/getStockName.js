const axios = require("axios");


const fetchStockName = async (stockId) => {
    const res = await axios.get(`https://tw.stock.yahoo.com/stock_ms/_td-stock/api/resource/AutocompleteService;query=${stockId}?bkt=&device=desktop&ecma=default&intl=tw&lang=zh-Hant-TW&partner=none&prid=undefined&region=TW&site=finance&tz=Asia%2FTaipei&ver=1.2.180&returnMeta=true`);

    return res.data.data.ResultSet.Result;
};

module.exports = fetchStockName;