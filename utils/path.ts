/**
 * Get the base path for assets (images, videos, etc.)
 * This ensures correct paths when deploying to GitHub Pages subpaths
 * 
 * Uses NEXT_PUBLIC_BASE_PATH environment variable which is set during build
 * and injected into the client-side code by Next.js
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Get basePath from environment variable (injected at build time)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // If basePath is set, prepend it; otherwise use the path as-is
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`
}

