import { useCallback, useEffect, useState } from 'react'
import { defaultContent } from '../content/defaultContent'
import { assetUrl, clearStoredContent, loadStoredContent, publishContent, saveDraft } from '../lib/storage'
import type { SiteContent } from '../types/content'

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(() => loadStoredContent())
  const [savedAt, setSavedAt] = useState<string | null>(null)

  useEffect(() => {
    document.title = content.site.title
    const setMeta = (name: string, value: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.head.querySelector<HTMLMetaElement>(selector)
      if (!meta) { meta = document.createElement('meta'); if (property) meta.setAttribute('property', name); else meta.setAttribute('name', name); document.head.appendChild(meta) }
      meta.content = value
    }
    setMeta('description', content.site.description)
    setMeta('og:title', content.site.title, true)
    setMeta('og:description', content.site.description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', content.site.canonical, true)
    setMeta('og:image', assetUrl(content.site.ogImage), true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', content.site.title)
    setMeta('twitter:description', content.site.description)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = content.site.canonical
    let organization = document.head.querySelector<HTMLScriptElement>('#ifm-organization-jsonld')
    if (!organization) { organization = document.createElement('script'); organization.id = 'ifm-organization-jsonld'; organization.type = 'application/ld+json'; document.head.appendChild(organization) }
    organization.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: content.commercialName, legalName: content.legalName, url: content.site.canonical, identifier: content.ruc, address: { '@type': 'PostalAddress', streetAddress: content.fiscalAddress, addressCountry: 'PE' }, areaServed: 'Perú' })
    document.documentElement.style.setProperty('--ifm-navy', content.theme.navy)
    document.documentElement.style.setProperty('--ifm-turquoise', content.theme.turquoise)
    document.documentElement.style.setProperty('--ifm-coral', content.theme.coral)
    document.documentElement.style.setProperty('--ifm-pearl', content.theme.pearl)
    document.documentElement.style.setProperty('--ifm-gray', content.theme.gray)
  }, [content])

  const save = useCallback(() => {
    saveDraft(content)
    setSavedAt(new Date().toISOString())
  }, [content])

  const publish = useCallback(() => {
    publishContent(content)
    setSavedAt(new Date().toISOString())
  }, [content])

  const reset = useCallback(() => {
    clearStoredContent()
    setContent(defaultContent)
    setSavedAt(null)
  }, [])

  return { content, setContent, savedAt, save, publish, reset }
}
