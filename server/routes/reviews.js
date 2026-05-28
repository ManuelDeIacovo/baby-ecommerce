import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const REVIEWS_FILE = path.join(__dirname, '..', 'data', 'reviews.json');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', '..', 'public', 'uploads');
    // Ensure directory exists
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Il file deve essere un\'immagine.'));
    }
  }
});

// Utility to read reviews
const getReviews = async () => {
  try {
    const exists = await fs.pathExists(REVIEWS_FILE);
    if (!exists) {
      await fs.writeJson(REVIEWS_FILE, []);
      return [];
    }
    return await fs.readJson(REVIEWS_FILE);
  } catch (error) {
    console.error('Error reading reviews file:', error);
    return [];
  }
};

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recuperare le recensioni' });
  }
});

// POST a new review with photo
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { userId, userName, rating, text } = req.body;
    
    if (!userId || !userName || !rating || !text) {
      return res.status(400).json({ error: 'Tutti i campi obbligatori devono essere compilati' });
    }

    const reviews = await getReviews();
    
    const newReview = {
      id: Date.now().toString(),
      userId,
      userName,
      rating: parseInt(rating, 10),
      text,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      date: new Date().toISOString()
    };

    reviews.push(newReview);
    await fs.writeJson(REVIEWS_FILE, reviews, { spaces: 2 });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: error.message || 'Errore nel salvare la recensione' });
  }
});

export default router;
