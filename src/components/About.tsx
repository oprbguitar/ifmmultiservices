import { useReveal } from '../hooks/useReveal'
import { EditableSection } from './EditableSection'
import { Icon } from './Icon'
import type { SiteContent } from '../types/content'

export function About({ content, editMode, onEdit }: { content: SiteContent; editMode: boolean; onEdit: () => void }) {
  const { ref, isVisible } = useReveal<HTMLElement>()
  return <EditableSection id="nosotros" label="sección" editMode={editMode} onEdit={onEdit}><section ref={ref} className={`about-section section-blue-pale ${isVisible ? 'is-visible' : ''}`}><div className="container"><div className="about-intro"><div><span className="section-kicker">{content.about.eyebrow}</span><h2>{content.about.title}</h2></div><p>{content.about.body}</p></div><div className="about-items">{content.about.items.map((item) => <div className="about-item" key={item.title}><div className="about-icon"><Icon name={item.icon} size={31} /></div><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></div></section></EditableSection>
}

