const axios = require("axios");
const dayjs = require("dayjs");

const thisYear = dayjs().year();


const fetchYearlyPriceVolumn = async (stockId) => {
    const res = await axios.get(`https://www.twse.com.tw/exchangeReport/FMSRFK?response=json&date=${thisYear}0101&stockNo=${stockId}&_=1622522133562`);

    const formatedData = formatData(res.data.data);

    return formatedData;
};

const formatData = (data) => {
    return data.map(item => {
        return {
            month: item[1],
            highestPrice: item[2],
            lowestPrice: item[3],
            dealStock: Number(item[5].split(",").join("")) / 1000
        }
    })
};

module.exports = fetchYearlyPriceVolumn;