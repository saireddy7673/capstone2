const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const database=require('./database')
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./authentication/auth");
const errorHandler = require("./authentication/errorHandler");

//then below thing can make you more security in the website to defend from hacker some attacks like ex: remote file intrusion and local file intrusion
const api = process.env.API_URL;

//the cors module is used to communicate from frontend,backend its a two way communication
app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//Routes
app.use(`${api}/categories`, require("./routes/categories"));
app.use(`${api}/products`, require("./routes/products"));
app.use(`${api}/users`, require("./routes/users"));
app.use(`${api}/orders`, require("./routes/orders"));
app.use(`${api}/discount`, require("./routes/discount"));

//Database
database.createMongoConnection()
const db=database.getMongoConnection()
db.on('error',database.onError)
db.on('open',database.onSuccess)

module.exports = app
