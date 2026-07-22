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