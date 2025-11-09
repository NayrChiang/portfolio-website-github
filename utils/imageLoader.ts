/**
 * Custom image loader for Next.js Image component
 * Ensures basePath is included in image paths for GitHub Pages deployment
 */
export default function customImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // If src already starts with http/https, return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  
  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src
  
  // If basePath is set, prepend it; otherwise use the path as-is with leading slash
  const path = basePath ? `${basePath}/${cleanSrc}` : `/${cleanSrc}`
  
  return path
}

