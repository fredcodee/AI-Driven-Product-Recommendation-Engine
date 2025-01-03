const { buildRecommendationModel, getRecommendations } = require('../services/pythonService');
const { getProductDetails } = require('../services/amazonService');



const healthCheck = (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
};

// Build the recommendation model
const buildModel = async (req, res) => {
  try {
    const message = await buildRecommendationModel();
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error building model:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Handle recommendations
const recommendations = async (req, res) => {
  const { userId } = req.params; 

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const recommendations = await getRecommendations(userId);
    //get amazon product details for all recommendations
    const productDetails = await Promise.all(recommendations.map(getProductDetails));
    res.status(200).json({ userId, recommendations, productDetails });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { recommendations, buildModel , healthCheck};
