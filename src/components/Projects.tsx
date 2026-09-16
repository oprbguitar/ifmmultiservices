import { ArrowRight, MapPin } from 'lucide-react'
import { useAssetUrl } from '../hooks/useAssetUrl'
import { useReveal } from '../hooks/useReveal'
import { EditableSection } from './EditableSection'
import type { ProjectItem, SiteContent } from '../types/content'

function ProjectCard({ project, editMode, onEdit }: { project: ProjectItem; editMode: boolean; onEdit: () => void }) {
  const image = useAssetUrl(project.image)
  const { ref, isVisible } = useReveal<HTMLElement>()
  return <article ref={ref} className={`project-card ${isVisible ? 'is-visible' : ''}`}><div className="project-image">{project.image && <img src={image} alt="" loading="lazy" style={{ objectPosition: project.imagePosition }} />}{editMode && <button className="project-edit" type="button" onClick={onEdit} aria-label={`Editar ${project.title}`}>Editar</button>}</div><div className="project-info"><span>{project.category}</span><h3>{project.title}</h3><p><MapPin size={15} /> {project.location}</p>{project.isDemo && <small>Ejemplo editable · no representa un proyecto confirmado</small>}</div></article>
}

export function Projects({ content, editMode, onEdit, onEditProject }: { content: SiteContent; editMode: boolean; onEdit: () => void; onEditProject: (project: ProjectItem) => void }) {
  return <EditableSection id="proyectos" label="proyectos" editMode={editMode} onEdit={onEdit}><section className="projects-section section-white"><div className="container"><div className="section-heading projects-heading"><div><span className="section-kicker">NUESTROS PROYECTOS</span><h2>Capacidades que impulsan la industria</h2></div><a href="#contacto">Conversemos <ArrowRight size={18} /></a></div><div className="projects-grid">{content.projects.map((project) => <ProjectCard key={project.id} project={project} editMode={editMode} onEdit={() => onEditProject(project)} />)}</div></div></section></EditableSection>
}
