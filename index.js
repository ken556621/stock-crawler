const express = require("express");


const getNews = require("./controllers/getNews");



const app = express();
const port = 3005;


app.get("/", (req, res) => {
    console.log(getNews())
    res.send("hhhqqqq")
});

app.listen(port, () => {
    console.log("App is listening on 3005")
});