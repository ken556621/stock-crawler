const cheerio = require("cheerio");
const chunk = require("lodash/chunk")

const puppeteer = require("puppeteer");

const stockService = require('../services/stockServices');

const getPriceVolume = async (stockId) => {
    const targetURL = `https://www.cnyes.com/twstock/ps_historyprice.aspx?code=${stockId}`
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
    const tableHeader = [];
    const tableCell = [];

    await $("tr.thbtm2 th").each((i, newData) => {
        tableHeader.push($(newData).text())
    });

    await $("td").each((i, newData) => {
        tableCell.push($(newData).text())
    });

    const formattedTableHeader = formatTableHeader(tableHeader);
    const formattedTableCell = chunk(tableCell, 10);

    // 最後一項髒資料
    const deDuplicatedTableCell = formattedTableCell.slice(0, formattedTableCell.length - 1);

    const combineCellWithHeader = combineHeaderWithCell(deDuplicatedTableCell, formattedTableHeader, stockId);

    combineCellWithHeader.forEach(data => {
        stockService.setStockPriceVolume(data);
    });

    await browser.close();
};

const formatTableHeader = data => {
    const dbSchema = [
        "date",
        "openPrice",
        "top",
        "low",
        "closePrice",
        "spread",
        "percentage",
        "volume",
        "dealPrice",
        "pe"
    ];

    return data.map((item, index) => item = dbSchema[index])
};

const combineHeaderWithCell = (cell, header, stockId) => {
    const result = [];

    cell.forEach(item => {
        const obj = {};
        item.forEach((data, index) => {
            obj[header[index]] = data
        });

        obj.stockId = stockId

        result.push(obj);
    });

    return result;
};

module.exports = getPriceVolume;
