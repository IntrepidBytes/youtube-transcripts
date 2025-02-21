/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 