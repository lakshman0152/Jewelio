const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add a rule to handle the wasm files
  config.module.rules.push({
    test: /\.wasm$/,
    type: 'asset/resource',
    include: path.resolve(__dirname, 'node_modules/expo-sqlite/web/wa-sqlite'),
  });

  return config;
};