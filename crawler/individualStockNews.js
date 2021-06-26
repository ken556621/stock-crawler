const cheerio = require("cheerio");

const puppeteer = require("puppeteer");

const getIndividualStockNews = async (stockId) => {
    const targetURL = `https://tw.stock.yahoo.com/q/h?s=${stockId}`
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await page.goto(targetURL);
    await navigationPromise;

    let body = await page.content()

    let $ = await cheerio.load(body);

    const title = [];

    await $("body > center > table:nth-child(11) > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a").each((i, newData) => {
        title.push($(newData).text())
    });

    console.log(title, "title")
};

const formatData = (titleArr, sourceArr, timeArr, stockId) => {
    return titleArr.map((item, index) => {
        return {
            stockId,
            title: item,
            source: sourceArr[index],
            beforeTime: timeArr[index]
        }
    })
};

module.exports = getIndividualStockNews;
