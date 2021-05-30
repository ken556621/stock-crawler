const cheerio = require("cheerio");

const puppeteer = require("puppeteer");


const getVolumeRank = async () => {
    const targetURL = `https://tw.stock.yahoo.com/rank/volume`
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await page.goto(targetURL);
    await navigationPromise;

    //把網頁的body抓出來
    let body = await page.content()

    //接著我們把他丟給cheerio去處理
    let $ = await cheerio.load(body);

    const stockNameList = [];
    const stockIdList = [];
    const price = [];
    const percentageList = [];

    Promise.all([
        await $("div.Lh\\(20px\\)").each((i, newData) => {
            stockNameList.push($(newData).text())
        }),
        await $("div.D\\(f\\).Ai\\(c\\) > span").each((i, newData) => {
            stockIdList.push($(newData).text())
        }),
        await $("div.table-body-wrapper > ul > li > div > div:nth-child(2) > span").each((i, newData) => {
            if ($(newData).hasClass("C($c-trend-up)")) {
                price.push("+," + $(newData).text())
                return
            }

            if ($(newData).hasClass("C($c-trend-down)")) {
                price.push("-," + $(newData).text())
                return
            }

            price.push($(newData).text())
        }),
        await $("div.table-body-wrapper > ul > li > div > div:nth-child(4) > span").each((i, newData) => {
            if ($(newData).hasClass("C($c-trend-up)")) {
                percentageList.push("+," + $(newData).text())
                return
            }

            if ($(newData).hasClass("C($c-trend-down)")) {
                percentageList.push("-," + $(newData).text())
                return
            }

            percentageList.push($(newData).text())
        })
    ])

    dataCleaning(stockIdList);

    const formatedTable = formatTable(stockNameList, stockIdList, price, percentageList);

    await browser.close();

    return formatedTable;
};

const dataCleaning = (data) => {
    data.pop();
    data.splice(0, 2);
    return data
};

const formatTable = (name, id, price, percentage) => {
    return name.map((item, index) => {
        return {
            name: item,
            id: id[index],
            price: price[index],
            percentage: percentage[index]
        }
    })
};

module.exports = getVolumeRank;
