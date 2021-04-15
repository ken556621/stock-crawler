const cheerio = require("cheerio")

const puppeteer = require("puppeteer");

const stockService = require('../services/stockServices');

const getInfo = async (stockId) => {
    const targetURL = `https://tw.stock.yahoo.com/d/s/company_${stockId}.html`
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await page.goto(targetURL);
    await navigationPromise;

    await page.screenshot({ path: "stock.png" });

    let body = await page.content()

    let $ = await cheerio.load(body);

    const result = [];

    await $("tbody td").each((i, newData) => {
        result.push($(newData).text())
    });

    await browser.close();

    const formattedData = formatData(result, stockId);

    stockService.setStocksInfo(formattedData)
};

const formatData = (data, stockId) => {
    const targetValueList = ["董 事 長", "網　址", "成立時間", "產業類別", "營收比重", "工　廠", "現金股利", "股本(詳細說明)"];
    const dbKey = ["industory", "dividend", "startTime", "ceo", "equity", "rp", "website", "location"]

    const hash = {};
    let targetValueListIndex = 0;

    data.forEach((item, index) => {
        if (targetValueList.includes(item)) {
            hash.stockId = stockId
            hash[dbKey[targetValueListIndex]] = data[index + 1].trim()
            targetValueListIndex++
        }
    });

    return hash;
};

module.exports = getInfo;
