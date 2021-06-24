const axios = require("axios");


const fetchYearlyPriceVolumn = async (stockId) => {
    const res = await axios.get(`https://www.twse.com.tw/exchangeReport/FMNPTK?response=json&stockNo=${stockId}&_=1624497482443`);

    const formatedData = formatData(res.data.data);

    return formatedData;
};

const formatData = (data) => {
    return data.map(item => {
        return {
            year: item[0],
            dealStock: Number(item[1].split(",").join("")) / 1000,
            highestPrice: Number(item[4]),
            lowestPrice: Number(item[6]),
            averagePrice: Number(item[8])
        }
    })
};

module.exports = fetchYearlyPriceVolumn;