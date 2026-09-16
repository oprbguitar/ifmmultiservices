import { useEffect, useState } from 'react'
import { assetUrl, loadMediaBlob } from '../lib/storage'

export function useAssetUrl(source: string): string {
  const [resolved, setResolved] = useState(() => assetUrl(source))

  useEffect(() => {
    let active = true
    let objectUrl: string | null = null
    if (!source.startsWith('media:')) {
      setResolved(assetUrl(source))
      return () => { active = false }
    }
    void loadMediaBlob(source).then((blob) => {
      if (!active) return
      if (!blob) return
      objectUrl = URL.createObjectURL(blob)
      setResolved(objectUrl)
    }).catch(() => undefined)
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [source])

  return resolved
}

