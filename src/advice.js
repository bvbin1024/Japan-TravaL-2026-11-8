// 穿著建議只看氣象數字，不猜行程。門檻寫在這裡：
// - 清晨 5–9 點與傍晚 17–21 點的最低溫 ≤ 12：早晚 N 度，請帶外套
// - 這段最低溫在 13–18：早晚 N 度，建議加一件薄外套
// - 12–17 點的降雨機率 ≥ 50：下午可能下雨，記得帶傘
// - 沒有逐小時、但全天最高降雨機率 ≥ 40：可能下雨，記得帶傘
// - 全天最高溫 ≥ 26：白天 N 度，可以穿薄一點
// - 以上都沒有：只講大約氣溫

function hourOf(stamp) {
  const match = String(stamp || '').match(/T(\d{2})/);
  return match ? Number(match[1]) : null;
}

function round(value) {
  return Number.isFinite(Number(value)) ? Math.round(Number(value)) : null;
}

export function clothingAdvice(data) {
  const daily = data?.daily || {};
  const high = round(daily.temperature_2m_max?.[0]);
  const low = round(daily.temperature_2m_min?.[0]);
  const precipMax = round(daily.precipitation_probability_max?.[0]);
  const times = data?.hourly?.time || [];
  const temps = data?.hourly?.temperature_2m || [];
  const precips = data?.hourly?.precipitation_probability || [];

  const edgeTemps = [];
  const afternoonPrecips = [];
  times.forEach((stamp, index) => {
    const hour = hourOf(stamp);
    if (hour == null) return;
    if ((hour >= 5 && hour <= 9) || (hour >= 17 && hour <= 21)) {
      const temp = round(temps[index]);
      if (temp != null) edgeTemps.push(temp);
    }
    if (hour >= 12 && hour <= 17) {
      const precip = round(precips[index]);
      if (precip != null) afternoonPrecips.push(precip);
    }
  });

  const edgeLow = edgeTemps.length ? Math.min(...edgeTemps) : low;
  const afternoonPrecip = afternoonPrecips.length ? Math.max(...afternoonPrecips) : null;
  if (high == null && low == null && edgeLow == null) return null;

  const parts = [];
  if (edgeLow != null && edgeLow <= 12) parts.push(`早晚 ${edgeLow} 度，請帶外套`);
  else if (edgeLow != null && edgeLow <= 18) parts.push(`早晚 ${edgeLow} 度，建議加一件薄外套`);
  if (afternoonPrecip != null && afternoonPrecip >= 50) parts.push('下午可能下雨，記得帶傘');
  else if (afternoonPrecip == null && precipMax != null && precipMax >= 40) parts.push('可能下雨，記得帶傘');
  if (high != null && high >= 26) parts.push(`白天 ${high} 度，可以穿薄一點`);
  if (!parts.length) {
    if (low != null && high != null) parts.push(`氣溫大約 ${low} 到 ${high} 度`);
    else if (high != null) parts.push(`最高大約 ${high} 度`);
    else parts.push(`最低大約 ${low} 度`);
  }

  return { high, low, precipMax, advice: parts.join('；') };
}
