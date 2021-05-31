const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite")

const getBrowserHtml = async (stockId) => {
    try {
        const res = await axios.get(`https://tw.stock.yahoo.com/d/s/company_${stockId}.html`, {
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

const getCompanyInfo = async (postData) => {
    const stockId = postData;
    const targetPageHtml = await getBrowserHtml(stockId);

    if (!targetPageHtml) return "Your stack id is not found!"

    let $ = await cheerio.load(targetPageHtml.data);

    const result = []

    await $("body").each((i, newData) => {
        result.push($(newData).text())
    });

    return result
};

module.exports = getCompanyInfo;
