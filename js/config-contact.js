/**
 * ==========================================================================
 * KIWANIS FOOTBALL LEAGUE (KFL) - CONFIGURACIÓN CONTACT FOOTBALL (MASCULINO)
 * ==========================================================================
 */

const KFL_CONTACT_CONFIG = {
  // 1. ENDPOINT CENTRAL DE CALENDARIO Y TABLAS DE POSICIONES
  API_CALENDARIO_URL: "https://script.google.com/macros/s/AKfycbxU6knUi6orz37wYKqv6hbf3k75l64gwRTxU2yB3LD8DBvRyw02ATEfJFm6rSXFC2WZ/exec",

  // 2. ENDPOINTS DE ROSTERS POR CATEGORÍA
  API_ROSTERS_URL: {
    "varsity": "https://script.google.com/macros/s/AKfycbwe9LFwS_FkmGZeUhOVZy3z2hv4RsBfG1SpT81u_oGJ8bESqja7AmkFd64xZT-ZiZp8Zg/exec",
    "juvenil": "https://script.google.com/macros/s/AKfycbwn2o725RO9N1-ra7N768DSo6eZU5Bj1ibMQUswNeZn9tnbZtV3yXSgAjlY89M4PbLrSA/exec",
    "mini": "",    // Pega aquí la URL de Backend Mini Rosters Contact
    "micro": ""    // Pega aquí la URL de Backend Micro Rosters Contact
  },

  // 3. ENLACES PÚBLICOS DE CSV DE ESTADÍSTICAS POR CATEGORÍA
  STATS_CSV_LINKS: {
    "varsity": "",
    "juvenil": "",
    "mini": "",
    "micro": ""
  },

  // 4. EQUIPOS ACTIVOS POR CATEGORÍA
  CATEGORIAS_EQUIPOS: {
    "varsity": ["KOLTS", "OWLS", "RAIDERS", "DRAGONS", "EAGLES"],
    "juvenil": ["KOLTS", "OWLS", "RAIDERS", "DRAGONS", "EAGLES"],
    "mini":    ["KOLTS", "OWLS", "RAIDERS", "DRAGONS", "EAGLES"],
    "micro":   ["OWLS", "RAIDERS", "EAGLES"]
  },

  // 5. RUTAS LOCALES DE LOGOS
  EQUIPOS_LOGOS: {
    "DRAGONS": "assets/logos/dragons.png",
    "EAGLES": "assets/logos/eagles.png",
    "KOLTS": "assets/logos/kolts.png",
    "LIONS": "assets/logos/lions.png",
    "OWLS": "assets/logos/owls.png",
    "RAIDERS": "assets/logos/raiders.png",
    "SPARTANS": "assets/logos/spartans.png"
  },

  // 6. LOGOS FALLBACK (RESPALDO CDN)
  FALLBACK_LOGOS: {
    "DRAGONS": "https://i.imgur.com/SP6wgNT.png",
    "EAGLES": "https://i.imgur.com/lxfq565.png",
    "KOLTS": "https://i.imgur.com/id2gPdH.png",
    "LIONS": "https://i.imgur.com/XQaNhUb.png",
    "OWLS": "https://i.imgur.com/KRjk1AV.png",
    "RAIDERS": "https://i.imgur.com/HP1WeCM.png",
    "SPARTANS": "https://i.imgur.com/JGvY0Zk.png"
  }
};

// Exposición global garantizada
if (typeof window !== 'undefined') {
  window.KFL_CONTACT_CONFIG = KFL_CONTACT_CONFIG;
}
