// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Update the entry point to your main TypeScript file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader', // Use ts-loader for TypeScript files
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Keep the existing rules for other file types
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add .ts and .tsx as resolvable extensions
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'), // Correct way to specify the static directory
    },
    port: 9000,
    open: true, // Automatically open the browser on server start
    hot: true, // Enable hot module replacement
  }
};
