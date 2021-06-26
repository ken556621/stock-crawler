const axios = require("axios");
const dayjs = require("dayjs");


const fetchDailyPriceVolumn = async (stockId) => {
    // 預設從 2000/9/28 ~ 2021/06/26
    const res = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${stockId}.TW?formatted=true&crumb=d2CO0TFLG6e&lang=en-US&region=US&includeAdjustedClose=true&interval=1d&period1=970099200&period2=1624665600&events=div%7Csplit&useYfid=true&corsDomain=finance.yahoo.com`);

    const formatedData = formatData(res.data.chart.result[0].timestamp, res.data.chart.result[0].indicators.adjclose[0].adjclose);

    return formatedData;
};

const formatData = (timeStamp, closePrice) => {
    return timeStamp.map((item, index) => {
        return {
            date: dayjs.unix(item).format("YYYY/MM/DD"),
            closePrice: closePrice[index] || 0
        }
    })
};

module.exports = fetchDailyPriceVolumn;