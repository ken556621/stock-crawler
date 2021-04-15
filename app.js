const express = require("express");


const app = express();
const port = 3005;

require("./routes")(app)


app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
});