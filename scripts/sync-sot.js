'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const CATEGORIES = ['varsity', 'juvenil', 'mini', 'micro'];
const HISTORY_CATEGORIES = {
  contact: ['varsity', 'juvenil', 'mini', 'micro'],
  flag: ['varsity', 'juvenil', 'mini', 'micro']
};

const CALENDAR_FIELDS = [
  'sheetName', 'rowIndex', 'week', 'date', 'time', 'field', 'home', 'away',
  'isJamboree', 'hasScore', 'scoreH', 'scoreA'
];
const STANDING_FIELDS = [
  'equipo', 'jj', 'jg', 'jp', 'je', 'pts', 'pf', 'pc', 'dif', 'h2h', 'rank'
];
const SCORE_FIELDS = [
  'h', 'v', 'sL', 'sV', 'cat', 'modalidad', 'sem', 'active', 'final', 'dia', 'hora'
];
const ROSTER_FIELDS = ['nombre', 'apellido', 'jersey'];

function readKflConfig() {
  const configPath = path.join(ROOT, 'js', 'config-ligas.js');
  const source = `${fs.readFileSync(configPath, 'utf8')}\nthis.__KFL_CONFIG = KFL_CONFIG;`;
  const context = {};
  vm.runInNewContext(source, context, { timeout: 1000, filename: configPath });
  return context.__KFL_CONFIG;
}

function parseCSV(input) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const text = String(input || '').replace(/^\uFEFF/, '');

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(cell.trim());
      if (row.some(value => value !== '')) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(value => value !== '')) rows.push(row);
  return rows;
}

function cleanString(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  return String(value).trim();
}

function cleanNumber(value) {
  if (value === '' || value === null || value === undefined) return '';
  const number = Number(value);
  return Number.isFinite(number) ? number : '';
}

function cleanBoolean(value) {
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'yes', 'si', 'sí'].includes(String(value).trim().toLowerCase());
}

function uniqueRecords(records) {
  const unique = new Map();
  for (const record of records) {
    const key = JSON.stringify(record);
    if (!unique.has(key)) unique.set(key, record);
  }
  return [...unique.values()];
}

function pickFields(source, fields) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return {};
  const result = {};
  for (const key of fields) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    const value = source[key];
    if (['scoreH', 'scoreA', 'sL', 'sV'].includes(key)) {
      result[key] = cleanString(value);
    } else if (['rowIndex', 'jj', 'jg', 'jp', 'je', 'pts', 'pf', 'pc', 'dif', 'rank'].includes(key)) {
      result[key] = cleanNumber(value);
    } else if (['hasScore', 'isJamboree', 'active', 'final'].includes(key)) {
      result[key] = cleanBoolean(value);
    } else if (key === 'h2h' && value && typeof value === 'object' && !Array.isArray(value)) {
      result.h2h = Object.fromEntries(
        Object.entries(value)
          .filter(([team, score]) => /^[A-Z0-9 _-]{1,30}$/i.test(team) && Number.isFinite(Number(score)))
          .map(([team, score]) => [team, Number(score)])
      );
    } else {
      const text = cleanString(value);
      if (text) result[key] = text;
    }
  }
  return result;
}

function findCategory(source, category) {
  if (!source || typeof source !== 'object' || Array.isArray(source)) return null;
  const key = Object.keys(source).find(candidate => candidate.toLowerCase() === category);
  return key ? source[key] : null;
}

function unwrapPayload(payload) {
  let value = payload;
  for (let depth = 0; depth < 3; depth += 1) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const wrapper = value.data || value.result;
      if (wrapper && typeof wrapper === 'object') {
        value = wrapper;
        continue;
      }
    }
    break;
  }
  return value;
}

function normalizeLeagueDatabase(payload, league) {
  const root = unwrapPayload(payload);
  const leagueData = findCategory(root, league) || root;
  const database = {};

  for (const category of CATEGORIES) {
    const source = findCategory(leagueData, category);
    if (!source) {
      database[category] = { partidos: [], tabla: [], rosters: [] };
      continue;
    }

    const matches = source.partidos || source.matches || source.calendario || (Array.isArray(source) ? source : []);
    const standings = source.tabla || source.standings || source.posiciones || [];
    database[category] = {
      partidos: Array.isArray(matches) ? matches.map(row => pickFields(row, CALENDAR_FIELDS)) : [],
      tabla: Array.isArray(standings) ? standings.map(row => pickFields(row, STANDING_FIELDS)) : [],
      rosters: []
    };
  }

  return database;
}

function normalizePublicRoster(payload) {
  if (!payload || payload.status !== 'success') return null;
  const players = Array.isArray(payload.players) ? payload.players : payload.roster;
  if (!Array.isArray(players)) return null;
  return {
    players: players.map(player => {
      const safe = {};
      if (player && typeof player === 'object') {
        for (const [target, aliases] of Object.entries({
          nombre: ['nombre', 'name'],
          apellido: ['apellido', 'lastName'],
          jersey: ['dorsal', 'jersey']
        })) {
          const field = aliases.find(alias => Object.prototype.hasOwnProperty.call(player, alias));
          if (field) safe[target] = cleanString(player[field]);
        }
      }
      return safe;
    }).filter(player => player.nombre || player.apellido || player.jersey)
  };
}

function normalizeScores(payload) {
  const source = Array.isArray(payload) ? { matches: payload } : (payload || {});
  const matches = Array.isArray(source.matches) ? source.matches : [];
  return {
    currentWeek: cleanString(source.currentWeek),
    matches: matches.map(match => pickFields(match, SCORE_FIELDS))
  };
}

function normalizeCsvRecords(rows, kind, modality, category) {
  let lastSeason = '';
  const output = [];
  for (const row of rows) {
    const season = cleanString(row[0]);
    const team = cleanString(row[1]);
    const third = cleanString(row[2]);
    const firstCell = season.toLowerCase();
    const secondCell = team.toLowerCase();
    if (['season', 'año', 'ano', 'year'].some(header => firstCell.includes(header) || secondCell.includes(header))) continue;
    if (season) lastSeason = season;
    const currentSeason = season || lastSeason;

    if (kind === 'champions') {
      if (!team || secondCell.includes('campeon')) continue;
      output.push({ modalidad: modality, categoria: category, season: currentSeason, campeon: team, subcampeon: third });
    } else if (team && third && !['equipo', 'team'].includes(secondCell)) {
      output.push({ modalidad: modality, categoria: category, season: currentSeason, equipo: team, jugador: third });
    }
  }
  return uniqueRecords(output);
}

function normalizeRecordsCSV(rows) {
  if (rows.length < 2) return [];
  const headerAliases = {
    category: ['category', 'categoria', 'división', 'division'],
    statistic: ['statistic', 'estadística', 'estadistica', 'record', 'récord', 'record type', 'marca'],
    holder: ['holder', 'record holder', 'titular', 'jugador', 'player'],
    team: ['team', 'equipo'],
    season: ['season', 'temporada', 'año', 'ano', 'year'],
    mark: ['mark', 'value', 'marca', 'valor', 'record value', 'récord']
  };
  const headers = rows[0].map(value => value.toLowerCase().trim());
  const columns = Object.fromEntries(Object.entries(headerAliases).map(([field, aliases]) => [
    field,
    headers.findIndex(header => aliases.includes(header))
  ]));
  if (columns.statistic < 0 || columns.mark < 0) {
    throw new Error('El CSV de récords debe incluir encabezados de estadística y marca/valor.');
  }

  return rows.slice(1).map(row => {
    const item = {};
    for (const field of Object.keys(columns)) {
      const index = columns[field];
      if (index >= 0 && cleanString(row[index])) item[field] = cleanString(row[index]);
    }
    return item;
  }).filter(item => item.statistic && item.mark);
}

async function fetchText(url, label) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`${label}: HTTP ${response.status}`);
  const body = await response.text();
  if (!body.trim() || /^\s*</.test(body)) throw new Error(`${label}: la respuesta no contiene datos válidos.`);
  return body;
}

async function fetchJson(url, label) {
  const text = await fetchText(url, label);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label}: JSON inválido (${error.message}).`);
  }
}

function appendQuery(url, params) {
  const parsed = new URL(url);
  for (const [key, value] of Object.entries(params)) parsed.searchParams.set(key, value);
  return parsed.toString();
}

function getRosterEndpoint(config, league, category) {
  return config.API_ROSTERS_URL[league][category];
}

async function fetchRosters(config, league, database) {
  const requests = [];
  for (const category of CATEGORIES) {
    const endpoint = getRosterEndpoint(config, league, category);
    if (!endpoint) continue;
    const teams = config.CATEGORIAS_EQUIPOS[league][category] || [];
    for (const teamCode of teams) {
      requests.push(async () => {
        const url = appendQuery(endpoint, { action: 'getPublicRoster', sheetName: teamCode });
        const result = normalizePublicRoster(await fetchJson(url, `Roster ${league}/${category}/${teamCode}`));
        if (result && result.players.length) database[category].rosters.push({ team: teamCode, ...result });
      });
    }
  }

  let next = 0;
  const workers = Array.from({ length: Math.min(5, requests.length) }, async () => {
    while (next < requests.length) {
      const index = next;
      next += 1;
      try {
        await requests[index]();
      } catch (error) {
        console.warn(`Aviso: ${error.message}`);
      }
    }
  });
  await Promise.all(workers);
}

async function fetchLeague(config, league) {
  const url = config.API_CALENDARIO_URL[league];
  const payload = await fetchJson(appendQuery(url, { modulo: 'all_data' }), `Calendario ${league}`);
  const database = normalizeLeagueDatabase(payload, league);
  const hasData = Object.values(database).some(category => category &&
    ((Array.isArray(category.partidos) && category.partidos.length) ||
     (Array.isArray(category.tabla) && category.tabla.length)));
  if (!hasData) throw new Error(`Calendario ${league}: el SOT no devolvió partidos ni posiciones; se cancela la escritura.`);
  database.teams = config.CATEGORIAS_EQUIPOS[league];
  return database;
}

async function fetchScores(config) {
  const payload = await fetchJson(config.API_SCORES_URL, 'Scores ticker');
  return normalizeScores(payload);
}

async function fetchCsvCollection(sources, kind) {
  const entries = [];
  for (const [modality, categories] of Object.entries(sources)) {
    if (!categories || typeof categories !== 'object' || Array.isArray(categories)) continue;
    for (const [category, url] of Object.entries(categories)) {
      if (url === undefined || url === null || (typeof url === 'string' && !url.trim())) continue;
      if (typeof url !== 'string') {
        throw new Error(`URL inválida para ${kind} ${modality}/${category}.`);
      }
      entries.push({ modality, category, url: url.trim() });
    }
  }
  const results = await Promise.all(entries.map(async entry => {
    try {
      const rows = parseCSV(await fetchText(entry.url, `${kind} ${entry.modality}/${entry.category}`));
      return { ...entry, rows: normalizeCsvRecords(rows, kind, entry.modality, entry.category) };
    } catch (error) {
      console.warn(`Aviso: ${error.message}`);
      return { ...entry, error: true, rows: [] };
    }
  }));
  return {
    records: results.flatMap(result => result.rows),
    failedCategories: results.filter(result => result.error).map(result => `${result.modality}/${result.category}`)
  };
}

function groupedHistoryRecords(freshRecords, oldData, failedCategories) {
  const failed = new Set(failedCategories);
  const oldRecords = existingRecords(oldData);
  const grouped = Object.fromEntries(
    Object.entries(HISTORY_CATEGORIES).map(([league, categories]) => [
      league,
      Object.fromEntries(categories.map(category => [category, []]))
    ])
  );

  for (const [league, categories] of Object.entries(HISTORY_CATEGORIES)) {
    for (const category of categories) {
      const sourceKey = `${league}/${category}`;
      const records = failed.has(sourceKey)
        ? Array.isArray(oldData?.[league]?.[category])
          ? oldData[league][category]
          : oldRecords.filter(record =>
            record.modalidad === league && record.categoria === category)
        : freshRecords.filter(record =>
          record.modalidad === league && record.categoria === category);
      grouped[league][category] = uniqueRecords(records)
        .map(({ modalidad, categoria, ...record }) => record);
    }
  }
  return grouped;
}

function preserveExistingRosters(database, existingDatabase) {
  for (const category of CATEGORIES) {
    const storedRosters = existingDatabase?.[category]?.rosters;
    if (!storedRosters || typeof storedRosters !== 'object') continue;
    const oldRosters = Array.isArray(storedRosters)
      ? storedRosters
      : Object.entries(storedRosters).map(([team, roster]) => ({ team, ...roster }));
    for (const oldRoster of oldRosters) {
      const team = oldRoster?.team;
      if (!team || database[category].rosters.some(roster => roster.team === team)) continue;
      const safeRoster = normalizePublicRoster({ status: 'success', players: oldRoster?.players });
      if (safeRoster && safeRoster.players.length) database[category].rosters.push({ team, ...safeRoster });
    }
  }
}

function readExistingJson(fileName, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8'));
  } catch {
    return fallback;
  }
}

function existingRecords(value) {
  if (Array.isArray(value)) return value;
  return value && Array.isArray(value.records) ? value.records : [];
}

function writeJson(fileName, data) {
  const destination = path.join(DATA_DIR, fileName);
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(destination) && fs.readFileSync(destination, 'utf8') === serialized) return false;
  fs.writeFileSync(destination, serialized);
  return true;
}

async function run() {
  const config = readKflConfig();
  const oldContact = readExistingJson('contact-db.json', {});
  const oldFlag = readExistingJson('flag-db.json', {});
  const [contact, flag, scores] = await Promise.all([
    fetchLeague(config, 'contact'),
    fetchLeague(config, 'flag'),
    fetchScores(config)
  ]);
  await Promise.all([fetchRosters(config, 'contact', contact), fetchRosters(config, 'flag', flag)]);
  preserveExistingRosters(contact, oldContact);
  preserveExistingRosters(flag, oldFlag);

  const [champions, mvps] = await Promise.all([
    fetchCsvCollection(config.CHAMPIONS_CSV_LINKS, 'champions'),
    fetchCsvCollection(config.MVP_CSV_LINKS, 'mvp')
  ]);

  let records = existingRecords(readExistingJson('records.json', []));

  const changed = [
    ['contact-db.json', contact],
    ['flag-db.json', flag],
    ['scores.json', scores],
    ['campeones.json', groupedHistoryRecords(champions.records, readExistingJson('campeones.json', {}), champions.failedCategories)],
    ['records.json', { records }],
    ['mvp.json', groupedHistoryRecords(mvps.records, readExistingJson('mvp.json', {}), mvps.failedCategories)]
  ].filter(([fileName, data]) => writeJson(fileName, data)).map(([fileName]) => fileName);

  console.log(changed.length ? `Datos sincronizados: ${changed.join(', ')}` : 'Los datos ya están actualizados.');
}

if (require.main === module) {
  run().catch(error => {
    console.error(`Error al sincronizar el SOT: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  groupedHistoryRecords,
  fetchCsvCollection,
  normalizeCsvRecords,
  normalizeLeagueDatabase,
  normalizePublicRoster,
  normalizeRecordsCSV,
  normalizeScores,
  parseCSV,
  pickFields
};
