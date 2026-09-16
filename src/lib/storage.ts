import { defaultContent } from '../content/defaultContent'
import type { SiteContent } from '../types/content'

const DRAFT_KEY = 'ifm-site-draft-v1'
const PUBLISHED_KEY = 'ifm-site-published-v1'
const MEDIA_DB = 'ifm-site-media-v1'
const MEDIA_STORE = 'media'

function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false
  const record = value as Partial<SiteContent>
  return typeof record.contentVersion === 'number'
    && typeof record.site === 'object'
    && typeof record.brand === 'object'
    && typeof record.theme === 'object'
    && typeof record.hero === 'object'
    && typeof record.about === 'object'
    && Array.isArray(record.services)
    && Array.isArray(record.projects)
    && typeof record.contact === 'object'
    && typeof record.footer === 'object'
}

function readContent(key: string): SiteContent | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isSiteContent(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function loadStoredContent(): SiteContent {
  return readContent(PUBLISHED_KEY) ?? readContent(DRAFT_KEY) ?? defaultContent
}

export function saveDraft(content: SiteContent): void {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(content))
}

export function publishContent(content: SiteContent): void {
  const serialized = JSON.stringify(content)
  localStorage.setItem(DRAFT_KEY, serialized)
  localStorage.setItem(PUBLISHED_KEY, serialized)
}

export function clearStoredContent(): void {
  localStorage.removeItem(DRAFT_KEY)
  localStorage.removeItem(PUBLISHED_KEY)
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(MEDIA_DB, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(MEDIA_STORE, { keyPath: 'id' })
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('No se pudo abrir el almacenamiento de imágenes.'))
  })
}

export async function saveMediaBlob(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Selecciona una imagen válida.')
  if (file.size > 5 * 1024 * 1024) throw new Error('La imagen debe pesar menos de 5 MB.')
  const id = `media-${crypto.randomUUID()}`
  const db = await openMediaDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, 'readwrite')
    tx.objectStore(MEDIA_STORE).put({ id, blob: new Blob([file], { type: file.type }), createdAt: new Date().toISOString() })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error('No se pudo guardar la imagen.'))
  })
  db.close()
  return `media:${id}`
}

export async function loadMediaBlob(source: string): Promise<Blob | null> {
  if (!source.startsWith('media:')) return null
  const db = await openMediaDb()
  const record = await new Promise<{ blob: Blob } | undefined>((resolve, reject) => {
    const request = db.transaction(MEDIA_STORE, 'readonly').objectStore(MEDIA_STORE).get(source.slice(6))
    request.onsuccess = () => resolve(request.result as { blob: Blob } | undefined)
    request.onerror = () => reject(request.error)
  })
  db.close()
  return record?.blob ?? null
}

export function assetUrl(source: string): string {
  if (!source) return ''
  if (/^(https?:|data:|blob:|media:|\/)/.test(source)) return source
  return `${import.meta.env.BASE_URL}${source.replace(/^\//, '')}`
}
