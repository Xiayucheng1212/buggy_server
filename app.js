/**
 * Open mongodb server
 * 1.cd /usr/local/mongodb/bin
 * 2.sudo ./mongod --dbpath=/Users/{username}/data
 * 3.sudo ./mongo
 */
require('dotenv').config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(process.env.DB_HOST_PROD);
const db = mongoose.connection;

///與資料庫連線發生錯誤時
db.on('err',err => console.log(err));

///與資料庫連線成功連線時
db.once('open' , () => console.log('connected to database'));

app.use(cors());
///重要!! 要加這行才可以讓req.json讀的到資料
app.use(express.json());

const linkRouter = require("./routes/Links");
app.use("/link",linkRouter);

const tagRouter = require("./routes/Tags");
app.use("/tag",tagRouter);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});