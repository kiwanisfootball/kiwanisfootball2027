# 🏈 Kiwanis Football League (KFL) — Plataforma Web Oficial (`kiwanisfootball2027`)

Sitio web oficial, centro de estadísticas, portal de coaches y plataforma de noticias de la **Kiwanis Football League (KFL)** en Panamá.

---

## 📋 Índice

1. [Arquitectura del Sistema (SOT → JSON → Decap CMS)](#-arquitectura-del-sistema-sot--json--decap-cms)
2. [Estructura del Repositorio](#-estructura-del-repositorio)
3. [Flujo de Datos Automatizado](#-flujo-de-datos-automatizado)
4. [Estándares de Diseño y Reglas de Código](#-estándares-de-diseño-y-reglas-de-código)
5. [Guía de Operación y Mantenimiento Anual](#-guía-de-operación-y-mantenimiento-anual)
6. [Despliegue y Desarrollo Local / Codespaces](#-despliegue-y-desarrollo-local--codespaces)

---

## 🏗 Arquitectura del Sistema (SOT → JSON → Decap CMS)

El ecosistema de KFL opera bajo un modelo desacoplado donde **Google Sheets + Google Apps Script actúa como el SOT (Source of Truth)** y **Decap CMS** centraliza la gestión visual y publicación estática en Vercel:

| Capa | Tecnología | Función Principal |
| :--- | :--- | :--- |
| **SOT (Source of Truth)** | Google Sheets + Google Apps Script | Base de datos maestra: calendarios, rosters, marcadores, campeones, récords varsity, autotabulación de inscripciones y contraseñas de coaches. |
| **Pipeline de Sincronización** | GitHub Actions (`actualizar-datos.yml`) + Apps Script | Consulta el SOT (CSV/API) por webhook `repository_dispatch`, ejecución manual o cron diario; actualiza `data/*.json` y solo hace *commit* si hay cambios. |
| **CMS Unificado** | Decap CMS (`admin/config.yml`) | Administra tanto las noticias (`blog/`) como todas las tablas deportivas (`data/*.json`) desde `/admin/`. |
| **Frontend & Hosting** | HTML5, CSS3, JS Vanilla + Vercel | Renderiza el sitio estático consumiendo `data/*.json` a máxima velocidad, con desempates calculados en JS. |
| **PWA / Offline** | Service Worker (`sw.js`) | Caché de recursos estáticos críticos para carga rápida en móviles. |

---

## 📁 Estructura del Repositorio

```text
kiwanisfootball2027/
├── .github/
│   ├── copilot-instructions.md       # Reglas obligatorias para agentes de IA en el repo
│   └── workflows/
│       └── actualizar-datos.yml      # Pipeline automático SOT (Google Sheets) -> data/*.json
├── docs/
│   └── apps-script-webhook.gs        # Disparador de repository_dispatch desde Google Sheets
├── admin/
│   ├── index.html                    # Panel de acceso a Decap CMS
│   └── config.yml                    # Configuración integral del CMS (Blog + Tablas JSON)
├── assets/
│   └── img/
│       └── KFL-logo.svg              # ÚNICA ruta oficial del logotipo de KFL
├── blog/
│   ├── index.json                    # Índice compilado automáticamente en el build
│   └── <slug-articulo>/index.md      # Artículos individuales en Markdown + Frontmatter
├── css/
│   ├── global.css                    # Hoja de estilo base única (variables, fonts, nav, footer)
│   ├── home.css                      # Estilos exclusivos de index.html
│   ├── equipos.css                   # Estilos exclusivos de equipos.html
│   ├── campeones.css                 # Estilos exclusivos de campeones.html
│   └── mvp.css                       # Estilos exclusivos de mvp.html
├── data/
│   ├── contact-db.json               # Calendario, rosters y stats Contact (sincronizado desde SOT)
│   ├── flag-db.json                  # Calendario, rosters y stats Flag (sincronizado desde SOT)
│   ├── scores.json                   # Marcadores para el Live Ticker (sincronizado desde SOT)
│   ├── campeones.json                # Historial agrupado por modalidad/categoría (SOT)
│   ├── mvp.json                      # MVP agrupados por modalidad/categoría (SOT)
│   └── records.json                  # Tabla de récords Varsity (sincronizado desde SOT)
├── js/
│   ├── components.js                 # Inyección unificada de Navbar, Footer y PWA
│   ├── config-ligas.js               # URLs públicas del SOT, ligas y reglas de desempate
│   └── config-coaches.js             # Conexión directa al SOT para autenticación de coaches
├── scripts/
│   ├── sync-sot.js                   # Sincronizador de endpoints/CSVs del SOT a JSON públicos
│   └── sync-sot.test.js              # Pruebas de normalización y protección de datos
├── index.html                        # Página principal + Live Score Ticker
├── equipos.html                      # Perfiles de equipos, calendarios, posiciones y rosters
├── campeones.html                    # Historial de campeones por categoría
├── mvp.html                          # Líderes y jugadores más valiosos por categoría
├── coaches.html                      # Portal privado de coaches (autenticado directo contra SOT)
├── blog.html                         # Listado general de noticias
├── articulo.html                     # Plantilla dinámica de lectura de artículos
├── conocenos.html                    # Historia, misión y estructura organizacional de KFL
├── fotos.html                        # Galería multimedia
├── informacion.html                  # Preguntas frecuentes (FAQ), divisiones y contacto
├── total-access.html                 # Cobertura especial y contenido multimedia
├── generate-index.js                 # Script Node.js que indexa blog/ hacia blog/index.json
├── sw.js                             # Service Worker de la aplicación
├── vercel.json                       # Configuración de rutas y build en Vercel
├── ARCHITECTURE.md                   # Manual detallado de continuidad operativa
└── README.md                         # Documentación principal del repositorio
