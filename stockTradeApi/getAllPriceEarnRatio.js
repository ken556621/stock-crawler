const axios = require("axios");
const dayjs = require("dayjs");
const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday)


const fetchAllPriceEarnRatio = async () => {
    const lastMondayMilliSec = dayjs().weekday(-2).startOf('d').valueOf();
    const res = await axios.get(`https://www.wantgoo.com/stock/all-per?tradedate=${lastMondayMilliSec}`, {
        header: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
        }
    });

    return res.data
};

module.exports = fetchAllPriceEarnRatio;