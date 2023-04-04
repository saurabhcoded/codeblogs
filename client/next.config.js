/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '64.227.180.187',
        port: '6000',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
