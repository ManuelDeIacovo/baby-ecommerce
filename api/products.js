import { products } from '../src/data/products.js';

export default function handler(req, res) {
  res.status(200).json(products);
}
