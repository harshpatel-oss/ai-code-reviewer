const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: 'code is required' });   
    }
    try {
        const response = await aiService.getResponse(code);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get response' });
    }
}