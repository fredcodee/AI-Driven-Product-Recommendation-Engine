const { spawn } = require('child_process');

// Function to run the Python script
const runPythonScript = (userId) => {
  return new Promise((resolve, reject) => {
    const process = spawn('python', ['../engine/recommend.py', userId]);

    let data = '';
    process.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on('data', (error) => {
      console.error('Python script error:', error.toString());
    });

    process.on('close', (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(data)); // Parse the recommendations as JSON
        } catch (err) {
          reject(new Error('Failed to parse Python output'));
        }
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
};

module.exports = { runPythonScript };
