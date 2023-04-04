/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'codeblogs-server.vercel.app',
        port: '80',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
