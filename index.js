const express = require("express");


const getNews = require("./controllers/getNews");
const getPrice = require("./controllers/getPrice");



const app = express();
const port = 3005;


app.get("/", (req, res) => {
    getNews(2330)
    res.send("hhhqqqq")
});

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
});