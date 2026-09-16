# Dirección de diseño — IFM Multiservicios

## Superficie e intención

Superficie principal `persuade`, con un estado secundario `operate` para el editor local. El usuario público debe entender rápidamente qué mueve IFM y solicitar una cotización; el editor debe revisar y ajustar el contenido sin depender de un backend.

## Dirección visual elegida

Se conserva fielmente la identidad aprobada de los mockups: bandas de ancho completo, blanco de alta legibilidad, navy corporativo, turquesa para señal y coral para acción. Se prefieren composiciones abiertas y fotografías industriales grandes a una cuadrícula genérica de tarjetas. La referencia de marca recomienda Montserrat; se usa Montserrat para títulos/UI y Source Sans 3 para lectura.

El selector del harness propuso Grafito + naranja, Libre Franklin y Source Sans 3. Esa dirección se descarta intencionalmente: cambiarla rompería el manual de marca y la especificación visual aprobada.

## Tokens

Los tokens viven en `src/styles/tokens.css`: `--ifm-navy #163A5F`, `--ifm-turquoise #14B8C4`, `--ifm-coral #E66A4E`, `--ifm-pearl #D9DEE5`, `--ifm-gray #7B8792`, escala de espacios de 4 a 88 px, radios funcionales de 3/6 px, sombra solo para capas y paneles flotantes.

## Arquitectura

Header sticky, hero fotográfico con CTA, servicios comparables, banda de fortalezas, proyectos demostrativos, formulario de cotización y footer. El editor comparte la misma página: dibuja contornos discontinuos, acciones de edición y un panel fijo en desktop que se convierte en bottom sheet en pantallas pequeñas.

## Componentes y estados

Los controles tienen hover, focus-visible, active, disabled/loading cuando aplica y selected en listas del editor. El detalle de servicios usa un diálogo nativo de la aplicación. El formulario tiene validación, loading y éxito local explícito.

## Responsive y accesibilidad

La composición se revisa en 360, 390, 430, 768, 1024, 1280, 1440 y 1920 px. En móvil el hero cambia a composición vertical, la navegación se convierte en menú, el formulario es una columna y el editor pasa a bottom sheet. Se usan landmarks, labels, alt text, foco visible, targets táctiles y `prefers-reduced-motion`.

## Anti-patrones evitados

No se usan degradados morado-azul, métricas inventadas, claims de clientes, blobs, glassmorphism, radios gigantes, pills decorativas o un dashboard genérico. Los proyectos están marcados como ejemplos editables y las limitaciones del hosting estático se explican en el README.

