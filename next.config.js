/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8081',
        pathname: '/api/notify/v1/captcha',
      },
    ],
  },
};

module.exports = nextConfig;
