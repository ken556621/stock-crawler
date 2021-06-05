const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");

const getBrowserHtml = async (industrailId) => {
    try {
        const res = await axios.get(`https://www.cnyes.com/twstock/index2real.aspx?stockType=T&groupId=01&stitle=%e6%b0%b4%e6%b3%a5`);

        return res
    } catch (error) {
        console.error(error);
    }
};

const getIndustrailStock = async (postData) => {
    const industrailId = postData;
    const targetPageHtml = await getBrowserHtml(industrailId);

    if (!targetPageHtml) return "Your industry id is not found!"

    let $ = await cheerio.load(targetPageHtml.data);

    const nameList = [];
    const stockIdList = [];

    await $("#form1 > div.mainboxs > div.mbx.screenBx > div > table > tbody > tr > td:nth-child(3) > a").each((i, newData) => {
        nameList.push($(newData).text())
    });

    await $("#form1 > div.mainboxs > div.mbx.screenBx > div > table > tbody > tr > td:nth-child(2) > a").each((i, newData) => {
        stockIdList.push($(newData).text())
    });

    const formatedResult = formatResponse(nameList, stockIdList)

    return formatedResult
};

const formatResponse = (nameList, stockIdList) => {
    return nameList.map((item, index) => {
        return {
            stockName: item,
            stockId: stockIdList[index]
        }
    })
};

module.exports = getIndustrailStock;
