import { ArrowRight, BarChart3, HardHat, ShieldCheck, Users } from 'lucide-react'
import { useAssetUrl } from '../hooks/useAssetUrl'
import { EditableSection } from './EditableSection'
import type { SiteContent } from '../types/content'

export function Hero({ content, editMode, onEdit }: { content: SiteContent; editMode: boolean; onEdit: () => void }) {
  const image = useAssetUrl(content.hero.image)
  return <EditableSection id="inicio" label="banner" editMode={editMode} onEdit={onEdit}>
    <section className="hero" style={{ '--hero-image': image ? `url("${image}")` : 'none', '--hero-position': content.hero.imagePosition } as React.CSSProperties}>
      <div className="hero-shade" />
      <div className="hero-content container">
        <div className="hero-copy reveal reveal-visible">
          <h1>{content.hero.title}<span>{content.hero.highlight}</span></h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-actions"><a className="button button-coral" href="#cotizacion">{content.hero.primaryCta} <ArrowRight size={18} /></a><a className="button button-outline-light" href="#servicios">{content.hero.secondaryCta}</a></div>
          <div className="hero-benefits" aria-label="Beneficios principales"><div><ShieldCheck size={26} /><span><strong>Seguridad</strong><small>siempre</small></span></div><div><Users size={26} /><span><strong>Compromiso</strong><small>con tu operación</small></span></div><div><BarChart3 size={26} /><span><strong>Resultados</strong><small>que impulsan</small></span></div></div>
        </div>
        <div className="hero-side-note"><HardHat size={25} /><span><strong>PERSONAS</strong><small>que construyen</small></span><HardHat size={25} /><span><strong>SOLUCIONES</strong><small>que conectan</small></span><HardHat size={25} /><span><strong>UN PERÚ</strong><small>más competitivo</small></span></div>
      </div>
    </section>
  </EditableSection>
}
