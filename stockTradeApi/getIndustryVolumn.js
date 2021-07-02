const axios = require("axios");
const dayjs = require("dayjs");

const testDate = "20210611"

// 排除六日股市沒有營業的日期，但未排除國定假日
const getWeekDay = () => {
    // Sunday
    if (dayjs().weekday() === 0) {
        return dayjs().weekday(-1).format("YYYYMMDD")
    }
    // Saterday
    else if (dayjs().weekday() === 6) {
        return dayjs().weekday(0).format("YYYYMMDD")
    }
    else {
        return dayjs().subtract(1, "day").format("YYYYMMDD")
    }
};

const weekday = getWeekDay();

const fetchIndustryVolumn = async () => {
    const res = await axios.get(`https://www.twse.com.tw/exchangeReport/BFIAMU?response=json&date=${weekday}`);

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
            dataSourceDate: testDate
        }
    })
};

module.exports = fetchIndustryVolumn;