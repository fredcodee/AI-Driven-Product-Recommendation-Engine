const { spawn } = require('child_process');
const path = require('path');

// Function to build the recommendation model
const buildRecommendationModel = () => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(__dirname, '../../AI/main.py');
    const process = spawn('python', [pythonScriptPath, 'build'],
        {
            cwd: path.join(__dirname, '../../AI'), // Set working directory to AI
        }
    ); // 'build' mode

    process.stdout.on('data', (data) => {
      console.log('Python Output:', data.toString());
    });

    process.stderr.on('data', (error) => {
      console.error('Python Error:', error.toString());
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve('Model built successfully.');
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
};

// Function to get product recommendations for a user
const getRecommendations = (userId) => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(__dirname, '../../AI/main.py');
    const process = spawn('python', [pythonScriptPath, 'recommend', userId],
        {
            cwd: path.join(__dirname, '../../AI'), // Set working directory to AI

        }
    ); // 'recommend' mode with userId

    let data = '';
    let errorOutput = '';

    process.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on('data', (error) => {
      errorOutput += error.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        try {
            console.log('Raw Output Before Parsing:', data); // For debugging
            const recommendations = JSON.parse(data.trim()); // Trim whitespace before parsing
            resolve(recommendations);
        } catch (err) {
          reject(new Error('Failed to parse Python output'));
        }
      } else {
        console.error('Python script error:', errorOutput);
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
};

module.exports = { buildRecommendationModel, getRecommendations };
