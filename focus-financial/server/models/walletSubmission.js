// server/models/walletSubmission.js

const mongoose = require('mongoose');

const walletSubmissionSchema = new mongoose.Schema({
  stablecoin: {
    type: String,
    required: true,
  },
  usdAmount: {
    type: Number,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  totalToSend: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const WalletSubmission = mongoose.model('WalletSubmission', walletSubmissionSchema);

module.exports = WalletSubmission;
