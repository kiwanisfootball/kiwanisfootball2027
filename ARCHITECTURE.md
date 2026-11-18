# Manual de Arquitectura y Continuidad Operativa — Kiwanis Football League (KFL)

Este documento describe cómo opera el ecosistema web de KFL (`kiwanisfootball2027`) para que cualquier administrador técnico futuro pueda mantenerlo, actualizar temporadas o dar soporte sin depender del desarrollador original.

---

## 1. Mapa General del Sistema (SOT → JSON → Decap CMS)

El sistema funciona bajo una arquitectura desacoplada de 4 capas:

1. **SOT (Source of Truth — Google Sheets + Google Apps Script):**
   * Es la única fuente de verdad operativa de la liga. Toda la captura de datos, inscripciones, marcadores, estadísticas y credenciales de coaches ocurre en Google Drive/Sheets.
2. **Pipeline de Sincronización Automatizada (`actualizar-datos.yml`):**
   * Un workflow de GitHub Actions (`.github/workflows/actualizar-datos.yml`) consulta/exporta los datos del SOT (CSV publicados o endpoints de Apps Script), los convierte a archivos JSON estructurados en `data/` y realiza el *commit* automático únicamente si esos JSON cambiaron.
   * Se ejecuta manualmente, por `repository_dispatch` (`sot-updated`) y como máximo dos veces al día. Los endpoints alternativos se configuran como GitHub Secrets `KFL_*_URL`; si no se configuran se usan las URLs públicas de la configuración/frontend.
   * `KFL_RECORDS_CSV_URL` debe apuntar al CSV público de récords Varsity. Si no está configurado, el pipeline conserva el JSON actual; el repositorio no contiene un endpoint público de récords que se pueda inferir con seguridad.
3. **Gestor Centralizado de Contenido y Datos (`Decap CMS`):**
   * Panel administrativo en `/admin/` (`admin/config.yml`) que permite gestionar tanto las noticias del blog (`blog/`) como auditar o editar de emergencia los archivos `data/*.json` sincronizados desde el SOT.
4. **Frontend Estático y Hosting (`Vercel`):**
   * Sitio web en HTML5, CSS3 y JavaScript Vanilla desplegado automáticamente en Vercel con cada `push` a `main`. Lee los JSON locales de `data/` a máxima velocidad y calcula criterios de desempate en JavaScript.

---

## 2. Flujo de Datos por Módulo

### A. Pipeline Sincronizado (SOT → `data/*.json` → Decap CMS)
* **Calendarios, Rosters y Tabla de Posiciones (`data/contact-db.json` y `data/flag-db.json`):**
  * **Origen SOT:** Hojas maestras de Contact (`1B4Swhn-LgK4AW1qZ3HcXRbtvagYtg15JJ2ZoPbFv0no`) y Flag (`1DqzUx1wACkRe4jYD1iIQR335VM3wZ_aJXRTkKxS66xg`).
  * **Funcionamiento:** Al actualizar resultados o calendarios en Google Sheets, el pipeline regenera los JSON y Decap CMS los expone en `/admin/`. El frontend calcula las tablas de posiciones y desempates en JS (`js/config-ligas.js`).
  * Los rosters se obtienen exclusivamente mediante los endpoints `getPublicRoster` y se filtran a nombre, apellido y dorsal. No se exportan identificaciones, contactos, staff privado, contraseñas ni datos de inscripciones. Las URLs de rosters Flag aún deben configurarse si el SOT las publica.
* **Live Score Ticker (`data/scores.json`):**
  * **Origen SOT:** Pestañas semanales de partidos en Contact y Flag.
  * **Funcionamiento:** Muestra los resultados semanales y activa el carrusel continuo de logos de equipos cuando no hay jornada programada o tras el período de gracia post-temporada.
* **Tabla de Campeones (`data/campeones.json`), Récords Varsity (`data/records.json`) y MVPs (`data/mvp.json`):**
  * **Origen SOT:** Hojas históricas y de líderes en Google Sheets.
  * **Funcionamiento:** Se convierten a JSON en `data/` y quedan disponibles tanto para el renderizado web (`campeones.html`, `mvp.html`, `equipos.html`) como para consulta/edición en Decap CMS.

### B. Flujo Directo al SOT (Tiempo Real / Seguridad)
* **Autotabulación de Inscripciones:**
  * Los formularios de registro envían datos directamente a Google Sheets, donde scripts de Apps Script procesan y deduplican registros por número de identificación.
  * **Regla crítica:** Nunca modificar el orden ni los encabezados de las columnas originales en las hojas de respuestas de Google Forms.
* **Portal de Coaches (`coaches.html` + `js/config-coaches.js`):**
  * Autentica contraseñas y permisos por colegio/categoría en tiempo real contra Google Sheets mediante Google Apps Script.
  * **Regla de seguridad:** Las contraseñas de coaches **nunca** se exportan a `data/*.json` ni se almacenan en el repositorio público.

### C. Flujo Editorial (Decap CMS → Markdown → Build)
* **Blog y Noticias (`blog/`):**
  * Los artículos se redactan desde `/admin/` en formato Markdown con Frontmatter YAML (`blog/<slug>/index.md`).
  * Durante el despliegue en Vercel, `node generate-index.js` compila todos los artículos en `blog/index.json` para `blog.html` y `articulo.html`.

  ### D. Webhook y Secrets del pipeline
  * `docs/apps-script-webhook.gs` envía únicamente el evento `sot-updated`, nunca los valores de celdas. Guarda el token fine-grained en `GITHUB_TOKEN` dentro de Script Properties y crea un activador instalable de edición.
  * El workflow admite URLs de calendario, ticker, rosters, palmarés, MVP y récords Varsity como GitHub Secrets `KFL_*_URL`. No agregues tokens a los archivos del repositorio.

---

## 3. Estándares Técnicos del Frontend (Inquebrantables)

* **CSS Modular:** `css/global.css` es la única hoja de estilo base compartida por las 15 páginas HTML de la raíz (`css/styles.css` está eliminado). Cada página conserva su CSS puntual (`css/home.css`, `css/equipos.css`, `css/campeones.css`, `css/mvp.css`) únicamente para sus componentes exclusivos.
* **Tipografía Fluida (`clamp()`):** Todos los tamaños de fuente deben definirse con `clamp()`.
* **Validación Móvil (`375px` - iPhone SE):** Cero textos partidos en doble línea no deseada, cero puntos suspensivos (`text-overflow: ellipsis` / `...`) y cero desalineaciones en tablas o filtros tipo píldora a `375px` de ancho.
* **Identidad Visual:** Mantener intactas las variables `:root` de colores y las fuentes `Anton` y `Montserrat`.
* **Logo Oficial Único:** Referenciar exclusivamente `assets/img/KFL-logo.svg` en todo el repositorio.

---

## 4. Guía de Relevo y Mantenimiento Anual

1. **Actualizar marcadores, calendarios o estadísticas:** Editar directamente en el **SOT (Google Sheets)**. El workflow sincronizará los JSON hacia Decap CMS y desplegará en Vercel automáticamente.
2. **Cambio de temporada:** Actualizar los IDs de las hojas de cálculo o URLs de despliegue de Apps Script en los *Secrets* de GitHub Actions y en `js/config-ligas.js`, conservando los nombres exactos de las pestañas.
3. **Gestionar accesos de coaches:** Editar la fila del entrenador (usuario/contraseña/colegio) directamente en la Google Sheet de Coaches. El cambio es inmediato.
4. **Publicar noticias:** Ingresar a `https://<dominio-kfl>/admin/` con cuenta autorizada en Decap CMS.
