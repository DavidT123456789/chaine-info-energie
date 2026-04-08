/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

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
  basePath: isProd ? '/chaine-info-energie' : '',
  assetPrefix: isProd ? '/chaine-info-energie' : '',
}

export default nextConfig