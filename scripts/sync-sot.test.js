'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  normalizeCsvRecords,
  normalizeLeagueDatabase,
  normalizePublicRoster,
  normalizeRecordsCSV,
  normalizeScores,
  groupedHistoryRecords,
  fetchCsvCollection,
  parseCSV
} = require('./sync-sot');

test('CSV parser handles quoted commas, escaped quotes, and embedded newlines', () => {
  assert.deepEqual(parseCSV('season,team,player\r\n2025,"Owls, AIP","Doe, ""Ace""\nSmith"'), [
    ['season', 'team', 'player'],
    ['2025', 'Owls, AIP', 'Doe, "Ace"\nSmith']
  ]);
});

test('calendar normalization keeps only public schedule and standings fields', () => {
  const result = normalizeLeagueDatabase({
    data: {
      contact: {
        varsity: {
          partidos: [{ home: 'OWLS', away: 'RAIDERS', scoreH: 7, scoreA: 0, email: 'private@example.test' }],
          tabla: [{ equipo: 'OWLS', jj: 1, pts: 3, rank: 1, cedula: '123' }]
        }
      }
    }
  }, 'contact');

  assert.deepEqual(result.varsity.partidos, [{ home: 'OWLS', away: 'RAIDERS', scoreH: '7', scoreA: '0' }]);
  assert.deepEqual(result.varsity.tabla, [{ equipo: 'OWLS', jj: 1, pts: 3, rank: 1 }]);
  assert.deepEqual(result.juvenil, { partidos: [], tabla: [], rosters: [] });
});

test('public roster export discards identification, contact, and credential fields', () => {
  assert.deepEqual(normalizePublicRoster({
    status: 'success',
    players: [{
      nombre: 'Ana',
      apellido: 'Pérez',
      dorsal: 12,
      cedula: '8-123-456',
      email: 'ana@example.test',
      password: 'secret'
    }]
  }), {
    players: [{ nombre: 'Ana', apellido: 'Pérez', jersey: '12' }]
  });
});

test('ticker normalization accepts only its documented display fields', () => {
  assert.deepEqual(normalizeScores({
    currentWeek: 'WEEK 2',
    matches: [{ h: 'OWLS', v: 'EAGLES', sL: 14, sV: 7, active: 'false', email: 'hidden@example.test' }]
  }), {
    currentWeek: 'WEEK 2',
    matches: [{ h: 'OWLS', v: 'EAGLES', sL: '14', sV: '7', active: false }]
  });
});

test('score normalization preserves a zero as the string "0"', () => {
  const result = normalizeScores({
    matches: [{ h: 'EAGLES', v: 'OWLS', sL: 0, sV: 43, active: true }]
  });
  assert.equal(result.matches[0].sL, '0');
  assert.equal(result.matches[0].sV, '43');
});

test('empty SOT CSV URLs are skipped and history groups remain empty arrays', async () => {
  const result = await fetchCsvCollection({
    flag: { varsity: '', micro: '   ' }
  }, 'mvp');
  assert.deepEqual(result, { records: [], failedCategories: [] });

  const grouped = groupedHistoryRecords(result.records, {}, result.failedCategories);
  assert.deepEqual(grouped.flag.varsity, []);
  assert.deepEqual(grouped.flag.micro, []);
});

test('Varsity record CSV requires named public-stat columns and ignores unrelated columns', () => {
  assert.deepEqual(normalizeRecordsCSV(parseCSV(
    'Category,Statistic,Mark,Holder,Team,Cedula\nVarsity,Most yards,1200,A. Player,OWLS,123'
  )), [{
    category: 'Varsity',
    statistic: 'Most yards',
    mark: '1200',
    holder: 'A. Player',
    team: 'OWLS'
  }]);

  assert.throws(() => normalizeRecordsCSV(parseCSV('Season,Name,Value\n2025,Player,12')), /encabezados/);
});

test('champions and MVP CSV rows are normalized to their frontend contract', () => {
  assert.deepEqual(normalizeCsvRecords([
    ['Season', 'Champion', 'Runner-up'],
    ['2025', 'OWLS', 'EAGLES']
  ], 'champions', 'contact', 'varsity'), [{
    modalidad: 'contact',
    categoria: 'varsity',
    season: '2025',
    campeon: 'OWLS',
    subcampeon: 'EAGLES'
  }]);

  assert.deepEqual(normalizeCsvRecords([
    ['Season', 'Team', 'Player'],
    ['2025', 'OWLS', 'A. Player']
  ], 'mvp', 'contact', 'varsity'), [{
    modalidad: 'contact',
    categoria: 'varsity',
    season: '2025',
    equipo: 'OWLS',
    jugador: 'A. Player'
  }]);

  assert.deepEqual(normalizeCsvRecords([
    ['Año', 'Equipo', 'Jugador'],
    ['2015', 'SPARTANS', 'ANA PAULA DE LEÓN'],
    ['', 'DRAGONS', 'VALENTINA DONADO'],
    ['', 'DRAGONS', 'VALENTINA DONADO']
  ], 'mvp', 'flag', 'varsity'), [{
    modalidad: 'flag',
    categoria: 'varsity',
    season: '2015',
    equipo: 'SPARTANS',
    jugador: 'ANA PAULA DE LEÓN'
  }, {
    modalidad: 'flag',
    categoria: 'varsity',
    season: '2015',
    equipo: 'DRAGONS',
    jugador: 'VALENTINA DONADO'
  }]);
});

test('history records include Flag Varsity and group all eight league categories', () => {
  const flatRecords = normalizeCsvRecords([
    ['Season', 'Champion', 'Runner-up'],
    ['2025', 'OWLS', 'EAGLES']
  ], 'champions', 'contact', 'varsity');
  const flagVarsityRecords = normalizeCsvRecords([
    ['Año', 'Campeón', 'Sub-campeón'],
    ['2015', 'SPARTANS', 'OWLS']
  ], 'champions', 'flag', 'varsity');
  const grouped = groupedHistoryRecords([...flatRecords, ...flagVarsityRecords], {}, []);

  assert.deepEqual(Object.keys(grouped), ['contact', 'flag']);
  assert.deepEqual(Object.keys(grouped.contact), ['varsity', 'juvenil', 'mini', 'micro']);
  assert.deepEqual(Object.keys(grouped.flag), ['varsity', 'juvenil', 'mini', 'micro']);
  assert.deepEqual(grouped.contact.varsity, [{
    season: '2025',
    campeon: 'OWLS',
    subcampeon: 'EAGLES'
  }]);
  assert.deepEqual(grouped.flag.varsity, [{
    season: '2015',
    campeon: 'SPARTANS',
    subcampeon: 'OWLS'
  }]);
  assert.deepEqual(grouped.flag.micro, []);
});
