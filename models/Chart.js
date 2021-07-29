const mongoose = require('mongoose');

// chart of accounts schema and model
const chartSchema = mongoose.Schema({
    name: {type: String, required: [true, 'must provide account name'],
    trim: true, unique: true, uppercase: true},
    category: {type: String, enum: ['Fixed Asset','Current Asset',
    'Intangible Asset','Equity', 'Current Liability', 'Long-term Liability',
    'Expense', 'Revenue'],
    statement: {type: String, enum: ['Balance Sheet', 'Income Statement']}
    },
});

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart