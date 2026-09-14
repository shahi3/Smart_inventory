const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const product = require('./model/product');
const sale = require('./model/sale');
const purchase = require('./model/purchase');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        await product.deleteMany();
        await sale.deleteMany();
        await purchase.deleteMany();
        console.log('Old data cleared');

        const products = await product.insertMany([
            { name: 'Wireless Mouse', sku: 'WM-001', costprice: 300, sellprice: 450, stock: 50, reorderLevel: 15 },
            { name: 'Keyboard', sku: 'KB-002', costprice: 500, sellprice: 750, stock: 30, reorderLevel: 10 },
            { name: 'USB Cable', sku: 'UC-003', costprice: 50, sellprice: 100, stock: 100, reorderLevel: 25 },
            { name: 'Laptop Stand', sku: 'LS-004', costprice: 400, sellprice: 650, stock: 20, reorderLevel: 8 },
            { name: 'Webcam', sku: 'WC-005', costprice: 800, sellprice: 1200, stock: 12, reorderLevel: 5 }
        ]);
        console.log(`${products.length} products created`);

        const sales = [];
        for (let i = 0; i < 60; i++) {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            const daysAgo = Math.floor(Math.random() * 30);
            const saleDate = new Date();
            saleDate.setDate(saleDate.getDate() - daysAgo);

            sales.push({
                product: randomProduct._id,
                quantity: Math.floor(Math.random() * 5) + 1,
                price: randomProduct.sellprice,
                date: saleDate,
                customer: 'Walk-in'
            });
        }
        await sale.insertMany(sales);
        console.log(`${sales.length} sales created`);

        const purchases = [];
        for (let i = 0; i < 15; i++) {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            purchases.push({
                product: randomProduct._id,
                quantity: Math.floor(Math.random() * 20) + 10,
                supplier: 'ABC Traders',
                price: randomProduct.costprice
            });
        }
        await purchase.insertMany(purchases);
        console.log(`${purchases.length} purchases created`);

        console.log('Seeding complete');
        await mongoose.connection.close();
    }
    catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedData();