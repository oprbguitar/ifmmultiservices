import { Menu, Phone, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useAssetUrl } from '../hooks/useAssetUrl'
import type { SiteContent } from '../types/content'

export function Header({ content, editMode, onEditLogo, onEditMenu }: { content: SiteContent; editMode: boolean; onEditLogo: () => void; onEditMenu: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const logo = useAssetUrl(content.brand.logo)
  const links = [['Inicio', 'inicio'], ['Nosotros', 'nosotros'], ['Servicios', 'servicios'], ['Proyectos', 'proyectos'], ['Cotización', 'cotizacion'], ['Contacto', 'contacto']] as const
  return <header className="site-header">
    <div className="header-inner">
      <div className="brand-editable">
        <a href="#inicio" className="brand-link" aria-label="IFM Multiservicios, ir al inicio" onClick={() => setMenuOpen(false)}><img src={logo} alt="IFM Multiservicios S.A.C." /></a>
        {editMode && <button className="header-edit-control" type="button" onClick={onEditLogo} aria-label="Editar logo">Editar logo</button>}
      </div>
      <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
        {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      {editMode && <button type="button" className="header-edit-menu" onClick={onEditMenu}>Editar menú</button>}
      <div className="header-actions">
        <button className="icon-button search-button" type="button" aria-label="Buscar" title="Buscar"><Search size={20} /></button>
        <a className="button button-coral header-cta" href="#cotizacion">Solicitar Cotización <span aria-hidden="true">→</span></a>
        <a className="header-phone" href={`tel:${content.contact.phone.replaceAll(' ', '')}`}><Phone size={18} /><span><strong>{content.contact.phone}</strong><small>Atención al cliente</small></span></a>
      </div>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}<span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span></button>
    </div>
  </header>
}
