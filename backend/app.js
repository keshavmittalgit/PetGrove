const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const user = require("./controller/user")
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use("/", express.static("/backend/uploads"));
app.use(bodyParser.urlencoded({extended: true}));


if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
    path:"backend/config/.env"
});
}

//import routes
app.use("/api/v1/user", user);

//ErrorHandling
app.use(ErrorHandler);
module.exports = app;