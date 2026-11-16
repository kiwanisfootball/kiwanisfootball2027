# Instrucciones y Arquitectura del Proyecto: Kiwanis Football League (KFL)

Este repositorio (`kiwanisfootball2027`) es un sitio web estático en producción desplegado en Vercel (`HTML5`, `CSS3`, `JavaScript ES6+ Vanilla`), con **Google Sheets + Google Apps Script como SOT (Source of Truth)** y **Decap CMS (`admin/config.yml`)** como gestor centralizado de contenido y datos JSON sincronizados.

## 1. Arquitectura de Datos: SOT -> JSON -> Decap CMS (NO ALTERAR)
- **SOT (Source of Truth):** Google Sheets + Google Apps Script es la fuente maestra operativa:
  - Contact SOT ID: `1B4Swhn-LgK4AW1qZ3HcXRbtvagYtg15JJ2ZoPbFv0no`
  - Flag SOT ID: `1DqzUx1wACkRe4jYD1iIQR335VM3wZ_aJXRTkKxS66xg`
  - Hojas maestras de Campeones, Récords Varsity, MVPs, Inscripciones autotabuladas y Portal de Coaches.
- **Pipeline Automático hacia Decap CMS:**
  - Los datos deportivos del SOT (marcadores, calendarios, rosters, campeones, MVPs y récords) se exportan/convierten automáticamente a archivos JSON en `data/` (`data/contact-db.json`, `data/flag-db.json`, `data/scores.json`, `data/campeones.json`, `data/mvp.json`, `data/records.json`) mediante `.github/workflows/actualizar-datos.yml`.
  - **Decap CMS (`admin/config.yml`)** gestiona todos estos archivos `data/*.json` (como colecciones `files`) además de los artículos Markdown en `blog/`.
  - El frontend lee estos JSON sincronizados para renderizar tablas, calendarios, rosters, ticker y posiciones (aplicando criterios de desempate en JavaScript).
- **Excepción de Seguridad (Directo al SOT):**
  - El **Portal de Coaches (`coaches.html` + `js/config-coaches.js`)** valida contraseñas directamente contra Google Sheets vía Apps Script. **NUNCA** exportes contraseñas o datos sensibles de coaches a `data/*.json`.
  - **Inscripciones:** Nunca modifiques los encabezados ni el orden de columnas de las hojas de Google Forms.

## 2. Reglas de Diseño y CSS (INQUEBRANTABLES)
1. **Tipografía Fluida (`clamp()`):** Todos los tamaños de fuente (encabezados, párrafos, botones, filtros, encabezados y celdas de tabla) deben implementarse usando `clamp()`.
2. **Soporte Estricto en Móvil (Viewport mínimo `375px` - iPhone SE):**
   - Bajo ninguna circunstancia se permiten textos partidos en doble línea no deseada, truncamientos con puntos suspensivos (`text-overflow: ellipsis` / `...`), ni desalineaciones o desbordamientos rotos en tablas, filtros tipo píldora o tarjetas al renderizar a `375px` de ancho.
   - Ajusta `clamp()`, `padding`, `gap` y contenedores responsivos para que todo encaje limpio en `375px`.
3. **Identidad Visual Intacta:** Conserva exactamente las variables de color en `:root` y las familias tipográficas (`Anton` y `Montserrat`) definidas en `css/global.css`. No inventes colores ni sustituyas fuentes.
4. **Ruta Única del Logo Oficial:** La única ruta válida para el logo de KFL en todo el repositorio es `assets/img/KFL-logo.svg`.
5. **Arquitectura CSS Modular:**
   - `css/global.css` es la única hoja de estilo base compartida por las 11 páginas HTML (`css/styles.css` no debe existir).
   - Cada vista conserva su CSS específico (`css/home.css`, `css/equipos.css`, `css/campeones.css`, `css/mvp.css`, etc.) únicamente para sus componentes exclusivos.
