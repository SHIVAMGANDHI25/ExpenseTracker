const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Categories Schema => fields => ['type', 'color']
const categoriesSchema = new Schema({
    type: { type: String, default: "Investment" },
    color: { type: String, default: '#FCBE44' }
});

// Transactions Schema => fields => ['name', 'type', 'amount', 'date']
const transactionSchema = new Schema({
    name: { type: String, default: "Anonymous" },
    type: { type: String, default: "Investment" },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Creating models for categories and transactions
const Categories = mongoose.model('Categories', categoriesSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    Categories,
    Transaction
};
