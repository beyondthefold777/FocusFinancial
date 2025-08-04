import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import WalletSubmission from './models/walletSubmission.js';

const app = express();
app.use(express.json());

// ✅ Registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Wallet submission
app.post('/api/wallet-submission', async (req, res) => {
  try {
    const { stablecoin, usdAmount, walletAddress, totalToSend } = req.body;
    if (!stablecoin || !usdAmount || !walletAddress || !totalToSend) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const submission = new WalletSubmission({ stablecoin, usdAmount, walletAddress, totalToSend });
    await submission.save();

    res.status(201).json({ message: 'Submission received', submissionId: submission._id });
  } catch (err) {
    console.error('Wallet submission error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// ✅ Serve frontend if bundled with backend (optional)
// const frontendPath = path.join(__dirname, '..', 'dist');
// app.use(express.static(frontendPath));
// app.get('*', (req, res) => res.sendFile(path.resolve(frontendPath, 'index.html')));

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
