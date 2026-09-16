import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { defaultContent } from '../content/defaultContent'
import { assetUrl, clearStoredContent, loadMediaBlob, loadStoredContent, publishContent, saveDraft, saveMediaBlob } from './storage'

beforeEach(() => {
  localStorage.clear()
})

describe('assetUrl', () => {
  it('resolves repository assets under the configured base path', () => {
    expect(assetUrl('assets/logo-mark.png')).toBe(`${import.meta.env.BASE_URL}assets/logo-mark.png`)
  })
  it('keeps absolute and media sources untouched', () => {
    expect(assetUrl('https://example.com/image.png')).toBe('https://example.com/image.png')
    expect(assetUrl('media:abc')).toBe('media:abc')
  })
})

describe('local content persistence', () => {
  it('falls back to default content when storage is empty or malformed', () => {
    expect(loadStoredContent()).toBe(defaultContent)
    localStorage.setItem('ifm-site-draft-v1', '{malformed')
    expect(loadStoredContent()).toBe(defaultContent)
    localStorage.setItem('ifm-site-draft-v1', JSON.stringify({ hero: {}, services: [], projects: [], contact: {} }))
    expect(loadStoredContent()).toBe(defaultContent)
  })

  it('saves drafts and prefers a published version', () => {
    const edited = { ...defaultContent, hero: { ...defaultContent.hero, title: 'Título editado' } }
    saveDraft(edited)
    expect(loadStoredContent().hero.title).toBe('Título editado')
    publishContent(defaultContent)
    expect(loadStoredContent().hero.title).toBe(defaultContent.hero.title)
    clearStoredContent()
    expect(loadStoredContent()).toBe(defaultContent)
  })
})

describe('IndexedDB media persistence', () => {
  it('stores and retrieves a valid image blob', async () => {
    const file = new File(['image'], 'hero.png', { type: 'image/png' })
    const source = await saveMediaBlob(file)
    const blob = await loadMediaBlob(source)
    expect(source).toMatch(/^media:/)
    expect(blob).not.toBeNull()
  })

  it('rejects unsupported or oversized files and missing media', async () => {
    await expect(saveMediaBlob(new File(['text'], 'notes.txt', { type: 'text/plain' }))).rejects.toThrow('imagen válida')
    const oversized = new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'large.png', { type: 'image/png' })
    await expect(saveMediaBlob(oversized)).rejects.toThrow('5 MB')
    await expect(loadMediaBlob('media:missing')).resolves.toBeNull()
  })
})
