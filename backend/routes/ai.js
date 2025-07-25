const express = require('express');
const auth = require('../middleware/auth');
const { generateComponent } = require('../services/ai');

const router = express.Router();

router.post('/generate', auth, async (req, res) => {
  const { prompt, chatHistory, code, uiState } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required.' });
  }
  try {
    const result = await generateComponent({ prompt, chatHistory, code, uiState });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'AI generation failed.' });
  }
});

module.exports = router; 