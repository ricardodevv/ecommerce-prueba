const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins([
  [
    optimizedImages,
    {
      handleImages: ["jpeg", "png", "svg", "webp", "gif"],
    },
  ],

  // your other plugins here
]);
