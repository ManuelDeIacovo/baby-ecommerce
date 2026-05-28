import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../src/data/products.js';
import authRouter from './routes/auth.js';
import reviewsRouter from './routes/reviews.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static product images and uploaded photos
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

// API routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Prodotto non trovato' });
  }
  res.json(product);
});

app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(PORT, () => {
  console.log(`🔧 Backend listening on http://localhost:${PORT}`);
});
