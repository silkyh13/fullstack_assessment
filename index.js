require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
