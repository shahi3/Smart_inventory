const sale = require('../model/sale');
const product=require('../model/product')

exports.createsale = async (req, res) => {
    try {
        const Sale = await sale.create(req.body);
        await product.findByIdAndUpdate(req.body.product,{
            $inc:{stock: -req.body.quantity}
        });
        res.status(201).json(Sale);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getsale = async (req, res) => {
    try {
        const Sale = await sale.findById(req.params.id);
        if (!Sale) {
            res.status(404).json({ message: 'data not found' });
        }
        else {
            res.status(200).json(Sale);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getsales = async (req, res) => {
    try {
        const Sale = await sale.find();
        res.status(200).json(Sale);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updatesale = async (req, res) => {
    try {
        const Sale = await sale.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        if (!Sale) {
            res.status(404).json({ message: 'data not found' });
        }
        else {
            res.status(200).json(Sale);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deletesale = async (req, res) => {
    try {
        const Sale = await sale.findByIdAndDelete(req.params.id);
        if (!Sale) {
            res.status(404).json({ message: 'data not found' });
        }
        else {
            res.status(200).json({ message: 'sale deleted successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}