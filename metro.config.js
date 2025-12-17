// Expo OTA (EAS Update) requires Expo's Metro config.
// In SDK 52, the Metro config lives in `@expo/metro-config`.
const { getDefaultConfig } = require('@expo/metro-config');

module.exports = getDefaultConfig(__dirname);
