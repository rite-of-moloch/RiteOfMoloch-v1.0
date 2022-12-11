/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withTM = require("next-transpile-modules")(["@raidguild/design-system"]);

module.exports = withTM(nextConfig); // withPlugins([withNx, withTM], nextConfig);
