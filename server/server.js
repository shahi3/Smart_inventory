const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const connectDB = require('./config/db');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
const Product = require('./model/product');

// Routes
app.get('/', (req, res) => {
  res.send("Server is running");
});
app.use('/api/user',require('./routes/userRoutes'));
app.use('/api/sale',require('./routes/saleRoutes'));
app.use('/api/purchase',require('./routes/purchaseRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});