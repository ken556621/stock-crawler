const axios = require("axios");
const dayjs = require("dayjs");


const fetchDailyPriceVolumn = async (stockId, startDate, endDate) => {
    // 都不帶 startDate 和 endDate 預設 dayjs 轉換成今天
    const milleStartDate = dayjs(startDate).unix();
    const milleEndDate = dayjs(endDate).unix();

    const res = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${stockId}.TW?formatted=true&crumb=d2CO0TFLG6e&lang=en-US&region=US&includeAdjustedClose=true&interval=1d&period1=${milleStartDate}&period2=${milleEndDate}&events=div%7Csplit&useYfid=true&corsDomain=finance.yahoo.com`);

    const formatedData = formatData(res.data.chart.result[0].timestamp, res.data.chart.result[0].indicators.adjclose[0].adjclose);

    return formatedData;
};

const formatData = (timeStamp, closePrice) => {
    return timeStamp.map((item, index) => {
        return {
            date: dayjs.unix(item).format("YYYY/MM/DD"),
            closePrice: Math.round(closePrice[index]) || 0
        }
    })
};

module.exports = fetchDailyPriceVolumn;