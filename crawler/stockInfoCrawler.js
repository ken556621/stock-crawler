const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");


const getBrowserHtml = async () => {
    try {
        const res = await axios.get(`https://isin.twse.com.tw/isin/C_public.jsp?strMode=2`, {
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

const getStocksInfo = async () => {
    const targetPageHtml = await getBrowserHtml();

    if (!targetPageHtml) return "Your industry id is not found!"

    let $ = await cheerio.load(targetPageHtml.data);

    const nameList = [];
    const stockIdList = [];

    await $("body > table.h4 > tbody > tr:nth-child(3) > td:nth-child(1)").each((i, newData) => {
        nameList.push($(newData).text())
    });

    console.log(nameList, "nameList")

    return

    await $("td").each((i, newData) => {
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

module.exports = getStocksInfo;
