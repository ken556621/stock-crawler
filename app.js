const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3005;

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

const favariteStockIdList = [
    "2330",
    "3105",
    "2454",
    "2353",
    "2303",
    "2317"
];

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
});

require("./routes")(app);