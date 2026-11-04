/**
 * ==========================================================================
 * KIWANIS FOOTBALL LEAGUE (KFL) - CONFIGURACIÓN CENTRAL DE LIGAS Y EQUIPOS
 * ==========================================================================
 */

const KFL_CONFIG = {
  // 1. ENDPOINTS DE BACKEND (GOOGLE APPS SCRIPT)
  API_ROSTERS_URL: "https://script.google.com/macros/s/AKfycbwe9LFwS_FkmGZeUhOVZy3z2hv4RsBfG1SpT81u_oGJ8bESqja7AmkFd64xZT-ZiZp8Zg/exec",
  API_CALENDARIO_URL: "https://script.google.com/macros/s/AKfycbwnvxeb53v4jncrIc1Iezdrd-wc4vQoTLUMIR6sDMOEuhp1Q8U9FfQ-RsYQgBdvp3KHxQ/exec",

  // 2. ENLACES PÚBLICOS DE CSV DE ESTADÍSTICAS POR CATEGORÍA
  STATS_CSV_LINKS: {
    "contact": {
      "varsity": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYknL7eWkp_BnEC3ob9a05Ejt6p2Rfjrk9QWtOd56FL7o398g4JM2BquSi0R8qyzmfIZcqxz6D8I34/pub?gid=835067495&single=true&output=csv",
      "juvenil": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhQ3iKki3vAUGiJG7kSYUC51dfG9WMPO7HVwrXXNrdsqDcDqTfB2nlVV9wdLz5G_nNYTqKeXHfyuGE/pub?gid=835067495&single=true&output=csv",
      "mini": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQwk7Fn-hQZwWjgckn4Dj20_VRCi72fw0Ygk1TWotaYGBlwfi0aJO6kR_2qhcN1ZeETsSrLev1k-ZR/pub?gid=835067495&single=true&output=csv",
      "micro": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRx22LT7t2dCE64E_1w1kJnV7PlYK7Y9YMmWqVG99UpX-sKkBMqosLo6smVh4QBtlPiGFI8Gxwh1Uex/pub?gid=835067495&single=true&output=csv"
    },
    "flag": {
      "varsity": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYknL7eWkp_BnEC3ob9a05Ejt6p2Rfjrk9QWtOd56FL7o398g4JM2BquSi0R8qyzmfIZcqxz6D8I34/pub?gid=835067495&single=true&output=csv",
      "juvenil": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhQ3iKki3vAUGiJG7kSYUC51dfG9WMPO7HVwrXXNrdsqDcDqTfB2nlVV9wdLz5G_nNYTqKeXHfyuGE/pub?gid=835067495&single=true&output=csv",
      "mini": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQwk7Fn-hQZwWjgckn4Dj20_VRCi72fw0Ygk1TWotaYGBlwfi0aJO6kR_2qhcN1ZeETsSrLev1k-ZR/pub?gid=835067495&single=true&output=csv",
      "micro": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRx22LT7t2dCE64E_1w1kJnV7PlYK7Y9YMmWqVG99UpX-sKkBMqosLo6smVh4QBtlPiGFI8Gxwh1Uex/pub?gid=835067495&single=true&output=csv"
    }
  },

  // 3. RUTAS LOCALES DE LOGOS EN EL REPOSITORIO
  EQUIPOS_LOGOS: {
    "DRAGONS": "assets/logos/dragons.png",
    "EAGLES": "assets/logos/eagles.png",
    "KOLTS": "assets/logos/kolts.png",
    "LIONS": "assets/logos/lions.png",
    "OWLS": "assets/logos/owls.png",
    "RAIDERS": "assets/logos/raiders.png",
    "SPARTANS": "assets/logos/spartans.png"
  },

  // 4. LOGOS DE RESPALDO (CDN / FALLBACK)
  FALLBACK_LOGOS: {
    "DRAGONS": "https://i.imgur.com/SP6wgNT.png",
    "EAGLES": "https://i.imgur.com/lxfq565.png",
    "KOLTS": "https://i.imgur.com/id2gPdH.png",
    "LIONS": "https://i.imgur.com/XQaNhUb.png",
    "OWLS": "https://i.imgur.com/KRjk1AV.png",
    "RAIDERS": "https://i.imgur.com/HP1WeCM.png",
    "SPARTANS": "https://i.imgur.com/JGvY0Zk.png"
  },

  // 5. EQUIPOS POR LIGA Y CATEGORÍA
  CATEGORIAS_EQUIPOS: {
    "contact": {
      "varsity": ["KOLTS", "OWLS", "RAIDERS", "DRAGONS", "EAGLES"],
      "juvenil": ["KOLTS", "OWLS", "RAIDERS", "DRAGONS", "EAGLES"],
      "mini":    ["KOLTS", "OWLS", "RAIDERS", "DRAGONS", "EAGLES"],
      "micro":   ["OWLS", "RAIDERS", "EAGLES"]
    },
    "flag": {
      "varsity": ["OWLS", "KOLTS", "RAIDERS", "DRAGONS", "EAGLES", "SPARTANS", "LIONS"],
      "juvenil": ["OWLS", "KOLTS", "RAIDERS", "DRAGONS", "EAGLES", "LIONS"],
      "mini":    ["OWLS", "KOLTS", "RAIDERS", "SPARTANS", "EAGLES", "LIONS"],
      "micro":   ["OWLS", "RAIDERS", "KOLTS", "LIONS"]
    }
  }
};
