const cheerio = require("cheerio")
const dayjs = require("dayjs");

const puppeteer = require("puppeteer");

const stockService = require('../services/stockServices');

const getNews = async (stockId) => {
    const targetURL = `https://www.google.com/finance/quote/${stockId}:TPE?hl=zh-tw`
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(targetURL);
    await page.screenshot({ path: "stock.png" });

    await page.waitForSelector("section")

    let body = await page.content()

    let $ = await cheerio.load(body);

    const newsList = [];
    const title = [];
    const source = [];
    const beforeTime = [];

    await $("div.AoCdqe").each((i, newData) => {
        title.push($(newData).text())
    });

    await $("div.sfyJob").each((i, newData) => {
        source.push($(newData).text())
    });

    await $("div.Adak").each((i, newData) => {
        beforeTime.push($(newData).text())
    });

    const formattedData = formatData(title, source, beforeTime, stockId);

    formattedData.forEach(item => {
        stockService.setDailyNews(item);
    });

    await browser.close();

    return newsList
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

module.exports = getNews;