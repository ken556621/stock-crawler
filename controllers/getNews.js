const cheerio = require("cheerio")
const targetURL = "https://www.twse.com.tw/zh/page/trading/exchange/MI_INDEX20.html"
const dayjs = require("dayjs");

const puppeteer = require("puppeteer");

const getNews = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(targetURL);
    await page.screenshot({ path: "stock.png" });

    //先等待網頁載入到底下的section的html標籤，不然有時候執行太快抓不到網頁
    await page.waitForSelector("section")

    //把網頁的body抓出來
    let body = await page.content()

    //接著我們把他丟給cheerio去處理
    let $ = await cheerio.load(body);

    const tableHeader = await $("#report-table thead tr th").each((i, el) => {
        console.log($(el).text())
    });

    await browser.close();

    return "reerere"
}

module.exports = getNews;
