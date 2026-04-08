/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  basePath: '/chaine-info-energie',
  assetPrefix: '/chaine-info-energie',
}

export default nextConfig