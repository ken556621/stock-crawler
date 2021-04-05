const cheerio = require("cheerio")
const dayjs = require("dayjs");
const db = require("../models");
const stockDb = db.Stock;

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

    await $("#yDmH0d div.Tfehrf").each((i, newData) => {
        newsList.push($(newData).text())
    });

    stockService.setStocks();

    await browser.close();

    return newsList
}

module.exports = getNews;
