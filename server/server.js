const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
const Product = require('./model/product');

app.get('/test-product', async (req, res) => {
  try {
    const product = await Product.create({
      name: 'Test Item',
      sku: 'TST-002',
      costprice: 100,
      sellprice: 150
    });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Routes
app.get('/', (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
