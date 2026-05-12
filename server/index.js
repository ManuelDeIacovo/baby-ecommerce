const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static assets (if needed)
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));

// Load product data
const { products } = require('../src/data/products');

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`🔧 Backend listening on http://localhost:${PORT}`);
});
