const product = require('../model/product');
 

exports.createproduct = async (req, res) => {
    try {
        const Product = await product.create(req.body);
         
        res.status(201).json(Product);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getproducts = async (req, res) => {
    try {
        const Product = await product.find();
        res.status(200).json(Product);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getproduct = async (req, res) => {
    try {
        const Product = await product.findById(req.params.id);
        if (!Product) {
            res.status(404).json({ message: 'product not found' });
        }
        else {
            res.status(200).json(Product);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateproduct = async (req, res) => {
    try {
        const Product = await product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!Product) {
            res.status(404).json({ message: 'product not found' });
        }
        else {
            res.status(200).json(Product);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteproduct = async (req, res) => {
    try {
        const Product = await product.findByIdAndDelete(req.params.id);
        if (!Product) {
            res.status(404).json({ message: 'product is not in the list' });
        }
        else {
            res.status(200).json({ message: 'product is deleted successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getlowstock = async (req, res) => {
    try {
        const Product = await product.find({
            $expr: { $lt: ["$stock", "$reorderLevel"] }
        });
        res.status(200).json(Product);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getmargins = async (req, res) => {
    try {
        const Product = await product.find();

        const margins = Product.map(p => ({
            _id: p._id,
            name: p.name,
            costprice: p.costprice,
            sellprice: p.sellprice,
            marginPercent: (((p.sellprice - p.costprice) / p.sellprice) * 100).toFixed(2)
        }));

        res.status(200).json(margins);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}