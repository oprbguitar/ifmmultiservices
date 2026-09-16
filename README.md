# IFM Multiservicios S.A.C.

Sitio corporativo editable para IFM Multiservicios S.A.C., basado en los mockups aprobados y en los activos locales de marca. La página comunica las actividades de manipulación de carga, transporte terrestre y fabricación de productos metálicos para uso estructural.

## Tecnología

- React + Vite + TypeScript
- CSS nativo con variables de diseño IFM
- `lucide-react` para iconografía funcional
- Vitest para helpers de contenido
- GitHub Actions para GitHub Pages

## Desarrollo local

```bash
npm install
npm run dev
```

Vite usa la base `/ifmmultiservices/`, por lo que la URL local habitual es `http://localhost:5173/ifmmultiservices/`.

```bash
npm run lint
npm run test
npm run build
npm run preview
```

## Modo Edición

Activa el editor con:

- `?edit=1` en la URL
- `Ctrl + Shift + E`

El panel permite editar banner, servicios, proyectos, colores, contacto, datos legales y configuración SEO. Los cambios son visibles inmediatamente. `Guardar cambios` conserva un borrador local; `Publicar cambios` guarda la versión local publicada en el navegador. `Vista previa` oculta el panel y los contornos para revisar la versión pública.

Las ediciones de texto/configuración se guardan en `localStorage`. Las imágenes subidas se validan como imágenes de hasta 5 MB y se guardan en IndexedDB; no se incrustan como base64 en `localStorage`.

`Exportar configuración` descarga `ifm-site-content.json`. `Importar configuración` acepta un JSON con el esquema de `SiteContent`. Para una publicación gestionada, una futura integración CMS puede sustituir el adaptador de `src/lib/storage.ts` sin modificar las secciones visuales. También existe una copia legible en `public/content/default-content.json`.

## Estructura

```text
src/
  components/       UI pública y affordances del editor
  components/editor/Panel, formularios e imágenes locales
  content/          contenido IFM inicial tipado
  hooks/             contenido persistente, assets y reveal
  lib/               almacenamiento y resolución de assets
  styles/            tokens y estilos responsive
  types/             contrato SiteContent
public/assets/      copias de producción de los activos aprobados
```

## GitHub Pages

El repositorio destino es `https://github.com/oprbguitar/ifmmultiservices` y la URL prevista es `https://oprbguitar.github.io/ifmmultiservices/`. `.github/workflows/deploy-pages.yml` construye `dist` y publica Pages usando las acciones oficiales. GitHub Pages es hosting estático: este editor es un CMS demo local del navegador, no un panel multiusuario ni un backend. Las solicitudes de cotización demo también quedan en el navegador y no se envían por correo.

## Datos y límites

La información registral mostrada proviene del material RUC local. Teléfono y correo parten de los activos corporativos/mocks locales y son editables; conviene confirmarlos antes de una publicación comercial definitiva. Los proyectos iniciales están marcados como referencias visuales editables y no como clientes o proyectos confirmados de IFM.

