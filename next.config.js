/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // GitHub Pages configuration
  // Automatically set by GitHub Actions workflow based on repository name
  // For manual builds, set NEXT_PUBLIC_BASE_PATH environment variable if deploying to a subpath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Required for GitHub Pages static export
  output: 'export',
  
  images: {
    domains: ['images.unsplash.com', 'github.com'],
    // Required for static export
    unoptimized: true,
    // Custom loader to handle basePath for static export
    loader: 'custom',
    loaderFile: './utils/imageLoader.ts',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig
