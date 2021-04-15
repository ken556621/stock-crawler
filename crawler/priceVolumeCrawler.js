const cheerio = require("cheerio")
const targetURL = "https://goodinfo.tw/StockInfo/StockHisAnaMonth.asp?STOCK_ID=2330"

const puppeteer = require("puppeteer");

const getPriceVolume = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await page.goto(targetURL);
    await page.screenshot({ path: "stock.png" });
    await navigationPromise;

    //把網頁的body抓出來
    let body = await page.content()

    //接著我們把他丟給cheerio去處理
    let $ = await cheerio.load(body);

    const result = [];

    await $("tbody td").each((i, newData) => {
        result.push($(newData).text())
    });

    console.log(result)

    await browser.close();
}

module.exports = getPriceVolume;
