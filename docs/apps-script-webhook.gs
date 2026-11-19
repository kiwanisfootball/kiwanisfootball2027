/**
 * Webhook de Google Sheets para solicitar la sincronización de datos KFL.
 * Solo notifica a GitHub; no lee ni transmite valores de celdas.
 *
 * Configuración en Google Apps Script:
 * 1. Pega este archivo en el editor Apps Script vinculado a la hoja y guarda.
 * 2. Abre Project Settings (engranaje) > Script properties > Add script property.
 *    Name: GITHUB_TOKEN
 *    Value: pega aquí un fine-grained GitHub PAT con Contents: read/write
 *    únicamente para kiwanisfootball/kiwanisfootball2027.
 * 3. Abre Triggers (reloj) > Add Trigger:
 *    - Function: handleSotEdit; event source: From spreadsheet;
 *      event type: On edit.
 *    - Añade otro trigger: handleSotChange; From spreadsheet; On change.
 * 4. Autoriza el acceso solicitado por Google. El lock y la ventana de espera
 *    de 2 minutos agrupan ediciones cercanas para evitar dispatches repetidos.
 */
const KFL_GITHUB_OWNER = 'kiwanisfootball';
const KFL_GITHUB_REPO = 'kiwanisfootball2027';
const KFL_DISPATCH_EVENT = 'sync-sot';
const KFL_DISPATCH_COOLDOWN_MS = 120000;

function handleSotEdit(event) {
  if (!event || !event.range) {
    throw new Error('handleSotEdit requiere un evento de edición instalable.');
  }
  notifyKflSync_();
}

function handleSotChange(event) {
  if (!event || !event.changeType) {
    throw new Error('handleSotChange requiere un evento de cambio instalable.');
  }
  notifyKflSync_();
}

function notifyKflSync_() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    console.log('Sincronización omitida: ya hay una notificación en curso.');
    return;
  }

  try {
    const properties = PropertiesService.getScriptProperties();
    const token = properties.getProperty('GITHUB_TOKEN');
    if (!token) throw new Error('Configura GITHUB_TOKEN en las propiedades del script.');

    const lastDispatch = Number(properties.getProperty('KFL_LAST_DISPATCH_AT') || 0);
    if (Date.now() - lastDispatch < KFL_DISPATCH_COOLDOWN_MS) {
      console.log('Sincronización agrupada dentro de la ventana de 2 minutos.');
      return;
    }

    const url = `https://api.github.com/repos/${KFL_GITHUB_OWNER}/${KFL_GITHUB_REPO}/dispatches`;
    const response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      payload: JSON.stringify({
        event_type: KFL_DISPATCH_EVENT,
        client_payload: { source: 'google-sheets' }
      }),
      muteHttpExceptions: true
    });

    const status = response.getResponseCode();
    if (status !== 204) {
      throw new Error(`GitHub repository_dispatch respondió HTTP ${status}.`);
    }
    properties.setProperty('KFL_LAST_DISPATCH_AT', String(Date.now()));
  } finally {
    lock.releaseLock();
  }
}
