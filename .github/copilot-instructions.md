# Instrucciones y Arquitectura del Proyecto: Kiwanis Football League (KFL)

Este repositorio (`kiwanisfootball2027`) es un sitio web estático en producción desplegado en Vercel (`HTML5`, `CSS3`, `JavaScript ES6+ Vanilla`), integrado con **Google Sheets / Google Apps Script** como base de datos operativa y **Decap CMS** (`admin/config.yml`) exclusivamente para noticias/blog.

## 1. Arquitectura de Datos (NO ALTERAR)
- **Google Sheets + Google Apps Script es el backend primordial del sitio:**
  - **Calendarios, Rosters, Tabla de Posiciones y Live Ticker:** Se alimentan dinámicamente desde hojas de cálculo de Google (Contact y Flag) y Web Apps de Google Apps Script configuradas en `js/config-ligas.js`.
  - **Campeones y Récords Varsity:** Se leen desde hojas publicadas de Google Sheets.
  - **Inscripciones de Jugadores:** Se autotabulan directamente mediante Google Forms / Google Sheets sin modificar la estructura de columnas de las hojas de respuestas.
  - **Portal de Coaches (`coaches.html`):** Autentica contraseñas y permisos directamente contra Google Sheets vía Google Apps Script (`js/config-coaches.js`).
- **PROHIBIDO** migrar calendarios, rosters, récords, campeones o contraseñas de coaches hacia archivos JSON estáticos desconectados de Google Sheets, ni eliminar los endpoints de Apps Script.
- **Decap CMS (`admin/config.yml`)** se limita exclusivamente a la gestión de artículos del blog (`blog/`) y contenido editorial estático.

## 2. Reglas de Diseño y CSS (INQUEBRANTABLES)
1. **Tipografía Fluida (`clamp()`):** Todos los tamaños de fuente (encabezados, párrafos, botones, filtros, encabezados y celdas de tabla) deben implementarse usando `clamp()`.
2. **Soporte Estricto en Móvil (Viewport mínimo `375px` - iPhone SE):**
   - Bajo ninguna circunstancia se permiten textos partidos en doble línea no deseada, truncamientos con puntos suspensivos (`text-overflow: ellipsis` / `...`), ni desalineaciones o desbordamientos rotos en tablas, filtros tipo píldora o tarjetas al renderizar a `375px` de ancho.
   - Ajusta `clamp()`, `padding`, `gap` y contenedores responsivos para que todo encaje limpio en `375px`.
3. **Identidad Visual Intacta:** Conserva exactamente las variables de color en `:root` y las familias tipográficas (`Anton` y `Montserrat`) definidas en `css/global.css`. No inventes colores ni sustituyas fuentes.
4. **Ruta Única del Logo Oficial:** La única ruta válida para el logo de KFL en todo el repositorio (HTML, JS, CSS, manifest, service worker) es `assets/img/KFL-logo.svg`.
5. **Arquitectura CSS Modular:**
   - `css/global.css` es la única hoja de estilo base compartida por las 11 páginas HTML (`css/styles.css` no debe existir).
   - Cada vista conserva su CSS específico (`css/home.css`, `css/equipos.css`, `css/campeones.css`, `css/mvp.css`, etc.) únicamente para sus componentes exclusivos.
