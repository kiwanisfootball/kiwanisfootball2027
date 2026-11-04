/**
 * ==========================================================================
 * KIWANIS FOOTBALL LEAGUE (KFL) - CONFIGURACIÓN CENTRAL DE LIGAS Y EQUIPOS
 * ==========================================================================
 */

const KFL_CONFIG = {
  // 1. ENDPOINTS DE ROSTERS POR LIGA Y CATEGORÍA
  // Conforme crees las hojas de Juvenil, Mini, Micro y Flag, solo pega su URL aquí:
  API_ROSTERS_URL: {
    "contact": {
      "varsity": "https://script.google.com/macros/s/AKfycbwe9LFwS_FkmGZeUhOVZy3z2hv4RsBfG1SpT81u_oGJ8bESqja7AmkFd64xZT-ZiZp8Zg/exec",
      "juvenil": "https://script.google.com/macros/s/AKfycbwn2o725RO9N1-ra7N768DSo6eZU5Bj1ibMQUswNeZn9tnbZtV3yXSgAjlY89M4PbLrSA/exec",
      "mini": "",    // Pega aquí la URL de Backend Mini Rosters Contact
      "micro": ""    // Pega aquí la URL de Backend Micro Rosters Contact
    },
    "flag": {
      "varsity": "", // Pega aquí la URL de Backend Varsity Rosters Flag
      "juvenil": "", // Pega aquí la URL de Backend Juvenil Rosters Flag
      "mini": "",    // Pega aquí la URL de Backend Mini Rosters Flag
      "micro": ""    // Pega aquí la URL de Backend Micro Rosters Flag
    }
  },

  // 2. URLS DE LOS GESTORES DE CALENDARIO Y TABLAS DE POSICIONES
  API_CALENDARIO_URL: {
    "contact": "https://script.google.com/macros/s/AKfycbwnvxeb53v4jncrIc1Iezdrd-wc4vQoTLUMIR6sDMOEuhp1Q8U9FfQ-RsYQgBdvp3KHxQ/exec",
    "flag": ""
  },

  // 3. URLS PÚBLICOS DE CSV DE ESTADÍSTICAS POR CATEGORÍA
  STATS_CSV_LINKS: {
    "contact": {
      "varsity": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTYknL7eWkp_BnEC3ob9a05Ejt6p2Rfjrk9QWtOd56FL7o398g4JM2BquSi0R8qyzmfIZcqxz6D8I34/pub?gid=835067495&single=true&output=csv",
      "juvenil": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQhQ3iKki3vAUGiJG7kSYUC51dfG9WMPO7HVwrXXNrdsqDcDqTfB2nlVV9wdLz5G_nNYTqKeXHfyuGE/pub?gid=835067495&single=true&output=csv",
      "mini": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQwk7Fn-hQZwWjgckn4Dj20_VRCi72fw0Ygk1TWotaYGBlwfi0aJO6kR_2qhcN1ZeETsSrLev1k-ZR/pub?gid=835067495&single=true&output=csv",
      "micro": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRx22LT7t2dCE64E_1w1kJnV7PlYK7Y9YMmWqVG99UpX-sKkBMqosLo6smVh4QBtlPiGFI8Gxwh1Uex/pub?gid=835067495&single=true&output=csv"
    },
    "flag": {
      "varsity": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRtLR7KV_c_QOFIVal54Rwm3UC1xRlDWGUVz4IOKjAIKpZBNv3eCQ8SZrEbZcQTjk_F8Sj9fA0oQrju/pub?gid=835067495&single=true&output=csv",
      "juvenil": "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGOYtkC2GUu_Doijz1JzOOotTL-RJWwN-YNjhqepCOnE1EjYq9kOvSNm8cPJau9hqLCMCIUfQlSHDj/pub?gid=835067495&single=true&output=csv",
      "mini": "https://docs.google.com/spreadsheets/d/e/2PACX-1vTA6XDCFs8Mt2kFL9MEZyzaKxUun9-r-HN60qH75nB5_tdwWyniQ6UzWx6kpk7_DvncTvZp6AcjFBoV/pub?gid=835067495&single=true&output=csv",
      "micro": ""
    }
  },

  // 4. RUTAS DE LOGOS
  EQUIPOS_LOGOS: {
    "DRAGONS": "assets/logos/dragons.png",
    "EAGLES": "assets/logos/eagles.png",
    "KOLTS": "assets/logos/kolts.png",
    "LIONS": "assets/logos/lions.png",
    "OWLS": "assets/logos/owls.png",
    "RAIDERS": "assets/logos/raiders.png",
    "SPARTANS": "assets/logos/spartans.png"
  },

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
