const mongoose = require('mongoose');

const ledgerSchema = mongoose.Schema({
    debitValue: Number,
    creditValue: Number,
    debitAccount: [],
    creditAccount: [],
    date: {type: Date, default: Date.now},
    journal_id: String
});

const createLedger = (accountName)=>{
    accountName = accountName.toLowerCase().split(' ').join('_');
    return mongoose.model(accountName, ledgerSchema, accountName);
}

module.exports = createLedger;