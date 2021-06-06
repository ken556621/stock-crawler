const cheerio = require("cheerio");
const axios = require("axios");

const getBrowserHtml = async (industryId) => {
    try {
        const res = await axios.get(`https://www.cnyes.com/twstock/index2real.aspx?stockType=T&groupId=${industryId}&stitle=%E6%B0%B4%E6%B3%A5`);

        return res
    } catch (error) {
        console.error(error);
    }
};

const getIndustrailStock = async (postData) => {
    const industryId = postData;
    const targetPageHtml = await getBrowserHtml(industryId);

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
