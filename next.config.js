/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  typescript:{
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
