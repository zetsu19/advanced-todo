const { withNx } = require('@nx/next');

/** @type {import('@nx/next').WithNxOptions} */
const nextConfig = {
  nx: {
    svgr: true,
  },
};

module.exports = withNx(nextConfig);
