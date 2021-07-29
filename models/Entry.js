const mongoose = require('mongoose');

const entryAccountSchema = mongoose.Schema({
    account: {type: String, required: [true, 'must provide account name'], trim: true},
    value: {type: Number, required: true}
});

//Entry schema and model
const entrySchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    description: {type: String, required: true},
    correction_entry: {type: Boolean, default: false},
    debit_accounts: {type: [entryAccountSchema], required: true},
    credit_accounts: {type: [entryAccountSchema], required: true}
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;