# Manual de Arquitectura y Continuidad Operativa — Kiwanis Football League (KFL)

Este documento describe cómo opera el ecosistema web de KFL (`kiwanisfootball2027`) para que cualquier administrador técnico futuro pueda mantenerlo, actualizar temporadas o dar soporte sin depender del desarrollador original.

## 1. Mapa General del Sistema
- **Frontend Web:** Sitio estático en HTML5, CSS3 y JavaScript Vanilla alojado en GitHub y desplegado automáticamente en **Vercel** con cada `push` a la rama `main`.
- **Base de Datos Operativa (Backend Primordial):** **Google Sheets + Google Apps Script**. Toda la operación deportiva y administrativa vive en Google Drive/Sheets.
- **Gestor de Noticias (Blog):** **Decap CMS** (`/admin/`), que guarda artículos en formato Markdown dentro de `blog/` y ejecuta `node generate-index.js` durante el build de Vercel para generar `blog/index.json`.

## 2. Flujo de Datos por Módulo (Google Sheets)
1. **Live Score Ticker (`index.html`), Calendarios y Rosters (`equipos.html`):**
   - **Origen:** Google Sheets oficiales de Contact y Flag Football.
   - **Conexión:** Endpoints Web App de Google Apps Script definidos en `js/config-ligas.js`.
   - **Mantenimiento anual:** Al iniciar una nueva temporada, actualizar únicamente los IDs de hojas o URLs de despliegue en `js/config-ligas.js` sin alterar los nombres de las pestañas esperadas por el script.
2. **Tabla de Campeones (`campeones.html`) y Récords Varsity:**
   - **Origen:** Hojas de cálculo históricas publicadas desde Google Sheets.
   - **Mantenimiento:** Agregar nuevas filas al finalizar cada temporada directamente en Google Sheets; la web las refleja automáticamente.
3. **Autotabulación de Inscripciones:**
   - **Origen:** Google Forms conectados a Google Sheets.
   - **Regla crítica:** Nunca cambiar el orden ni el encabezado de las columnas originales en la hoja de respuestas del formulario, ya que los scripts de procesamiento y deduplicación dependen de esas posiciones.
4. **Portal de Coaches (`coaches.html`):**
   - **Origen:** Hoja de control de accesos y contraseñas en Google Sheets gestionada mediante Google Apps Script (`js/config-coaches.js`).
   - **Mantenimiento:** Para dar de alta, baja o cambiar la contraseña de un coach, editar directamente la fila correspondiente en la Google Sheet de Coaches.

## 3. Reglas Técnicas del Frontend
- **Estilos globales:** `css/global.css` contiene las variables de color (`:root`), tipografías (`Anton` y `Montserrat`), barra de navegación, pie de página y componentes comunes.
- **Regla de Responsividad (`375px`):** Todo cambio visual debe probarse en un ancho mínimo de `375px` (iPhone SE) usando `clamp()` para tipografías, evitando cortes de texto en dos líneas, puntos suspensivos (`...`) o desalineaciones en tablas.
- **Logo oficial:** Siempre referenciar `assets/img/KFL-logo.svg`.
