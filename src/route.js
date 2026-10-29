// 用既有的 mapQuery 或地址組 Google 地圖路線，不需要金鑰，也不猜座標。

export function dayRouteUrl(items) {
  const points = (items || [])
    .map((item) => String(item.mapQuery || item.address || item.name || '').trim())
    .filter(Boolean);
  if (!points.length) return '';
  if (points.length === 1) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(points[0])}`;
  }
  const origin = encodeURIComponent(points[0]);
  const destination = encodeURIComponent(points[points.length - 1]);
  const middle = points.slice(1, -1);
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  if (middle.length) url += `&waypoints=${encodeURIComponent(middle.join('|'))}`;
  return url;
}
