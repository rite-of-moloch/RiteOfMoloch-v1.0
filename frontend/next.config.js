/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["@raidguild/design-system"]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);

// module.exports = withTM(nextConfig); // withPlugins([withNx, withTM], nextConfig);
