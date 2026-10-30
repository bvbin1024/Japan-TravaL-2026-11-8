// 日本時間（Asia/Tokyo）。?now= 只給檢查用，例如 ?now=2026-11-08T14:30
// 沒有時區的時間一律當成日本時間，不會拿來改行程內容。

const TRIP_START = '2026-11-08';
const TRIP_END = '2026-11-16';

export function readNowOverride(search = '') {
  const raw = new URLSearchParams(search).get('now');
  if (!raw) return null;
  if (/[zZ]|[+-]\d{2}:?\d{2}$/.test(raw)) {
    const dated = new Date(raw);
    return Number.isNaN(dated.getTime()) ? null : dated;
  }
  const match = raw.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  const dated = new Date(`${match[1]}T${match[2]}:${match[3] || '00'}+09:00`);
  return Number.isNaN(dated.getTime()) ? null : dated;
}

export function tokyoParts(date) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    dateStr: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    clock: `${parts.hour}:${parts.minute}`,
    label: `${Number(parts.month)}/${Number(parts.day)} ${parts.hour}:${parts.minute}`,
  };
}

export function tripPhase(date) {
  const { dateStr } = tokyoParts(date);
  if (dateStr < TRIP_START) return 'before';
  if (dateStr > TRIP_END) return 'after';
  return 'during';
}

export function parseHours(hours) {
  if (!hours) return null;
  const found = [...String(hours).matchAll(/(\d{1,2}):(\d{2})/g)]
    .map((match) => Number(match[1]) * 60 + Number(match[2]))
    .filter((value) => value >= 0 && value < 24 * 60);
  if (!found.length) return null;
  const start = found[0];
  return {
    start,
    end: found.length > 1 ? found[1] : null,
    startLabel: formatMinutes(start),
  };
}

export function formatMinutes(total) {
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function dayIndex(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return Math.round((Date.UTC(year, month - 1, day) - Date.UTC(2026, 10, 8)) / 86400000);
}

function absoluteMinutes(dateStr, minutes) {
  return dayIndex(dateStr) * 1440 + minutes;
}

function remainText(mins) {
  if (mins < 1) return '快到了';
  if (mins < 60) return `還有 ${mins} 分鐘`;
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  if (minutes === 0) return `還有 ${hours} 小時`;
  return `還有 ${hours} 小時 ${minutes} 分鐘`;
}

export function departureCountdown(date) {
  const target = new Date(`${TRIP_START}T00:00:00+09:00`);
  const diff = target.getTime() - date.getTime();
  if (diff <= 0) return '今天出發';
  const hours = Math.ceil(diff / 3600000);
  if (hours <= 24) return `今天即將出發，大約還有 ${hours} 小時`;
  const days = Math.ceil(diff / 86400000);
  if (days === 1) return '明天 11 月 8 日就要出發了';
  return `距離 11 月 8 日出發，還有 ${days} 天`;
}

function flatten(days) {
  const rows = [];
  days.forEach((day, dayIndex) => {
    (day.items || []).forEach((item, itemIndex) => {
      rows.push({
        day,
        dayIndex,
        item,
        itemIndex,
        times: parseHours(item.hours),
      });
    });
  });
  return rows;
}

export function planDay(days, date) {
  const phase = tripPhase(date);
  const tokyo = tokyoParts(date);
  const rows = flatten(days || []);
  if (phase === 'before') {
    return {
      phase,
      tokyo,
      statuses: {},
      focusId: null,
      banner: { text: departureCountdown(date), query: '' },
    };
  }
  if (phase === 'after') {
    return { phase, tokyo, statuses: {}, focusId: null, banner: null };
  }

  const nowAbs = absoluteMinutes(tokyo.dateStr, tokyo.minutes);
  const statuses = {};
  rows.forEach((row, index) => {
    if (!row.times || !row.day?.dateStr) {
      statuses[row.item.id] = 'upcoming';
      return;
    }
    const startAbs = absoluteMinutes(row.day.dateStr, row.times.start);
    const next = rows.slice(index + 1).find((candidate) => candidate.times && candidate.day?.dateStr);
    let endAbs;
    if (row.times.end != null) endAbs = absoluteMinutes(row.day.dateStr, row.times.end);
    else if (next) endAbs = absoluteMinutes(next.day.dateStr, next.times.start);
    else endAbs = absoluteMinutes(row.day.dateStr, 24 * 60);
    if (nowAbs >= endAbs) statuses[row.item.id] = 'past';
    else if (nowAbs >= startAbs) statuses[row.item.id] = 'now';
    else statuses[row.item.id] = 'upcoming';
  });

  const current = rows.find((row) => statuses[row.item.id] === 'now');
  const next = rows.find((row) => row.times && row.day?.dateStr && absoluteMinutes(row.day.dateStr, row.times.start) > nowAbs);
  const focus = current || next || null;
  let banner = null;
  if (next) {
    const mins = absoluteMinutes(next.day.dateStr, next.times.start) - nowAbs;
    const when = next.day.dateStr === tokyo.dateStr
      ? next.times.startLabel
      : `${Number(next.day.dateStr.slice(5, 7))}/${Number(next.day.dateStr.slice(8))} ${next.times.startLabel}`;
    banner = {
      text: `下一站 ${when} ${next.item.name}，${remainText(mins)}`,
      query: next.item.mapQuery || next.item.address || next.item.name || '',
    };
  } else if (current) {
    banner = {
      text: `現在是 ${current.times.startLabel} ${current.item.name}`,
      query: current.item.mapQuery || current.item.address || current.item.name || '',
    };
  } else {
    banner = { text: '今天的行程都走完了', query: '' };
  }

  return {
    phase,
    tokyo,
    statuses,
    focusId: focus?.item?.id || null,
    focusDayIndex: focus?.dayIndex ?? null,
    banner,
  };
}
