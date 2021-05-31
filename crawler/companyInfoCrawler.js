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

    const industry = await $("table table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2)").text();
    const startDate = await $("table table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(2)").text();
    const listedDate = await $("table table:nth-child(1) > tbody > tr:nth-child(4) > td:nth-child(2)").text();
    const shareCapital = await $("table table:nth-child(1) > tbody > tr:nth-child(8) > td:nth-child(2)").text();
    const revenueProportion = await $("table table:nth-child(1) > tbody > tr:nth-child(11) > td:nth-child(2)").text();
    const factory = await $("table table:nth-child(1) > tbody > tr:nth-child(13) > td:nth-child(2)").text();

    const result = {
        industry,
        startDate,
        listedDate,
        shareCapital,
        revenueProportion,
        factory
    };

    return result
};

module.exports = getCompanyInfo;
