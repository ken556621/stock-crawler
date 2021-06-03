const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");

const getBrowserHtml = async (industrailId) => {
    try {
        const res = await axios.get(`https://www.cnyes.com/twstock/index2real.aspx?stockType=T&groupId=01&stitle=%e6%b0%b4%e6%b3%a5`, {
            responseType: "arraybuffer",
            transformResponse: [data => {
                return iconv.decode(Buffer.from(data), "big5")
            }]
        });
        return res
    } catch (error) {
        console.error(error);
    }
};

const getIndustrailStock = async (postData) => {
    const industrailId = postData;
    const targetPageHtml = await getBrowserHtml(industrailId);

    console.log(targetPageHtml)

    if (!targetPageHtml) return "Your industry id is not found!"

    let $ = await cheerio.load(targetPageHtml.data);

    const name = await $("div.Lh\\(20px\\).Fw\\(600\\).Fz\\(16px\\).Ell").text();
    const stockId = await $("div > div.D\\(f\\).Ai\\(c\\) > span").text();

    const result = {
        name,
        stockId
    };

    return result
};

module.exports = getIndustrailStock;
