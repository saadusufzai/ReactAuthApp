/* eslint-disable no-param-reassign */

module.exports = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  webpack(config) {
    /* Adds the svgr/webpack plugin to use SVG's as components */
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      }
    );
    return config;
  },
  
};
