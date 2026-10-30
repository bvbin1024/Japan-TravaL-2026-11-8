// 只備份使用者自己存的資料。壞檔整份拒絕，不改手機裡原來的內容。

export const BACKUP_KEYS = [
  'jp_expenses_clean',
  'jp_shopping_user_list',
  'my_vjw_qr_clean',
  'jp_family_contacts',
  'jp_elderly_mode_timeline',
  'jp_font_scale',
  'jp_trip_v2026_energy',
];

const JSON_KEYS = new Set([
  'jp_expenses_clean',
  'jp_shopping_user_list',
  'jp_family_contacts',
  'jp_trip_v2026_energy',
]);

function assertShape(key, value) {
  if (typeof value !== 'string') throw new Error('type');
  if (key === 'jp_elderly_mode_timeline' && value !== 'true' && value !== 'false') throw new Error('font');
  if (key === 'jp_font_scale' && value !== 'xl') throw new Error('scale');
  if (key === 'my_vjw_qr_clean' && value && !value.startsWith('data:image/')) throw new Error('qr');
  if (!JSON_KEYS.has(key)) return;
  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) throw new Error('array');
  if (key === 'jp_family_contacts') {
    parsed.forEach((person) => {
      if (!person || typeof person.phone !== 'string' || !person.phone.trim()) throw new Error('phone');
    });
  }
  if (key === 'jp_expenses_clean') {
    parsed.forEach((row) => {
      if (!row || typeof row !== 'object') throw new Error('expense');
    });
  }
}

export function buildBackup(storage) {
  const data = {};
  BACKUP_KEYS.forEach((key) => {
    const value = storage.getItem(key);
    if (value != null) data[key] = value;
  });
  return {
    app: 'japan-traval-2026',
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function validateBackup(parsed) {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('root');
  if (!parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) throw new Error('data');
  const entries = Object.entries(parsed.data);
  if (!entries.length) throw new Error('empty');
  entries.forEach(([key, value]) => {
    if (!BACKUP_KEYS.includes(key)) throw new Error('key');
    assertShape(key, value);
  });
  return parsed.data;
}
