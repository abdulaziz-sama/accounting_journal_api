const express = require("express");
const mongoose = require('mongoose');
const chart = require('./routes/chart');
const entry = require('./routes/entry');
const Chart = require('./models/Chart');
const Entry = require('./models/Entry');

const app = express();
app.use(express.json());
app.use('/chart', chart);
app.use('/entry', entry)

mongoose.connect("mongodb://localhost:27017/accounting_api", {
  useNewUrlParser: true,  useUnifiedTopology: true 
});


app.listen(3000, ()=>{
    console.log('strarted on port 3000');
});
