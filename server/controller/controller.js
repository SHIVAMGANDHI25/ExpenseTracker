const model = require('../models/model');

// POST: http://localhost:8080/api/categories
async function create_Categories(req, res) {
    try {
        const Create = new model.Categories({
            type: "Investment",
            color: "#FCBE44"
        });

        await Create.save();
        return res.json(Create);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}

// GET: http://localhost:8080/api/categories
async function get_Categories(req, res) {
    try {
        const data = await model.Categories.find({});
        const filter = data.map(v => ({ type: v.type, color: v.color }));
        return res.json(filter);
    } catch (err) {
        return res.status(400).json({ message: `Error while fetching categories: ${err.message}` });
    }
}

// POST: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
    if (!req.body) return res.status(400).json({ message: "Post HTTP data not provided" });

    const { name, type, amount } = req.body;

    try {
        const create = new model.Transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        await create.save();
        return res.json(create);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating transaction: ${err.message}` });
    }
}

// GET: http://localhost:8080/api/transaction
async function get_Transaction(req, res) {
    try {
        const data = await model.Transaction.find({});
        return res.json(data);
    } catch (err) {
        return res.status(400).json({ message: `Error while fetching transactions: ${err.message}` });
    }
}

// DELETE: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
    if (!req.body) return res.status(400).json({ message: "Request body not found" });

    try {
        const deleted = await model.Transaction.deleteOne(req.body).clone();
        if (deleted.deletedCount === 0) {
            return res.status(400).json({ message: "No transaction found to delete" });
        }
        return res.json({ message: "Record deleted successfully!" });
    } catch (err) {
        return res.status(400).json({ message: `Error while deleting transaction: ${err.message}` });
    }
}

// GET: http://localhost:8080/api/labels
async function get_Labels(req, res) {
    try {
        const result = await model.Transaction.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            }
        ]);

        const data = result.map(v => ({
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info.color
        }));

        return res.json(data);
    } catch (error) {
        return res.status(400).json({ message: `Lookup collection error: ${error.message}` });
    }
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
};
