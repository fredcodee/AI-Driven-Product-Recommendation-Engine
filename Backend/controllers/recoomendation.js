const { runPythonScript } = require('../services/pythonService');

// Handle recommendations
const getRecommendations = async (req, res) => {
  const { user_id } = req.query; // Extract user_id from query params

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const recommendations = await runPythonScript(user_id);
    res.status(200).json({ user_id, recommendations });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getRecommendations };
