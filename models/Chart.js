const mongoose = require('mongoose');

// chart of accounts schema and model
const chartSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    category: {type: String, enum: ['Asset', 'Equity', 'Liability', 'Expense', 'Revenue']},
});

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart