const express = require("express");

const app = express();
const port = 3005;

const infoCrawler = require("./crawler/infoCrawler");
const newsCrawler = require("./crawler/newsCrawler");
const priceCrawler = require("./crawler/priceCrawler");


require("./routes")(app);

const favariteStockIdList = [
    "2330",
    "3105",
    "2454",
    "2353",
    "2303",
    "2317"
];

app.get("/crawler", (req, res) => {
    res.send("Write in database!!!")
})

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
});