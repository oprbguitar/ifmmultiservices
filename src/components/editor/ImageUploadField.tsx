import { ImagePlus, LoaderCircle, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { saveMediaBlob } from '../../lib/storage'
import { useAssetUrl } from '../../hooks/useAssetUrl'

export function ImageUploadField({ label, source, original, position, onSourceChange, onPositionChange }: { label: string; source: string; original?: string; position: string; onSourceChange: (value: string) => void; onPositionChange: (value: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const image = useAssetUrl(source)
  const handleFile = async (file?: File) => {
    if (!file) return
    setBusy(true); setError('')
    try { onSourceChange(await saveMediaBlob(file)) } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : 'No se pudo guardar la imagen.') } finally { setBusy(false) }
  }
  return <div className="editor-image-field"><span className="editor-field-label">{label}</span><div className="editor-image-preview">{source ? <img src={image} alt="Vista previa" style={{ objectPosition: position }} /> : <span className="image-empty">Sin imagen</span>}</div><div className="editor-image-actions"><div className="editor-image-buttons"><label className="button button-small button-navy"><ImagePlus size={15} />{busy ? <><LoaderCircle className="spin" size={14} /> Guardando</> : 'Subir imagen'}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { void handleFile(event.target.files?.[0]); event.currentTarget.value = '' }} /></label><button type="button" className="button button-small button-pale" onClick={() => onSourceChange('')}><Trash2 size={14} /> Quitar</button>{original && <button type="button" className="button button-small button-pale" onClick={() => onSourceChange(original)}><RotateCcw size={14} /> Restaurar</button>}</div><label>Posición de imagen<input value={position} onChange={(event) => onPositionChange(event.target.value)} placeholder="center center" /></label>{error && <p className="editor-error">{error}</p>}</div></div>
}
