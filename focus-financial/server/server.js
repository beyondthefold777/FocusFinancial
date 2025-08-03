const dotenv = require('dotenv');
dotenv.config();

console.log('✅ Environment variables loaded');

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('./models/user');
const WalletSubmission = require('./models/walletSubmission');

const app = express();
app.use(express.json());

// 🔐 Registration Route
app.post('/register', async (req, res) => {
  console.log('📨 Received registration request:', req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Registration failed: Missing email or password');
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Registration failed: Email already in use:', email);
      return res.status(409).json({ error: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    console.log('✅ User registered:', email);

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔑 Login Route
app.post('/login', async (req, res) => {
  console.log('🔐 Received login request:', req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Login failed: Missing email or password');
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Login failed: User not found for email:', email);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Login failed: Incorrect password for email:', email);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    console.log('✅ User logged in:', email);

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 💳 Wallet Submission Route
app.post('/api/wallet-submission', async (req, res) => {
  console.log('📨 Received wallet submission:', req.body);

  try {
    const { stablecoin, usdAmount, walletAddress, totalToSend } = req.body;

    if (!stablecoin || !usdAmount || !walletAddress || !totalToSend) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const submission = new WalletSubmission({
      stablecoin,
      usdAmount,
      walletAddress,
      totalToSend,
    });

    await submission.save();

    console.log('✅ Wallet submission saved:', submission._id);

    return res.status(201).json({
      message: 'Wallet address received successfully.',
      submissionId: submission._id,
    });
  } catch (error) {
    console.error('❌ Wallet submission error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Serve frontend
const frontendPath = path.join(__dirname, '..', 'dist');
app.use(express.static(frontendPath));

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});

// ✅ Optional health check for Fly.io
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 🌐 Connect to Mongo and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // 🔍 Route Debug Logging
    console.log('\n📋 Registered Routes:');
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        console.log('➡️ ', middleware.route.path);
      }
    });

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
