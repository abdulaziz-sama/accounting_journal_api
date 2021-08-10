const express = require("express");
const app = express();
const cors  = require("cors");
const chart = require('./routes/chart');
const entry = require('./routes/entry');
const trialBalance = require('./routes/trial-balance');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');

// middlewares
app.use(cors());
app.use(express.json());
app.use('/chart', chart);
app.use('/entry', entry)
app.use('/trial-balance', trialBalance)
app.use(notFound);

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, ()=>{console.log('strarted on port 3000')});
  } catch (error) {
    console.log(error);
  }
}

start();
