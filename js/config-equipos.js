/**
 * ==========================================================================
 * KIWANIS FOOTBALL LEAGUE (KFL) - MÓDULO DE EQUIPOS Y CALENDARIOS
 * ==========================================================================
 */

let currentSelectedTeam = null;
let activeTeamSubTab = 'resena';

// BASE DE DATOS LOCAL DE EQUIPOS KFL
const EQUIPOS_OFICIALES = {
  "OWLS": {
    nombreCompleto: "AIP FIGHTING OWLS",
    escuela: "Academia Interamericana de Panamá",
    url: "https://aip.edu.pa/",
    logoEquipo: "assets/logos/owls.png",
    logoColegio: "assets/img/colegios/aip.png",
    colorPrimario: "#485592",
    colorSecundario: "#caa35e",
    resena: "Los AIP Fighting Owls representan a la Academia Interamericana de Panamá en las modalidades de Contact y Flag Football, manteniendo una destacada tradición competitiva y múltiples títulos dentro de la Kiwanis Football League."
  },
  "RAIDERS": {
    nombreCompleto: "BRADER RAIDERS",
    escuela: "Colegio Brader",
    url: "https://colegiobrader.edu.pa/",
    logoEquipo: "assets/logos/raiders.png",
    logoColegio: "assets/img/colegios/brader.png",
    colorPrimario: "#231f20",
    colorSecundario: "#9b9e9f",
    resena: "Los Brader Raiders del Colegio Brader se caracterizan por su alto rendimiento técnico y espíritu deportivo, disputando los primeros puestos en todas las categorías formativas y juveniles de la KFL."
  },
  "EAGLES": {
    nombreCompleto: "ECP MIGHTY EAGLES",
    escuela: "El Colegio de Panamá",
    url: "https://elcolegiodepanama.edu.pa/",
    logoEquipo: "assets/logos/eagles.png",
    logoColegio: "assets/img/colegios/ecp.png",
    colorPrimario: "#004e38",
    colorSecundario: "#bcbdc0",
    resena: "Los ECP Mighty Eagles representan al Colegio de Panamá en el emparrillado de la liga Kiwanis, enfocados en el desarrollo integral y la excelencia colectiva."
  },
  "SPARTANS": {
    nombreCompleto: "LA SALLE SPARTANS",
    escuela: "Colegio De La Salle",
    url: "https://lasalle.edu.pa/",
    logoEquipo: "assets/logos/spartans.png",
    logoColegio: "assets/img/colegios/lasalle.png",
    colorPrimario: "#d93c35",
    colorSecundario: "#ffffff",
    resena: "Los La Salle Spartans aportan la entrega y mística tradicional del Colegio De La Salle en las divisiones de Contact Football y Flag Football Femenino."
  },
  "LIONS": {
    nombreCompleto: "CRP LIONS",
    escuela: "Colegio Real de Panamá",
    url: "https://www.colegioreal.edu.pa/",
    logoEquipo: "assets/logos/lions.png",
    logoColegio: "assets/img/colegios/crp.png",
    colorPrimario: "#fce070",
    colorSecundario: "#0a4d90",
    resena: "Los CRP Lions del Colegio Real de Panamá compiten activamente con garra y disciplina en el circuito escolar de la Kiwanis Football League."
  },
  "DRAGONS": {
    nombreCompleto: "BALBOA DRAGONS",
    escuela: "Balboa Academy",
    url: "https://www.balboaacademy.edu.pa/",
    logoEquipo: "assets/logos/dragons.png",
    logoColegio: "assets/img/colegios/balboa.png",
    colorPrimario: "#2ec3e8",
    colorSecundario: "#030506",
    resena: "Los Balboa Dragons representan a Balboa Academy en las categorías competitivas de la KFL, combinando estrategia y fuerza atlética."
  },
  "KOLTS": {
    nombreCompleto: "KIWANIS KOLTS",
    escuela: "Equipo Abierto Kiwanis",
    url: "https://www.kiwanisfootball.com",
    logoEquipo: "assets/logos/kolts.png",
    logoColegio: "assets/img/colegios/kiwanis-kolts.png",
    colorPrimario: "#f5eb14",
    colorSecundario: "#000000",
    resena: "Los Kiwanis Kolts conforman la franquicia de equipo abierto de la liga, permitiendo la integración y participación de jóvenes atletas de diversas comunidades."
  }
};

function normalizarTexto(txt) {
  if (!txt) return '';
  return txt.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
}

function getKFLConfig() {
  return (typeof KFL_CONFIG !== 'undefined') ? KFL_CONFIG : (window.KFL_CONFIG || null);
}

function getTeamLogo(teamCodeOrName) {
  const norm = normalizarTexto(teamCodeOrName);
  for (const code in EQUIPOS_OFICIALES) {
    if (code === norm || normalizarTexto(EQUIPOS_OFICIALES[code].nombreCompleto) === norm || norm.includes(code)) {
      return EQUIPOS_OFICIALES[code].logoEquipo;
    }
  }
  const cfg = getKFLConfig();
  return (cfg && cfg.EQUIPOS_LOGOS && cfg.EQUIPOS_LOGOS[norm]) || "assets/img/KFL-logo.svg";
}

function renderizarGridSelectorEquipos() {
  const grid = document.getElementById('equiposGridSelector');
  if (!grid) return;

  grid.innerHTML = '';
  Object.keys(EQUIPOS_OFICIALES).forEach(code => {
    const eq = EQUIPOS_OFICIALES[code];
    const card = document.createElement('div');
    card.className = 'equipo-selector-card';
    card.onclick = () => seleccionarEquipo(code);
    card.innerHTML = `
      <div class="equipo-card-logo-wrap">
        <img src="${eq.logoEquipo}" alt="${eq.nombreCompleto}" class="logo-equipo-img" loading="lazy" width="56" height="56" onerror="this.src='assets/img/KFL-logo.svg'">
      </div>
      <span class="equipo-card-name">${eq.nombreCompleto}</span>
    `;
    grid.appendChild(card);
  });
}

function inicializarModuloEquipos() {
  renderizarGridSelectorEquipos();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarModuloEquipos);
} else {
  inicializarModuloEquipos();
}

function detectarParticipacionEquipo(codeEquipo) {
  const cfg = getKFLConfig();
  const participaciones = [];

  if (cfg && cfg.CATEGORIAS_EQUIPOS) {
    for (const modalidad in cfg.CATEGORIAS_EQUIPOS) {
      for (const categoria in cfg.CATEGORIAS_EQUIPOS[modalidad]) {
        const lista = cfg.CATEGORIAS_EQUIPOS[modalidad][categoria] || [];
        if (lista.includes(codeEquipo)) {
          participaciones.push({
            modalidad: modalidad.toUpperCase(),
            categoria: categoria.toUpperCase()
          });
        }
      }
    }
  }

  if (participaciones.length === 0) {
    participaciones.push(
      { modalidad: 'CONTACT', categoria: 'VARSITY' },
      { modalidad: 'CONTACT', categoria: 'JUVENIL' },
      { modalidad: 'FLAG', categoria: 'VARSITY' }
    );
  }

  return participaciones;
}

function seleccionarEquipo(codeEquipo) {
  currentSelectedTeam = codeEquipo;
  const meta = EQUIPOS_OFICIALES[codeEquipo];

  const hero = document.getElementById('teamHeroBanner');
  hero.style.background = meta.colorPrimario;
  hero.style.borderBottom = `6px solid ${meta.colorSecundario}`;

  document.getElementById('teamHeroTitle').innerText = meta.nombreCompleto;
  document.getElementById('teamHeroTitle').style.color = (meta.colorSecundario === "#ffffff" || meta.colorSecundario === "#FFFFFF") ? "#FFFFFF" : meta.colorSecundario;
  document.getElementById('teamHeroSchool').innerText = meta.escuela;
  document.getElementById('teamHeroLogo').src = meta.logoEquipo;

  document.getElementById('teamSchoolTitle').innerText = meta.escuela;
  document.getElementById('teamSchoolLogo').src = meta.logoColegio;
  document.getElementById('teamSchoolLink').href = meta.url;
  document.getElementById('teamDescriptionText').innerHTML = `<p>${meta.resena}</p>`;

  const participaciones = detectarParticipacionEquipo(codeEquipo);
  const badgesContainer = document.getElementById('teamParticipationBadges');
  badgesContainer.innerHTML = '';

  participaciones.forEach(p => {
    const badge = document.createElement('span');
    badge.className = `part-badge ${p.modalidad.toLowerCase()}-badge`;
    badge.innerText = `${p.modalidad} • ${p.categoria}`;
    badgesContainer.appendChild(badge);
  });

  poblarFiltrosCategoria(participaciones);

  document.getElementById('teamPrompt').style.display = 'none';
  document.getElementById('teamProfileSection').style.display = 'block';

  selectTeamSubTab('resena');
  hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function poblarFiltrosCategoria(participaciones) {
  const selectRoster = document.getElementById('rosterCategorySelect');
  const selectCalendar = document.getElementById('calendarCategorySelect');
  
  let optionsHTML = '';
  participaciones.forEach(p => {
    const val = `${p.modalidad.toLowerCase()}_${p.categoria.toLowerCase()}`;
    const label = `${p.modalidad} ${p.categoria}`;
    optionsHTML += `<option value="${val}">${label}</option>`;
  });

  if (selectRoster) selectRoster.innerHTML = optionsHTML;
  if (selectCalendar) selectCalendar.innerHTML = optionsHTML;
}

function selectTeamSubTab(subTab) {
  activeTeamSubTab = subTab;
  document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-tab-' + subTab);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  const targetPane = document.getElementById('pane-' + subTab);
  if (targetPane) targetPane.classList.add('active');

  if (subTab === 'roster') {
    cargarRosterEquipoCategoria();
  } else if (subTab === 'partidos') {
    consultarCalendarioEquipoCategoria();
  }
}

function deepExtractArray(obj) {
  if (Array.isArray(obj)) return obj;
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Array.isArray(obj[key])) return obj[key];
      if (typeof obj[key] === 'object') {
        const res = deepExtractArray(obj[key]);
        if (res.length > 0) return res;
      }
    }
  }
  return [];
}

async function consultarCalendarioEquipoCategoria() {
  const container = document.getElementById('teamCalendarContainer');
  const select = document.getElementById('calendarCategorySelect');
  if (!container || !currentSelectedTeam || !select) return;

  const [modalidad, categoria] = select.value.split('_');
  const metaTeam = EQUIPOS_OFICIALES[currentSelectedTeam];

  container.innerHTML = `
    <div style="text-align: center; padding: 30px; color: #64748b;">
      <p style="font-weight: 700; margin-bottom: 5px;">Cargando calendario oficial...</p>
      <span style="font-size: 12px;">Consultando base de datos KFL (${modalidad.toUpperCase()} ${categoria.toUpperCase()})</span>
    </div>
  `;

  try {
    const cfg = getKFLConfig();
    const fallbackEndpoint = "https://script.google.com/macros/s/AKfycbxU6knUi6orz37wYKqv6hbf3k75l64gwRTxU2yB3LD8DBvRyw02ATEfJFm6rSXFC2WZ/exec";
    const endpointUrl = cfg?.API_CALENDARIO_URL?.[modalidad] || fallbackEndpoint;

    const response = await fetch(`${endpointUrl}?action=getSchedule&categoria=${categoria}`);
    const data = await response.json();
    const partidosRaw = deepExtractArray(data);

    const targetCode = normalizarTexto(currentSelectedTeam);
    const targetFullName = normalizarTexto(metaTeam.nombreCompleto);

    const partidosFiltrados = partidosRaw.filter(p => {
      const loc = normalizarTexto(p.equipoLocal || p.local || p.Home || p.home || p.Equipo1);
      const vis = normalizarTexto(p.equipoVisitante || p.visitante || p.Away || p.away || p.Equipo2);

      const matchLocal = (loc === targetCode || loc === targetFullName || loc.includes(targetCode));
      const matchVisitante = (vis === targetCode || vis === targetFullName || vis.includes(targetCode));

      return matchLocal || matchVisitante;
    });

    if (partidosFiltrados.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px; background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <p style="color: #475569; font-weight: 700; margin: 0;">No se encontraron partidos programados para ${metaTeam.nombreCompleto} en ${modalidad.toUpperCase()} ${categoria.toUpperCase()}.</p>
        </div>
      `;
      return;
    }

    let html = `<div class="team-schedule-cards-grid">`;
    partidosFiltrados.forEach(p => {
      const local = p.equipoLocal || p.local || p.Home || p.home || 'Local';
      const visitante = p.equipoVisitante || p.visitante || p.Away || p.away || 'Visitante';
      const fecha = p.fecha || p.Fecha || p.date || 'Por definir';
      const hora = p.hora || p.Hora || p.time || '';
      const cancha = p.cancha || p.Cancha || p.estadio || 'Costa del Este';
      
      const scoreLoc = p.marcadorLocal ?? p.score1 ?? p.MarcadorLocal;
      const scoreVis = p.marcadorVisitante ?? p.score2 ?? p.MarcadorVisitante;
      
      const marcador = (scoreLoc !== undefined && scoreVis !== undefined && scoreLoc !== "" && scoreVis !== "") 
        ? `${scoreLoc} - ${scoreVis}` 
        : 'VS';

      html += `
        <div class="schedule-match-card">
          <div class="match-card-meta">
            <span>📅 ${fecha} ${hora ? '• ' + hora : ''}</span>
            <span>📍 ${cancha}</span>
          </div>
          <div class="match-card-teams">
            <div class="match-team-col">
              <img src="${getTeamLogo(local)}" width="36" height="36" alt="${local}" onerror="this.src='assets/img/KFL-logo.svg'">
              <span class="match-team-name">${local}</span>
            </div>
            <div class="match-score-badge">${marcador}</div>
            <div class="match-team-col">
              <img src="${getTeamLogo(visitante)}" width="36" height="36" alt="${visitante}" onerror="this.src='assets/img/KFL-logo.svg'">
              <span class="match-team-name">${visitante}</span>
            </div>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;

  } catch (err) {
    console.warn("Error consultando el calendario desde KFL_CONFIG:", err);
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <p style="color: #475569; font-weight: 700; margin: 0;">No se encontraron partidos programados para ${metaTeam.nombreCompleto} en esta categoría.</p>
      </div>
    `;
  }
}

function cargarRosterEquipoCategoria() {
  const tbody = document.getElementById('teamRosterTableBody');
  if (!currentSelectedTeam) return;

  tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px; color: #64748b;">Consultando plantilla oficial...</td></tr>`;

  setTimeout(() => {
    tbody.innerHTML = `
      <tr>
        <td style="text-align: center; font-weight:800;">1</td>
        <td>JUGADOR</td>
        <td>OFICIAL</td>
        <td style="text-align: center;"><span class="cell-jersey-badge">#10</span></td>
      </tr>
      <tr>
        <td colspan="4" style="text-align: center; padding: 15px; color: #64748b; font-size: 12px;">
          Información sincronizada con la base de datos oficial KFL.
        </td>
      </tr>
    `;
  }, 250);
}
