const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'ai'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const codeSchema = new mongoose.Schema({
  jsx: { type: String, default: '' },
  css: { type: String, default: '' },
}, { _id: false });

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  chatHistory: [chatMessageSchema],
  code: codeSchema,
  uiState: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema); 