/**
 * ==========================================================================
 * KIWANIS FOOTBALL LEAGUE (KFL) - CONFIGURACIÓN FLAG FOOTBALL (FEMENINO)
 * ==========================================================================
 */

const KFL_FLAG_CONFIG = {
  // 1. ENDPOINT CENTRAL DE CALENDARIO Y TABLAS DE POSICIONES
  API_CALENDARIO_URL: "https://script.google.com/macros/s/AKfycbwiZ73jSuTV6XOXZeSSdQpozBonJfhe7Qg8bi0sjgG78tyEIOSq9ir9ya5sxs4TfBOS/exec",

  // 2. ENDPOINTS DE ROSTERS POR CATEGORÍA
  API_ROSTERS_URL: {
    "varsity": "", // Pega aquí la URL de Backend Varsity Rosters Flag
    "juvenil": "", // Pega aquí la URL de Backend Juvenil Rosters Flag
    "mini": "",    // Pega aquí la URL de Backend Mini Rosters Flag
    "micro": ""    // Pega aquí la URL de Backend Micro Rosters Flag
  },

  // 3. ENLACES PÚBLICOS DE CSV DE ESTADÍSTICAS POR CATEGORÍA
  STATS_CSV_LINKS: {
    "varsity": "",
    "juvenil": "",
    "mini": "",
    "micro": ""
  },

  // 4. EQUIPOS ACTIVOS POR CATEGORÍA FLAG
  CATEGORIAS_EQUIPOS: {
    "varsity": ["OWLS", "KOLTS", "RAIDERS", "DRAGONS", "EAGLES", "SPARTANS", "LIONS"],
    "juvenil": ["OWLS", "KOLTS", "RAIDERS", "DRAGONS", "EAGLES", "LIONS"],
    "mini":    ["OWLS", "KOLTS", "RAIDERS", "SPARTANS", "EAGLES", "LIONS"],
    "micro":   ["OWLS", "RAIDERS", "KOLTS", "LIONS"]
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
  window.KFL_FLAG_CONFIG = KFL_FLAG_CONFIG;
}
