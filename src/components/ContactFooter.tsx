import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { useAssetUrl } from '../hooks/useAssetUrl'
import { EditableSection } from './EditableSection'
import type { SiteContent } from '../types/content'

export function ContactFooter({ content, editMode, onEdit }: { content: SiteContent; editMode: boolean; onEdit: () => void }) {
  const logo = useAssetUrl(content.brand.logo)
  return <EditableSection id="contacto" label="contacto" editMode={editMode} onEdit={onEdit}><footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><img src={logo} alt="IFM Multiservicios S.A.C." /><p>{content.footer.description.split('\n').map((line) => <span key={line}>{line}</span>)}</p></div><div className="footer-contact"><div><MapPin size={17} /><span>{content.contact.address}</span></div><div><Phone size={17} /><a href={`tel:${content.contact.phone.replaceAll(' ', '')}`}>{content.contact.phone}</a></div><div><Mail size={17} /><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></div></div><div className="footer-links"><strong>Enlaces rápidos</strong><div><a href="#inicio">Inicio</a><a href="#proyectos">Proyectos</a><a href="#nosotros">Nosotros</a><a href="#cotizacion">Cotización</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></div></div><div className="footer-social"><strong>Síguenos</strong><div><a href={content.contact.social.linkedin || '#contacto'} aria-label="LinkedIn"><Linkedin size={19} /></a><a href={content.contact.social.facebook || '#contacto'} aria-label="Facebook"><Facebook size={19} /></a><a href={content.contact.social.youtube || '#contacto'} aria-label="YouTube"><Youtube size={19} /></a></div><small>{content.footer.copyright}</small></div></div></footer></EditableSection>
}

