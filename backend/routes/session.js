const express = require('express');
const Session = require('../models/Session');
const auth = require('../middleware/auth');

const router = express.Router();

// Create new session
router.post('/', auth, async (req, res) => {
  const { title, chatHistory, code, uiState } = req.body;
  try {
    const session = new Session({
      user: req.user.userId,
      title,
      chatHistory: chatHistory || [],
      code: code || { jsx: '', css: '' },
      uiState: uiState || {},
    });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// List all sessions for user
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.userId }).sort({ updatedAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get one session by id
router.get('/:id', auth, async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user: req.user.userId });
    if (!session) return res.status(404).json({ message: 'Session not found.' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update session by id
router.put('/:id', auth, async (req, res) => {
  const { title, chatHistory, code, uiState } = req.body;
  try {
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { $set: { title, chatHistory, code, uiState } },
      { new: true }
    );
    if (!session) return res.status(404).json({ message: 'Session not found.' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete session by id
router.delete('/:id', auth, async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!session) return res.status(404).json({ message: 'Session not found.' });
    res.json({ message: 'Session deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 