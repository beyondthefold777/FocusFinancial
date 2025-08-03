const mongoose = require('mongoose');

const walletSubmissionSchema = new mongoose.Schema({
  stablecoin: { type: String, required: true },
  usdAmount: { type: Number, required: true },
  walletAddress: { type: String, required: true },
  totalToSend: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WalletSubmission', walletSubmissionSchema);
