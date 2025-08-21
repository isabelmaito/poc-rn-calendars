module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
    //plugins: ['react-native-worklets/plugin'], // Esta é a linha que precisa ser alterad
