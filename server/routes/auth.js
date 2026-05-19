import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');

const JWT_SECRET = process.env.JWT_SECRET || 'baby-shop-secret-key-change-in-production';
const TOKEN_EXPIRY = '7d';

const getUsers = async () => {
  try {
    await fs.ensureFile(USERS_FILE);
    const data = await fs.readJson(USERS_FILE, { throws: false });
    return data || [];
  } catch {
    return [];
  }
};

const saveUsers = async (users) => {
  await fs.ensureFile(USERS_FILE);
  await fs.writeJson(USERS_FILE, users, { spaces: 2 });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La password deve essere di almeno 6 caratteri' });
    }

    const users = await getUsers();
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email già registrata' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
    };
    users.push(user);
    await saveUsers(users);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Inserisci email e password' });
    }

    const users = await getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenziali non valide' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY,
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Errore del server' });
  }
});

// GET /api/auth/me — validate token and return user info
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token mancante' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const users = await getUsers();
    const user = users.find((u) => u.id === decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Utente non trovato' });
    }

    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    res.status(401).json({ error: 'Token non valido' });
  }
});

export default router;
