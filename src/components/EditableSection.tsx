import { Edit3 } from 'lucide-react'
import type { ReactNode } from 'react'

interface EditableSectionProps {
  id: string
  label: string
  editMode: boolean
  onEdit: () => void
  children: ReactNode
}

export function EditableSection({ id, label, editMode, onEdit, children }: EditableSectionProps) {
  return <div id={id} className={`editable-section ${editMode ? 'is-editing' : ''}`}>
    {editMode && <button className="section-edit-button" type="button" onClick={onEdit} aria-label={`Editar ${label}`}><Edit3 size={14} /> <span>Editar {label}</span></button>}
    {children}
  </div>
}

