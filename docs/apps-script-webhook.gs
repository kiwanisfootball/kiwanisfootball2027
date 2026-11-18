/**
 * Notifica a GitHub Actions que el SOT cambió. No envía valores de celdas,
 * nombres de jugadores, identificaciones ni datos de hojas al repositorio.
 *
 * Configuración:
 * 1. Guarda un token fine-grained en Project Settings > Script properties
 *    como GITHUB_TOKEN (permiso Contents: read/write en este repositorio).
 * 2. Crea un activador instalable "On edit" para handleSotEdit.
 * 3. Las URLs de Apps Script y CSV se mantienen en js/config-ligas.js;
 *    este webhook solo dispara la sincronización y no transmite datos de celdas.
 */
const KFL_GITHUB_OWNER = 'kiwanisfootball';
const KFL_GITHUB_REPO = 'kiwanisfootball2027';
const KFL_DISPATCH_EVENT = 'sot-updated';
const KFL_DISPATCH_COOLDOWN_MS = 120000;

function handleSotEdit(event) {
  if (!event || !event.range) {
    throw new Error('handleSotEdit requiere un evento de edición instalable.');
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;

  try {
    const properties = PropertiesService.getScriptProperties();
    const token = properties.getProperty('GITHUB_TOKEN');
    if (!token) throw new Error('Configura GITHUB_TOKEN en las propiedades del script.');

    const lastDispatch = Number(properties.getProperty('KFL_LAST_DISPATCH_AT') || 0);
    if (Date.now() - lastDispatch < KFL_DISPATCH_COOLDOWN_MS) return;

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
