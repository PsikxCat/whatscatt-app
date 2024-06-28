/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'scrupulous-octopus-27.convex.cloud',
      },
    ],
  },
}

export default nextConfig
