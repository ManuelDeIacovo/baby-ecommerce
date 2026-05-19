import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../src/data/products.js';
import authRouter from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static product images
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));

// API routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`🔧 Backend listening on http://localhost:${PORT}`);
});
