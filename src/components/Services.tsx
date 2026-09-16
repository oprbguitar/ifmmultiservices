import { ArrowUpRight, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import { useAssetUrl } from '../hooks/useAssetUrl'
import { useReveal } from '../hooks/useReveal'
import { EditableSection } from './EditableSection'
import { Icon } from './Icon'
import type { ServiceItem, SiteContent } from '../types/content'

function ServiceCard({ service, editMode, onEdit, onOpen }: { service: ServiceItem; editMode: boolean; onEdit: () => void; onOpen: () => void }) {
  const image = useAssetUrl(service.image)
  const { ref, isVisible } = useReveal<HTMLElement>()
  return <article ref={ref} className={`service-card ${isVisible ? 'is-visible' : ''}`}>
    {editMode && <div className="item-edit-actions"><button type="button" onClick={onEdit} aria-label={`Editar ${service.title}`}><ArrowUpRight size={15} /></button></div>}
    <div className="service-icon"><Icon name={service.icon} size={33} /></div>
    <div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p><button type="button" className="round-arrow" onClick={onOpen} aria-label={`Ver detalle de ${service.title}`}><ChevronRight size={20} /></button></div>
    {service.image && <img src={image} alt="" loading="lazy" style={{ objectPosition: service.imagePosition }} />}
  </article>
}

export function Services({ content, editMode, onEdit, onEditService }: { content: SiteContent; editMode: boolean; onEdit: () => void; onEditService: (service: ServiceItem) => void }) {
  const [selected, setSelected] = useState<ServiceItem | null>(null)
  return <EditableSection id="servicios" label="servicios" editMode={editMode} onEdit={onEdit}>
    <section className="services-section section-white"><div className="container"><div className="section-heading"><div><span className="section-kicker">NUESTROS SERVICIOS</span><h2>Soluciones para mover tu operación</h2></div><p>Capacidades coordinadas para atender carga, transporte y estructuras metálicas con seguridad y precisión.</p></div><div className="services-grid">{content.services.map((service) => <ServiceCard key={service.id} service={service} editMode={editMode} onEdit={() => onEditService(service)} onOpen={() => setSelected(service)} />)}</div></div></section>
    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null) }}><div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title"><button type="button" className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar detalle"><X size={20} /></button><span className="section-kicker">DETALLE DEL SERVICIO</span><h2 id="service-modal-title">{selected.title}</h2><p>{selected.detail}</p><a href="#cotizacion" className="button button-coral" onClick={() => setSelected(null)}>Solicitar información <ArrowUpRight size={17} /></a></div></div>}
  </EditableSection>
}
