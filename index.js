require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const app = express();
const port = 3000;
//route
const User = require("./routes/user");

const options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
const sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: process.env.DB_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 259200000 },
    store: sessionStore
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api", User);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
