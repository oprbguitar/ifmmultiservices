export type IconName = 'container' | 'truck' | 'hard-hat' | 'map' | 'clock' | 'shield' | 'users'

export interface ThemeTokens {
  navy: string
  turquoise: string
  coral: string
  pearl: string
  gray: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  detail: string
  image: string
  imagePosition: string
  icon: IconName
}

export interface AboutItem {
  title: string
  description: string
  icon: IconName
}

export interface ProjectItem {
  id: string
  title: string
  category: string
  location: string
  description: string
  image: string
  imagePosition: string
  isDemo: boolean
}

export interface SiteContent {
  contentVersion: number
  legalName: string
  commercialName: string
  ruc: string
  companyType: string
  registrationDate: string
  activityStart: string
  status: string
  taxCondition: string
  fiscalAddress: string
  economicActivities: string[]
  invoiceIssuerSince: string
  theme: ThemeTokens
  site: { title: string; description: string; canonical: string; ogImage: string }
  brand: { logo: string; logoMark: string }
  hero: { title: string; highlight: string; subtitle: string; primaryCta: string; secondaryCta: string; image: string; imagePosition: string }
  services: ServiceItem[]
  about: { eyebrow: string; title: string; body: string; items: AboutItem[] }
  projects: ProjectItem[]
  contact: { phone: string; email: string; whatsapp: string; address: string; social: { linkedin: string; facebook: string; youtube: string } }
  footer: { description: string; copyright: string }
}

