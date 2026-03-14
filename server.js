const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Logique de génération ────────────────────────
const CHARS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function generatePassword(length, options) {
  let charset = '';
  const guaranteed = [];

  if (options.lowercase) {
    charset += CHARS.lowercase;
    guaranteed.push(CHARS.lowercase[Math.floor(Math.random() * CHARS.lowercase.length)]);
  }
  if (options.uppercase) {
    charset += CHARS.uppercase;
    guaranteed.push(CHARS.uppercase[Math.floor(Math.random() * CHARS.uppercase.length)]);
  }
  if (options.numbers) {
    charset += CHARS.numbers;
    guaranteed.push(CHARS.numbers[Math.floor(Math.random() * CHARS.numbers.length)]);
  }
  if (options.symbols) {
    charset += CHARS.symbols;
    guaranteed.push(CHARS.symbols[Math.floor(Math.random() * CHARS.symbols.length)]);
  }

  if (!charset) return { error: 'Sélectionne au moins un type de caractère' };

  // Remplit le reste aléatoirement
  const remaining = Array.from(
    { length: length - guaranteed.length },
    () => charset[Math.floor(Math.random() * charset.length)]
  );

  // Mélange tout pour éviter un pattern prévisible
  const password = [...guaranteed, ...remaining]
    .sort(() => Math.random() - 0.5)
    .join('');

  return { password, strength: getStrength(password) };
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Faible', level: 1 };
  if (score <= 4) return { label: 'Moyen', level: 2 };
  if (score <= 5) return { label: 'Fort', level: 3 };
  return { label: 'Très fort', level: 4 };
}

// ── Routes API ───────────────────────────────────
app.post('/api/generate', (req, res) => {
  const {
    length = 16,
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = false
  } = req.body;

  if (length < 4 || length > 128) {
    return res.status(400).json({ error: 'Longueur entre 4 et 128 caractères' });
  }

  const result = generatePassword(length, { lowercase, uppercase, numbers, symbols });

  if (result.error) return res.status(400).json(result);

  res.json(result);
});

// Route fallback
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🔐 Password Generator tourne sur http://localhost:3000`);
});