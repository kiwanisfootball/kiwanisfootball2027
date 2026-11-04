# Manual Operativo: Gestión de Ligas, Equipos y Rosters (KFL)

Este documento es la guía técnica y operativa para administrar la página `ligas.html` sin tocar código HTML complejo.

---

## 1. Dónde se Configura Cada Cosa

La página `ligas.html` no tiene nombres de equipos ni enlaces quemados en su estructura. Todo se controla desde un solo archivo:
👉 **Ruta:** `js/config-ligas.js`

Allí existen tres bloques principales que puedes editar en cualquier momento:

### A. Asignar Equipos a cada Categoría (`CATEGORIAS_EQUIPOS`)
Determina qué logos aparecen cuando un usuario entra a una liga y categoría.
- Solo debes escribir los nombres de los equipos en mayúsculas dentro de los corchetes correspondientes.
- **Ejemplo:** Si los Dragons ya no juegan en Contact Micro, simplemente borras `"DRAGONS"` de esa lista. Si entran a Flag Varsity, escribes `"DRAGONS"` en esa categoría.

### B. Rutas de los Logos (`EQUIPOS_LOGOS`)
Le indica a la web dónde buscar la imagen local del equipo.
- Formato: `"NOMBRE_EQUIPO": "assets/logos/nombre_archivo.png"`

### C. Enlaces de Estadísticas (`STATS_CSV_LINKS`)
Contiene los enlaces públicos de Google Sheets en formato CSV (`output=csv`) de donde la web extrae los números de los partidos (Rushing, Passing, etc.).

---

## 2. Cómo Agregar un Equipo Nuevo (Paso a Paso)

Cuando ingrese una nueva franquicia a la liga (por ejemplo, "TITANS"):

1. **Guardar el logo en el repositorio:**
   - Sube la imagen a la carpeta `assets/logos/titans.png`.
   - **Reglas obligatorias de la imagen:**
     - Formato: PNG con fondo 100% transparente.
     - Proporción: Cuadrada (ejemplo: 512 × 512 píxeles).
     - Peso: Menor a 100 KB para garantizar carga menor a 1 segundo.

2. **Registrarlo en `js/config-ligas.js`:**
   Abre el archivo y agrega dos líneas:
   - En `EQUIPOS_LOGOS`:
     `"TITANS": "assets/logos/titans.png",`
   - En `FALLBACK_LOGOS` (un respaldo web por si falla el archivo local):
     `"TITANS": "https://i.imgur.com/enlace-de-respaldo.png",`

3. **Asignarlo a sus categorías:**
   Agrega `"TITANS"` en las categorías donde competirá dentro de `CATEGORIAS_EQUIPOS`.

---

## 3. Cómo Funciona el Roster y la Tarjeta de Jugador (Player Card)

- **Lectura Automática:** Al hacer clic en un logo dentro de `ligas.html`, el sistema consulta la pestaña de ese equipo en Google Sheets y dibuja las columnas A, B, C y D (`CANTIDAD`, `NOMBRE`, `APELLIDO`, `# DE JERSEY`).
- **Privacidad Blindada:** Cédulas y fechas de nacimiento permanecen ocultas en la vista pública.
- **Tarjeta de Jugador (Player Card):** Al hacer clic sobre cualquier fila de jugador:
  1. Se abre una ventana emergente con la foto oficial asignada por la liga en la columna G del Google Sheets.
  2. El sistema busca automáticamente el nombre del atleta en las tablas de estadísticas de esa categoría y muestra sus números de temporada (Yardas, Touchdowns, Pases, Tacleadas).
