const axios = require("axios");
const dayjs = require("dayjs");
const stockServices = require("../services/stockServices");

const today = dayjs().format("YYYYMMDD")

const testDate = "20210528"


const fetchIndustryVolumn = async () => {
    const res = await axios.get(`https://www.twse.com.tw/exchangeReport/BFIAMU?response=json&date=${today}`);

    if (res.data.stat.includes("沒有")) {
        return
    }

    const formatedData = formatData(res.data.data);

    return formatedData
};

const formatData = (data) => {
    return data.map(industry => {
        return {
            name: industry[0].trim(),
            tradingVolume: industry[1],
            percentage: industry[4],
            dataSourceDate: today
        }
    })
};

module.exports = fetchIndustryVolumn;