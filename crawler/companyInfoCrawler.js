const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite")

const getBrowserHtml = async () => {
    try {
        const res = await axios.get("https://tw.stock.yahoo.com/d/s/company_3481.html", {
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

const getCompanyInfo = async () => {
    const targetPageHtml = await getBrowserHtml();

    let $ = await cheerio.load(targetPageHtml.data);

    const result = []

    await $("body").each((i, newData) => {
        result.push($(newData).text())
    });

    // console.log(axios)

    console.log(result)
};

module.exports = getCompanyInfo;
