/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // GitHub Pages configuration
  // If your repository name is NOT "username.github.io" (i.e., you're deploying to a subpath),
  // uncomment the following lines and replace 'portfolio-website-github' with your repository name:
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Required for GitHub Pages static export
  output: 'export',
  
  images: {
    domains: ['images.unsplash.com', 'github.com'],
    // Required for static export
    unoptimized: true,
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
