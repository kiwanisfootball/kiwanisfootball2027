# Guía de Mantenimiento de Equipos y Logos KFL

Este repositorio utiliza una arquitectura Jamstack desacoplada. Toda la configuración de ligas, categorías y equipos reside en un solo archivo: `js/config-ligas.js`.

---

## 1. Cómo Agregar un Equipo Nuevo

1. **Subir el Logo:**
   - Guarda el logo en la carpeta: `assets/logos/nombre-equipo.png`
   - Formato requerido: **PNG con fondo transparente**.
   - Dimensiones recomendadas: Lienzo cuadrado de **512 × 512 px**, optimizado (< 100 KB).

2. **Registrar la Ruta en `js/config-ligas.js`:**
   Abre `js/config-ligas.js` y agrégalo en `EQUIPOS_LOGOS`:
   ```javascript
   "TITANS": "assets/logos/titans.png",
