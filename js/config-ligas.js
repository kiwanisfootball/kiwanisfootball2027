/**
 * ==========================================================================
 * KIWANIS FOOTBALL LEAGUE (KFL) - CONFIGURACIÓN CENTRAL DE LIGAS Y EQUIPOS
 * ==========================================================================
 */

const KFL_CONFIG = {
  // 1. ENDPOINTS DE LOS GESTORES DE CALENDARIOS Y TABLAS EN VIVO
  API_CALENDARIO_URL: {
    "contact": "https://script.google.com/macros/s/AKfycbxU6knUi6orz37wYKqv6hbf3k75l64gwRTxU2yB3LD8DBvRyw02ATEfJFm6rSXFC2WZ/exec",
    "flag": "https://script.google.com/macros/s/AKfycbwiZ73jSuTV6XOXZeSSdQpozBonJfhe7Qg8bi0sjgG78tyEIOSq9ir9ya5sxs4TfBOS/exec"
  },

  // 2. ENDPOINTS DE ROSTERS POR CATEGORÍA (GOOGLE APPS SCRIPT CMS)
  API_ROSTERS_URL: {
    "contact": {
      "varsity": "https://script.google.com/macros/s/AKfycbwe9LFwS_FkmGZeUhOVZy3z2hv4RsBfG1SpT81u_oGJ8bESqja7AmkFd64xZT-ZiZp8Zg/exec",
      "juvenil": "",
      "mini": "",
      "micro": ""
    },
    "flag": {
      "varsity": "",
      "juvenil": "",
      "mini": "",
      "micro": ""
    }
  },

  // 3. ENLACES PÚBLICOS DE CSV DE ESTADÍSTICAS POR CATEGORÍA
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

  // 4. RUTAS DE LOGOS LOCALES
  EQUIPOS_LOGOS: {
    "DRAGONS": "assets/logos/dragons.png",
    "EAGLES": "assets/logos/eagles.png",
    "KOLTS": "assets/logos/kolts.png",
    "LIONS": "assets/logos/lions.png",
    "OWLS": "assets/logos/owls.png",
    "RAIDERS": "assets/logos/raiders.png",
    "SPARTANS": "assets/logos/spartans.png"
  },

  // 5. LOGOS DE RESPALDO (CDN)
  FALLBACK_LOGOS: {
    "DRAGONS": "https://i.imgur.com/SP6wgNT.png",
    "EAGLES": "https://i.imgur.com/lxfq565.png",
    "KOLTS": "https://i.imgur.com/id2gPdH.png",
    "LIONS": "https://i.imgur.com/XQaNhUb.png",
    "OWLS": "https://i.imgur.com/KRjk1AV.png",
    "RAIDERS": "https://i.imgur.com/HP1WeCM.png",
    "SPARTANS": "https://i.imgur.com/JGvY0Zk.png"
  },

  // 6. EQUIPOS POR LIGA Y CATEGORÍA
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
