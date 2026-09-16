import { CheckCircle2, LoaderCircle, Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import type { SiteContent } from '../types/content'

interface QuoteFormProps { content: SiteContent; editMode: boolean; onEdit: () => void }
interface FormValues { name: string; company: string; email: string; phone: string; service: string; message: string }
const emptyForm: FormValues = { name: '', company: '', email: '', phone: '', service: '', message: '' }

export function QuoteForm({ content, editMode, onEdit }: QuoteFormProps) {
  const [form, setForm] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const setField = (field: keyof FormValues, value: string) => setForm((previous) => ({ ...previous, [field]: value }))
  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {}
    if (!form.name.trim()) next.name = 'Ingresa tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Ingresa un correo válido.'
    if (!form.service) next.service = 'Selecciona un servicio.'
    if (!form.message.trim()) next.message = 'Cuéntanos brevemente qué necesitas.'
    return next
  }
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    setStatus('loading')
    window.setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('ifm-demo-quotes') ?? '[]') as FormValues[]
      localStorage.setItem('ifm-demo-quotes', JSON.stringify([...submissions, { ...form, submittedAt: new Date().toISOString() }]))
      setStatus('success')
    }, 450)
  }
  return <section id="cotizacion" className={`quote-section ${editMode ? 'quote-editing' : ''}`}><div className="container quote-layout"><div className="quote-copy"><span className="section-kicker">COTIZA CON NOSOTROS</span><h2>Cotización rápida<span /></h2><p>Cuéntanos sobre tu proyecto y te responderemos en el menor tiempo posible.</p><div className="quote-contact-note"><strong>{content.contact.phone}</strong><span>{content.contact.email}</span></div></div><div className="quote-panel">{editMode && <button className="section-edit-button quote-edit-button" type="button" onClick={onEdit}>Editar contacto</button>}{status === 'success' ? <div className="quote-success"><CheckCircle2 size={42} /><h3>Solicitud guardada</h3><p>La demo guardó tus datos en este navegador. No se envió ningún correo.</p><button className="button button-navy" type="button" onClick={() => { setForm(emptyForm); setStatus('idle') }}>Enviar otra solicitud</button></div> : <form onSubmit={submit} noValidate><div className="form-grid"><Field id="name" label="Nombre completo" value={form.name} error={errors.name} required onChange={(value) => setField('name', value)} /><Field id="company" label="Empresa" value={form.company} error={errors.company} onChange={(value) => setField('company', value)} /><Field id="email" type="email" label="Correo electrónico" value={form.email} error={errors.email} required onChange={(value) => setField('email', value)} /><Field id="phone" label="Teléfono" value={form.phone} error={errors.phone} onChange={(value) => setField('phone', value)} /></div><label className={errors.service ? 'has-error' : ''} htmlFor="service">Servicio {errors.service ? <span>{errors.service}</span> : null}</label><select id="service" value={form.service} onChange={(event) => setField('service', event.target.value)}><option value="">Selecciona un servicio *</option>{content.services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}</select><label className={errors.message ? 'has-error' : ''} htmlFor="message">¿En qué podemos ayudarte? {errors.message ? <span>{errors.message}</span> : null}</label><textarea id="message" rows={4} value={form.message} onChange={(event) => setField('message', event.target.value)} placeholder="Cuéntanos sobre tu operación o proyecto *" /><button className="button button-coral form-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <LoaderCircle className="spin" size={19} /> : <Send size={19} />}{status === 'loading' ? 'Guardando…' : 'Enviar solicitud'}</button></form>}</div></div></section>
}

function Field({ id, label, type = 'text', value, error, required, onChange }: { id: string; label: string; type?: string; value: string; error?: string; required?: boolean; onChange: (value: string) => void }) {
  return <div className={error ? 'field has-error' : 'field'}><label htmlFor={id}>{label}{required ? ' *' : ''}{error ? <span>{error}</span> : null}</label><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>
}

