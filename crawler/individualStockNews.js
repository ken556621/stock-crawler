const cheerio = require("cheerio");

const puppeteer = require("puppeteer");




const result = [];
let currentPage = 1;

const fetchAllPageStockNews = async (stockId, url) => {

    const targetURL = url || `https://tw.stock.yahoo.com/q/h?s=${stockId}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await page.goto(targetURL);
    await navigationPromise;

    let body = await page.content()

    let $ = await cheerio.load(body);

    const stoppingFlag = await $("body > center > table:nth-child(11) > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > a").text();

    if (!stoppingFlag) {
        return
    }

    const title = [];
    const dataSource = [];

    await $("body > center > table:nth-child(11) > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody td > table > tbody a").each((i, newData) => {
        title.push($(newData).text())
    });

    const href = await page.evaluate(
        () => Array.from(
            document.querySelectorAll("body > center > table:nth-child(11) > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody a[href]"),
            a => a.getAttribute("href")
        )
    );

    await $("body > center > table:nth-child(11) > tbody > tr > td:nth-child(1) > table:nth-child(4) > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody td > font").each((i, newData) => {
        dataSource.push($(newData).text())
    });

    currentPage++;

    formatData(title, dataSource, href, stockId);

    await fetchAllPageStockNews(stockId, `https://tw.stock.yahoo.com/q/h?s=${stockId}&pg=${currentPage}`)
};

const getIndividualStockNews = async (stockId) => {
    await fetchAllPageStockNews(stockId);
    return result;
};

const formatData = (titleArr, dataSourceArr, hrefArr, stockId) => {
    titleArr.forEach((item, index) => {
        result.push({
            stockId,
            title: item,
            source: dataSourceArr[index],
            href: "https://tw.stock.yahoo.com" + hrefArr[index],
            date: dataSourceArr[index].split(" ")[0].substring(1)
        })
    })
};

module.exports = getIndividualStockNews;
