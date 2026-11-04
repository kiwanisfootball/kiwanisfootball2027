# Guía Maestra: Gestores de Calendario, Posiciones y Panel de Marcadores (KFL)

Esta arquitectura utiliza dos Google Sheets independientes como bases de datos en vivo: uno para **Contact Football** y otro para **Flag Football**.

---

## 1. Despliegue de los Gestores en Google Sheets

1. **Para Contact Football:**
   - Abre la hoja de cálculo de Contact.
   - Ve a **Extensiones > Apps Script**.
   - Pega el código de `GestorContact.gs` y haz clic en **Guardar**.
   - Haz clic en **Implementar > Nueva implementación > Aplicación web**.
   - Configura:
     - **Ejecutar como:** `Yo`
     - **Quién tiene acceso:** `Cualquier usuario`
   - Copia la URL terminada en `/exec` y pégala en `js/config-ligas.js` bajo `API_CALENDARIO_URL.contact`.

2. **Para Flag Football:**
   - Abre la hoja de cálculo de Flag.
   - Pega el código de `GestorFlag.gs` y sigue el mismo proceso de despliegue.
   - Pega la URL en `js/config-ligas.js` bajo `API_CALENDARIO_URL.flag`.

---

## 2. Cómo Entrar al Panel Administrativo de Marcadores (Desde el Celular)

Para registrar o corregir marcadores en vivo desde el campo de juego sin abrir la hoja de cálculo:
* **Contact Admin:** `TU_URL_APPSCRIPT_CONTACT/exec?modulo=admin`
* **Flag Admin:** `TU_URL_APPSCRIPT_FLAG/exec?modulo=admin`

Al seleccionar la categoría, la semana y el partido, ingresas los puntos y presionas **Guardar Marcador**. La web oficial `ligas.html` se actualizará automáticamente con el tag `FINAL` y recalculará la tabla de posiciones.

---

## 3. Mantenimiento de los Criterios de Desempate en el Futuro

En ambos scripts (`GestorContact.gs` y `GestorFlag.gs`), la lógica de ordenamiento está aislada en la función:
```javascript
function aplicarCriteriosDeDesempate(lista) { ... }
