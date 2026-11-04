# Protocolo de Creación de Hojas de Roster por Categoría (KFL)

Sigue este procedimiento para crear y conectar las hojas maestras de **Juvenil**, **Mini**, **Micro** o **Flag** sin tocar código HTML.

---

## Paso 1: Duplicar la Plantilla en Google Drive

1. En tu Google Drive, haz una copia de la hoja `Backend Varsity Rosters Contact`.
2. Renombra la nueva hoja según corresponda:
   - `Backend Juvenil Rosters Contact`
   - `Backend Mini Rosters Contact`
   - `Backend Micro Rosters Contact`
   - `Backend Varsity Rosters Flag`, etc.

---

## Paso 2: Verificar la Estructura de Pestañas

Asegúrate de que la nueva hoja contenga exactamente:

1. **Pestañas de Equipos:** Una pestaña por cada franquicia participante (ej. `KOLTS`, `OWLS`, `RAIDERS`, `DRAGONS`, `EAGLES`), con los encabezados en la Fila 1:
   - `A1: CANTIDAD`
   - `B1: NOMBRE`
   - `C1: APELLIDO`
   - `D1: # DE JERSEY`
   - `E1: CÉDULA`
   - `F1: FECHA DE NACIMIENTO`
   - `G1: FOTO`
   - `H1: [Dejar vacío]`
   - `I1: COACH`
   - `J1: POSICION`

2. **Pestaña `CREDENCIALES`:**
   - Define contraseñas de los coaches para esta categoría.
   - En la **Columna E (`EmailComisionado`)**, puedes escribir múltiples correos separados por comas:  
     `comisionado1@kfl.com, comisionado2@kfl.com`

3. **Pestaña `CONFIG`:**
   - `FechaLimite`: Fecha en formato `DD/MM/AAAA`.
   - `HoraLimite`: Hora en formato 24h (ej: `23:59`).
   - `LimiteRoster`: Cupo máximo de jugadores (ej: `35`, `25`, etc.).

4. **Pestañas de Control:** `AUDIT` y `REGISTROS`.

---

## Paso 3: Pegar el Código y Desplegar la Web App

1. En el menú superior de la hoja, ve a **Extensiones > Apps Script**.
2. Pega el contenido íntegro del archivo universal **`Code.gs`**.
3. Haz clic en **Implementar > Nueva implementación**.
4. Selecciona **Tipo: Aplicación web**.
5. Configuración:
   - **Descripción:** `API Roster KFL`
   - **Ejecutar como:** `Yo (tu correo)`
   - **Quién tiene acceso:** `Cualquier usuario`
6. Haz clic en **Implementar**, autoriza los permisos de Google y copia la **URL generada (terminada en `/exec`)**.

---

## Paso 4: Conectar la URL en `js/config-ligas.js`

Abre `js/config-ligas.js` en tu repositorio y pega la URL en la ranura de su categoría:

```javascript
API_ROSTERS_URL: {
  "contact": {
    "varsity": "URL_DE_VARSITY_AQUI",
    "juvenil": "PEGA_AQUI_LA_URL_DE_JUVENIL",
    "mini":    "PEGA_AQUI_LA_URL_DE_MINI",
    "micro":   "PEGA_AQUI_LA_URL_DE_MICRO"
  }
}
