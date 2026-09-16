import { useEffect, useState } from 'react'
import { ContactFooter } from './components/ContactFooter'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { QuoteForm } from './components/QuoteForm'
import { Services } from './components/Services'
import { EditorPanel } from './components/editor/EditorPanel'
import { useSiteContent } from './hooks/useSiteContent'
import type { ProjectItem, ServiceItem } from './types/content'

type EditorView = 'hero' | 'services' | 'projects' | 'colors' | 'contact' | 'settings'

export default function App() {
  const { content, setContent, save, publish, reset } = useSiteContent()
  const [editMode, setEditMode] = useState(() => new URLSearchParams(window.location.search).get('edit') === '1')
  const [preview, setPreview] = useState(false)
  const [, setEditorView] = useState<EditorView>('hero')

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => { if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'e') { event.preventDefault(); setEditMode((value) => !value); setPreview(false) } }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const activateEditor = (view: EditorView = 'hero') => { setEditorView(view); setEditMode(true); setPreview(false) }
  const exitEditor = () => { setEditMode(false); setPreview(false) }
  const panelVisible = editMode && !preview
  return <div className={`app-shell ${panelVisible ? 'has-editor' : ''}`}>
    <Header content={content} editMode={panelVisible} onEditLogo={() => activateEditor('settings')} onEditMenu={() => activateEditor('settings')} />
    <main>
      <Hero content={content} editMode={panelVisible} onEdit={() => activateEditor('hero')} />
      <Services content={content} editMode={panelVisible} onEdit={() => activateEditor('services')} onEditService={(service: ServiceItem) => { activateEditor('services'); void service }} />
      <About content={content} editMode={panelVisible} onEdit={() => activateEditor('contact')} />
      <div className="content-lower"><Projects content={content} editMode={panelVisible} onEdit={() => activateEditor('projects')} onEditProject={(project: ProjectItem) => { activateEditor('projects'); void project }} /><QuoteForm content={content} editMode={panelVisible} onEdit={() => activateEditor('contact')} /></div>
    </main>
    <ContactFooter content={content} editMode={panelVisible} onEdit={() => activateEditor('contact')} />
    {panelVisible && <EditorPanel content={content} setContent={setContent} onClose={exitEditor} onSave={save} onPublish={publish} onPreview={() => setPreview(true)} onReset={reset} onJumpTo={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} />}
    {editMode && preview && <div className="preview-bar"><span>Vista previa local</span><button type="button" onClick={() => setPreview(false)}>Volver a editar</button><button type="button" onClick={exitEditor}>Salir</button></div>}
    <a className="floating-whatsapp" href={`https://wa.me/${content.contact.whatsapp.replace(/\D/g, '')}`} aria-label="Contactar por WhatsApp">WA</a>
  </div>
}
