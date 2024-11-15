const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default Metro configuration
const config = getDefaultConfig(__dirname);

// Add 'cjs' to the source extensions
config.resolver.sourceExts.push("cjs");

// Export the configuration with NativeWind support
module.exports = withNativeWind(config, { input: "./global.css" });
