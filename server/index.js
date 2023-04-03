require("dotenv").config();
const express = require("express");
const clog = require("./utils/chalk");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//==================== MiddleWares ====================
app.use(cors());
app.use("/", express.static(__dirname + "/views"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", require("./routes"));

// DB Connection && Starting Server
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    clog.success("Connection SuccessFull");
  })
  .catch((err) => {
    clog.error({ msg: "Error While Connection to MongoDB", err });
  });

app.listen(PORT, () => {
  clog.success("Server is Running over port " + PORT);
});

module.exports = app;