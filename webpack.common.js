const path = require('path');

// Define the entry point for your application
const entry = {
  app: './js/app.js',
};

// Define the output configuration
const output = {
  path: path.resolve(__dirname, 'dist/js'),
  clean: true,
  filename: 'app.js',
};

// Export the configuration object
module.exports = {
  entry,
  output,
};
