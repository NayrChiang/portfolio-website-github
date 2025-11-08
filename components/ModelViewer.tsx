'use client'

import { useEffect, useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': {
        src: string
        alt: string
        'auto-rotate'?: boolean
        'camera-controls'?: boolean
        'interaction-policy'?: string
        style?: React.CSSProperties
        className?: string
      }
    }
  }
}

interface ModelViewerProps {
  src: string
  alt: string
  autoRotate?: boolean
  cameraControls?: boolean
  className?: string
}

export default function ModelViewer({
  src,
  alt,
  autoRotate = true,
  cameraControls = true,
  className = '',
}: ModelViewerProps) {
  return (
    <model-viewer
      src={src}
      alt={alt}
      auto-rotate={autoRotate}
      camera-controls={cameraControls}
      interaction-policy="allow-when-focused"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f3f4f6',
      }}
      className={className}
    />
  )
}

