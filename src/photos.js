// 只有核對過 Wikimedia Commons 檔名、說明或座標、確認是該地點的照片。
// 對不到的行程不放圖。授權全文在 PHOTO_CREDITS.md。

export const STOP_PHOTOS = {
  'd1-shinsaibashi': {
    src: '/images/stops/dotonbori.jpg',
    title: '道頓堀固力果招牌（白天）',
    author: 'Sakaori',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Neon_sign_of_Dotonbori_daytime.JPG',
    note: '檔案座標約北緯 34.669、東經 135.501，說明為道頓堀的固力果招牌。這站的導航目標就是道頓堀固力果招牌。',
  },
  'd3-nachi-falls': {
    src: '/images/stops/nachi.jpg',
    title: '那智瀑布',
    author: 'Zairon',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nachikatsuura_Nachi_Falls_03.jpg',
    note: '檔名與說明都寫 Nachi Waterfall, Nachikatsuura，是那智勝浦的那智瀑布，不是畫作。',
  },
  'd4-kamogawa': {
    src: '/images/stops/kamo.jpg',
    title: '從四條大橋看鴨川',
    author: 'Chris Gladis',
    licence: 'CC BY 2.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kamo_River,_Kyoto_(118132938).jpg',
    note: '說明寫 From Shijo Bridge, looking north over the Kamo River，就是四條大橋上看鴨川。',
  },
  'd5-amanohashidate': {
    src: '/images/stops/amanohashidate.jpg',
    title: '傘松公園遠望天橋立',
    author: '松岡明芳',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Amanohashidate-Kasamatsu_Park_2010-10-02_894.JPG',
    note: '分類與說明都是傘松公園遠望天橋立，拍攝於 2010 年 10 月。',
  },
  'd6-shinkansen': {
    src: '/images/stops/tokyo-station.jpg',
    title: '東京車站丸之內大樓',
    author: 'Alexandr3126',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tokyo_Station_(Marunouchi_Building).jpg',
    note: '檔名與說明都是東京車站丸之內紅磚站房。這站的終點是東京車站。',
  },
  'd8-kokyo': {
    src: '/images/stops/nijubashi.jpg',
    title: '皇居二重橋',
    author: 'Chris 73',
    licence: 'CC BY-SA 3.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Imperial_Palace_Tokyo_Nijubashi_Bridge.JPG',
    note: '說明是東京皇居二重橋。這站備註寫到會走到二重橋。導航目標仍是楠木正成銅像，照片不是銅像。',
  },
};

export function photoFor(id) {
  return STOP_PHOTOS[id] || null;
}

export const PHOTO_LIST = Object.entries(STOP_PHOTOS).map(([id, photo]) => ({ id, ...photo }));
