# 🏈 Kiwanis Football League (KFL) — Plataforma Web Oficial (`kiwanisfootball2027`)

Sitio web oficial, centro de estadísticas, portal de coaches y plataforma de noticias de la **Kiwanis Football League (KFL)** en Panamá.

---

## 📋 Índice

1. [Arquitectura del Sistema](#-arquitectura-del-sistema)
2. [Estructura del Repositorio](#-estructura-del-repositorio)
3. [Flujo de Datos (Google Sheets & Apps Script)](#-flujo-de-datos-google-sheets--apps-script)
4. [Estándares de Diseño y Reglas de Código](#-estándares-de-diseño-y-reglas-de-código)
5. [Guía de Operación y Mantenimiento Anual](#-guía-de-operación-y-mantenimiento-anual)
6. [Despliegue y Desarrollo Local / Codespaces](#-despliegue-y-desarrollo-local--codespaces)

---

## 🏗 Arquitectura del Sistema

El ecosistema de KFL está diseñado bajo una arquitectura híbrida de **bajo costo y alta disponibilidad**, separando la capa de presentación del almacenamiento operativo:

| Capa | Tecnología | Función Principal |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+ Vanilla) | Interfaz web responsiva, renderizado dinámico de tablas, filtros y tickers. |
| **Hosting & CI/CD** | Vercel + GitHub (`main`) | Despliegue automático en cada `push` y ejecución de build (`generate-index.js`). |
| **Backend Primordial** | Google Sheets + Google Apps Script | Base de datos maestra: calendarios, rosters, campeones, récords, inscripciones y contraseñas de coaches. |
| **CMS Editorial** | Decap CMS (`/admin/`) | Gestión de noticias y artículos del blog en formato Markdown (`blog/`). |
| **PWA / Offline** | Service Worker (`sw.js`) | Caché de recursos estáticos críticos para carga rápida en dispositivos móviles. |

---

## 📁 Estructura del Repositorio

```text
kiwanisfootball2027/
├── .github/
│   ├── copilot-instructions.md   # Reglas obligatorias para agentes de IA en el repo
│   └── workflows/                # Automatizaciones de GitHub Actions
├── admin/
│   ├── index.html                # Panel de acceso a Decap CMS
│   └── config.yml                # Configuración de colecciones editoriales (Blog)
├── assets/
│   └── img/
│       └── KFL-logo.svg          # ÚNICA ruta oficial del logotipo de KFL
├── blog/
│   ├── index.json                # Índice compilado automáticamente en el build
│   └── <slug-articulo>/index.md  # Artículos individuales en Markdown + Frontmatter
├── css/
│   ├── global.css                # Hoja de estilo base única (variables, fonts, nav, footer)
│   ├── home.css                  # Estilos exclusivos de index.html
│   ├── equipos.css               # Estilos exclusivos de equipos.html
│   ├── campeones.css             # Estilos exclusivos de campeones.html
│   └── mvp.css                   # Estilos exclusivos de mvp.html
├── js/
│   ├── components.js             # Inyección unificada de Navbar, Footer y PWA
│   ├── config-ligas.js           # Endpoints de Google Apps Script (Contact y Flag)
│   └── config-coaches.js         # Endpoint de autenticación del Portal de Coaches
├── index.html                    # Página principal + Live Score Ticker
├── equipos.html                  # Perfiles de equipos, calendarios, posiciones y rosters
├── campeones.html                # Palmarés histórico y récords Varsity
├── mvp.html                      # Líderes y jugadores más valiosos por categoría
├── coaches.html                  # Portal privado de coaches (autenticado vía Sheets)
├── blog.html                     # Listado general de noticias
├── articulo.html                 # Plantilla dinámica de lectura de artículos
├── conocenos.html                # Historia, misión y estructura organizacional de KFL
├── fotos.html                    # Galería multimedia
├── informacion.html              # Preguntas frecuentes (FAQ), divisiones y contacto
├── total-access.html             # Cobertura especial y contenido multimedia
├── generate-index.js             # Script Node.js que indexa blog/ hacia blog/index.json
├── sw.js                         # Service Worker de la aplicación
├── vercel.json                   # Configuración de rutas y build en Vercel
├── ARCHITECTURE.md               # Manual detallado de continuidad operativa
└── README.md                     # Documentación principal del repositorio
