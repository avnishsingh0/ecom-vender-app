const express = require('express');
const app = express();
const ErrorHandler = require('./utils/ErrorHandler');

const cookieParser = require("cookie-parser")
const bodyParser =require("body-parser")
const cors = require("cors")

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true  
}));
app.use("/", express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true, limit:"50mb"}));


// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "./config/.env",
    });
  }
  // import routes
  const user = require("./controller/user")
  const shop = require("./controller/shop")
  const product = require("./controller/product");
const event = require('./controller/event');
const coupon = require('./controller/coupounCode');

  app.use("/api/v2/user",user)
  app.use("/api/v2/shop",shop)
  app.use("/api/v2/product",product)
  app.use("/api/v2/event",event)
  app.use("/api/v2/coupon",coupon)

  const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof ErrorHandler) {
      res.status(err.statusCode).json({
        error: {
          message: err.message,
          statusCode: err.statusCode
        }
      });
    } else {
      res.status(500).json({
        error: {
          message: 'Internal Server Error',
          statusCode: 500
        }
      });
    }
  };
app.use(errorHandlerMiddleware);
module.exports = app;