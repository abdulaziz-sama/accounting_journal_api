const express = require("express");
const app = express();
const chart = require('./routes/chart');
const entry = require('./routes/entry');
const connectDB = require('./db/connect');
require('dotenv').config();

// middlewares
app.use(express.json());
app.use('/chart', chart);
app.use('/entry', entry)

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, ()=>{console.log('strarted on port 3000')});
  } catch (error) {
    console.log(error);
  }
}

start();