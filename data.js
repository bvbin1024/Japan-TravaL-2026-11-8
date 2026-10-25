// 日本 9天8夜 關西・南紀勝浦・京都・東京 專屬行程資料庫
const TRIP_DATA = {
  title: "Japan Journey 2026",
  subtitle: "關西・南紀勝浦・京都・東京",
  coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=75",
  
  // 航班資料
  flights: [
    {
      type: "去程 (台北 ➔ 大阪關西)",
      code: "BR178",
      airline: "長榮航空 EVA Air",
      date: "2026/11/08 (日)",
      from: "TPE 桃園 T2",
      depTime: "06:30",
      to: "KIX 關西 T1",
      arrTime: "09:50",
      duration: "2h 20m",
      notes: "請提前於 03:30~04:00 抵達桃園機場第二航廈辦理登機與行李托運。"
    },
    {
      type: "回程 (東京成田 ➔ 台北)",
      code: "BR183",
      airline: "長榮航空 EVA Air",
      date: "2026/11/16 (一)",
      from: "NRT 成田 T2",
      depTime: "13:00",
      to: "TPE 桃園 T2",
      arrTime: "16:05",
      duration: "4h 05m",
      notes: "成田第二航廈長榮櫃台辦理托運。退稅免稅購物預留至少 2.5 小時。"
    }
  ],

  // 住宿清單
  hotels: [
    {
      name: "MIMARU 大阪心齋橋 CENTRAL",
      dates: "11/08 - 11/09 (1晚)",
      address: "大阪府大阪市中央區南船場4-11-20",
      phone: "+81 6-6241-7111",
      notes: "公寓式飯店附簡易廚房，鄰近心齋橋站，長輩進出方便。"
    },
    {
      name: "TAOYA 那智勝浦（TAOYA Nachikatsuura）",
      dates: "11/09 - 11/11 (2晚)",
      address: "和歌山縣東牟婁郡那智勝浦町大字勝浦216-19",
      phone: "+81 570-550-078",
      notes: "一泊二食全包式海景溫泉飯店，紀伊勝浦站備有專屬接駁車。"
    },
    {
      name: "MIMARU 京都 河原町五條",
      dates: "11/11 - 11/13 (2晚)",
      address: "京都府京都市下京區西石垣通五條下平居町17-1",
      phone: "+81 75-746-2481",
      notes: "緊鄰鴨川與五條/清水五條站，客廳與衛浴寬敞。"
    },
    {
      name: "東京銀座格蘭巴哈酒店 (Hotel GrandBach Tokyo Ginza)",
      dates: "11/13 - 11/16 (3晚)",
      address: "東京都中央區銀座5-13-12",
      phone: "+81 3-5550-2222",
      notes: "地處銀座核心精華地段，距東銀座站步行2分鐘，平坦無坡道。"
    }
  ],

  // 城市氣象對應座標 (Open-Meteo API)
  cities: {
    "大阪": { lat: 34.69, lon: 135.50 },
    "南紀勝浦": { lat: 33.63, lon: 135.94 },
    "京都": { lat: 35.01, lon: 135.76 },
    "天橋立": { lat: 35.56, lon: 135.19 },
    "東京": { lat: 35.68, lon: 139.76 }
  },

  // 每日行程詳細資料
  days: [
    {
      dateStr: "2026-11-08",
      weekday: "Sun",
      dayNumber: "08",
      location: "大阪",
      hotel: {
        name: "MIMARU 大阪心齋橋 CENTRAL",
        address: "大阪府大阪市中央區南船場4-11-20"
      },
      items: [
        {
          id: "d1-flight",
          category: "航班",
          name: "長榮航空 BR178 抵達關西",
          hours: "06:30 - 09:50",
          notes: "抵達關西機場第一航廈。入境後搭乘南海電鐵特急 Rapi:t 前往難波站。",
          address: "關西國際機場第一航廈"
        },
        {
          id: "d1-hotel-drop",
          category: "住宿",
          name: "MIMARU 大阪心齋橋 寄存行李",
          hours: "約 11:45 抵達",
          notes: "自難波站轉乘計程車約5分鐘抵達飯店，先放行李輕裝出發。",
          address: "MIMARU 大阪心齋橋 CENTRAL",
          transitModeIcon: "train",
          transitTime: "約 50 分鐘 (南海電鐵 Rapi:t)"
        },
        {
          id: "d1-shinsaibashi",
          category: "景點",
          name: "心齋橋筋・道頓堀周邊平坦散策",
          hours: "12:00 - 17:00",
          ticket: "免費",
          notes: "拱廊商店街遮陽避雨且全程平坦，長輩可悠閒品嚐章魚燒、喫茶咖啡。",
          address: "道頓堀 固力果跑跑人",
          transitModeIcon: "footprints",
          transitTime: "步行約 5 分鐘"
        },
        {
          id: "d1-dinner",
          category: "美食",
          name: "Yakiniku Ushigoro Umeda (梅田燒肉)",
          hours: "18:00 - 20:00 (預約完成)",
          ticket: "訂位代號: PERQZJ / 6位",
          notes: "建議自飯店搭計程車直達梅田餐廳，避免長輩在梅田地下迷航。",
          address: "Yakiniku Ushigoro Umeda, Osaka",
          transitModeIcon: "car",
          transitTime: "計程車約 15 分鐘"
        }
      ]
    },
    {
      dateStr: "2026-11-09",
      weekday: "Mon",
      dayNumber: "09",
      location: "南紀勝浦",
      hotel: {
        name: "TAOYA 那智勝浦",
        address: "和歌山縣東牟婁郡那智勝浦町大字勝浦216-19"
      },
      items: [
        {
          id: "d2-transit-kuroshio",
          category: "景點",
          name: "JR 特急黑潮號 (Kuroshio) 景觀鐵道",
          hours: "10:00 - 14:00",
          notes: "從天王寺或新大阪站上車。沿途飽覽和歌山蔚藍太平洋海景，全程舒適安坐。",
          address: "紀伊勝浦車站",
          transitModeIcon: "train",
          transitTime: "特急列車約 3.5~4 小時"
        },
        {
          id: "d2-checkin-taoya",
          category: "住宿",
          name: "TAOYA 那智勝浦 辦理入住",
          hours: "14:30 抵達勝浦站接駁",
          notes: "抵達紀伊勝浦站後搭乘專用接駁車前往飯店，享受全包式服務。",
          address: "TAOYA 那智勝浦",
          transitModeIcon: "bus",
          transitTime: "接駁車約 10 分鐘"
        },
        {
          id: "d2-hotspring",
          category: "景點",
          name: "海景無邊際露天風呂 & Lounge 酒廊",
          hours: "15:30 - 18:00",
          ticket: "房費全包免費享受",
          notes: "泡湯欣賞勝浦港海灣夕陽，大廳酒廊免費提供啤酒、飲品與精緻小點。",
          address: "TAOYA 那智勝浦"
        },
        {
          id: "d2-dinner",
          category: "美食",
          name: "飯店海鮮豪華自助晚宴",
          hours: "18:30 - 20:30",
          notes: "享用在地生鮪魚、黑毛和牛與現做海鮮料理，輕鬆無負擔。",
          address: "TAOYA 那智勝浦 餐廳"
        }
      ]
    },
    {
      dateStr: "2026-11-10",
      weekday: "Tue",
      dayNumber: "10",
      location: "南紀勝浦",
      hotel: {
        name: "TAOYA 那智勝浦",
        address: "和歌山縣東牟婁郡那智勝浦町大字勝浦216-19"
      },
      items: [
        {
          id: "d3-nachi-falls",
          category: "景點",
          name: "世界遺產熊野那智大社 & 那智之瀧",
          hours: "09:00 - 12:00",
          ticket: "瀧御拜所 300円",
          notes: "日本第一名瀑。長輩建議乘車直達飛瀧神社入口處，免爬古道大石階梯。",
          address: "那智瀑布, Nachikatsuura",
          transitModeIcon: "car",
          transitTime: "計程車/專車約 20 分鐘"
        },
        {
          id: "d3-lunch-maguro",
          category: "美食",
          name: "勝浦漁港 賑合市場生黑鮪魚午餐",
          hours: "12:30 - 14:00",
          notes: "品嚐全日本第一「不經冷凍、產地直送」的熟成生黑鮪魚丼飯與定食。",
          address: "勝浦漁港 にぎわい市場",
          transitModeIcon: "car",
          transitTime: "約 15 分鐘"
        },
        {
          id: "d3-boat-tour",
          category: "景點",
          name: "紀之松島遊覽船巡航 (海風休憩)",
          hours: "14:30 - 16:00",
          ticket: "約 1,600円",
          notes: "平穩坐於遊覽船內欣賞外海奇岩島嶼，免步行極致放鬆。",
          address: "勝浦港觀光船棧橋",
          transitModeIcon: "sailboat",
          transitTime: "步行約 3 分鐘"
        },
        {
          id: "d3-dinner",
          category: "美食",
          name: "TAOYA 精緻溫泉百匯晚宴",
          hours: "18:30",
          notes: "返回飯店泡湯放鬆並享用豐盛晚餐。",
          address: "TAOYA 那智勝浦"
        }
      ]
    },
    {
      dateStr: "2026-11-11",
      weekday: "Wed",
      dayNumber: "11",
      location: "京都",
      hotel: {
        name: "MIMARU 京都 河原町五條",
        address: "京都府京都市下京區西石垣通五條下平居町17-1"
      },
      items: [
        {
          id: "d4-transit-kyoto",
          category: "景點",
          name: "JR 特急黑潮號前往古都京都",
          hours: "10:00 - 14:00",
          notes: "紀伊勝浦站出發，安坐車廂內欣賞海岸與鄉村風景，直抵京都站。",
          address: "京都車站",
          transitModeIcon: "train",
          transitTime: "特急直達約 3.5~4 小時"
        },
        {
          id: "d4-hotel-mimaru",
          category: "住宿",
          name: "MIMARU 京都 河原町五條 入住",
          hours: "14:30 辦理入住",
          notes: "自京都站搭乘計程車約8分鐘抵達飯店，稍作梳洗休息。",
          address: "MIMARU 京都 河原町五條",
          transitModeIcon: "car",
          transitTime: "計程車約 8 分鐘"
        },
        {
          id: "d4-kamogawa",
          category: "景點",
          name: "鴨川河畔散策・四條河原町漫步",
          hours: "15:30 - 18:00",
          ticket: "免費",
          notes: "秋意漸濃的鴨川旁平坦步道，伴隨微風散步拍照非常舒適。",
          address: "四條大橋 鴨川",
          transitModeIcon: "footprints",
          transitTime: "步行約 5 分鐘"
        },
        {
          id: "d4-dinner",
          category: "美食",
          name: "中島家 Kyoto (預約確認 / 6位)",
          hours: "18:30 - 20:30",
          notes: "京都地道精緻家常菜與和風割烹居酒料理，環境舒適雅緻。",
          address: "中島家 京都",
          transitModeIcon: "car",
          transitTime: "步行或計程車短程即達"
        }
      ]
    },
    {
      dateStr: "2026-11-12",
      weekday: "Thu",
      dayNumber: "12",
      location: "天橋立",
      hotel: {
        name: "MIMARU 京都 河原町五條",
        address: "京都府京都市下京區西石垣通五條下平居町17-1"
      },
      items: [
        {
          id: "d5-charter-start",
          category: "景點",
          name: "海之京都 全日專車包車出發",
          hours: "08:00 飯店大廳集合",
          notes: "今日全程專屬包車直達天橋立與伊根，長輩免舟車勞頓與轉車之苦。",
          address: "MIMARU 京都 河原町五條",
          transitModeIcon: "car",
          transitTime: "專車前往宮津天橋立約 100 分鐘"
        },
        {
          id: "d5-amanohashidate",
          category: "景點",
          name: "天橋立 傘松公園 (昇龍觀) & 元伊勢籠神社",
          hours: "09:50 - 11:20",
          ticket: "單軌斜坡車來回約 680円",
          notes: "搭乘平穩安全的單軌電車直達景觀台，長輩免走陡坡即可俯瞰日本三景。",
          address: "傘松公園, 宮津市",
          transitModeIcon: "mountain",
          transitTime: "搭乘斜坡車約 5 分鐘"
        },
        {
          id: "d5-lunch",
          category: "美食",
          name: "宮津灣海鮮名物午餐",
          hours: "12:00 - 13:00",
          notes: "品嚐丹後若狹灣新鮮海鮮丼、烤魚定食。",
          address: "天橋立 觀光船碼頭周邊"
        },
        {
          id: "d5-ine-cruise",
          category: "景點",
          name: "伊根町舟屋巡禮 & 伊根灣觀光船",
          hours: "13:40 - 15:40",
          ticket: "遊船票 1,000円",
          notes: "從海上遠眺230間傳統水上舟屋，船上可餵海鷗。隨後在舟屋咖啡館坐下飲茶。",
          address: "伊根町舟屋, 京都府",
          transitModeIcon: "sailboat",
          transitTime: "包車驅車約 30 分鐘抵達伊根"
        },
        {
          id: "d5-dinner",
          category: "美食",
          name: "Lugol Kyoto (預約確認 / 4+2位)",
          hours: "19:00 - 21:00",
          notes: "專車約 17:30 返回京都飯店休整，晚間前往精緻餐酒館 Lugol 享用晚餐。",
          address: "Lugol Kyoto",
          transitModeIcon: "car",
          transitTime: "計程車約 10 分鐘"
        }
      ]
    },
    {
      dateStr: "2026-11-13",
      weekday: "Fri",
      dayNumber: "13",
      location: "東京",
      hotel: {
        name: "東京銀座格蘭巴哈酒店",
        address: "東京都中央區銀座5-13-12"
      },
      items: [
        {
          id: "d6-shinkansen",
          category: "景點",
          name: "東海道新幹線 Nozomi 前往東京",
          hours: "10:00 - 12:15",
          notes: "京都站搭乘新幹線直達東京站，平穩疾馳約 2 小時 15 分，車上享受鐵道便當與咖啡。",
          address: "東京車站",
          transitModeIcon: "train",
          transitTime: "新幹線 2h 15m"
        },
        {
          id: "d6-hotel-tokyo",
          category: "住宿",
          name: "銀座格蘭巴哈酒店 入住寄放行李",
          hours: "12:45 抵達飯店",
          notes: "東京站丸之內或八重洲口搭計程車5分鐘即達飯店。環境雅緻清幽。",
          address: "Hotel GrandBach Tokyo Ginza",
          transitModeIcon: "car",
          transitTime: "計程車約 8 分鐘"
        },
        {
          id: "d6-ginza-six",
          category: "景點",
          name: "GINZA SIX、蔦屋書店與銀座大道漫步",
          hours: "14:00 - 18:00",
          ticket: "免費",
          notes: "GINZA SIX 內部挑高舒適、空調宜人且休息座椅豐富，長輩逛街毫無壓力。",
          address: "GINZA SIX, Ginza, Tokyo",
          transitModeIcon: "footprints",
          transitTime: "步行約 3 分鐘"
        },
        {
          id: "d6-dinner",
          category: "美食",
          name: "銀座精緻洋食或壽司輕晚餐",
          hours: "18:30 - 20:00",
          notes: "於銀座四丁目附近享用老舖洋食或板前壽司，散步回飯店。",
          address: "銀座中央通周邊"
        }
      ]
    },
    {
      dateStr: "2026-11-14",
      weekday: "Sat",
      dayNumber: "14",
      location: "東京",
      hotel: {
        name: "東京銀座格蘭巴哈酒店",
        address: "東京都中央區銀座5-13-12"
      },
      items: [
        {
          id: "d7-omotesando",
          category: "景點",
          name: "表參道林蔭大道・當代建築巡禮",
          hours: "10:00 - 13:00",
          ticket: "免費",
          notes: "櫸樹林蔭大道地勢平緩，欣賞大師建築外觀，漫步選品店，步調悠閒。",
          address: "表參道 Hills",
          transitModeIcon: "car",
          transitTime: "銀座搭計程車約 15 分鐘"
        },
        {
          id: "d7-azabudai",
          category: "景點",
          name: "麻布台之丘 (Azabudai Hills) 現代花園漫遊",
          hours: "15:00 - 17:30",
          ticket: "公共區域免費",
          notes: "全日本最新地標。中央廣場綠意盎然，全區無障礙電梯與坡道完善，長輩參觀輕鬆舒服。",
          address: "麻布台 Hills, Tokyo",
          transitModeIcon: "car",
          transitTime: "計程車約 10 分鐘"
        },
        {
          id: "d7-dinner",
          category: "美食",
          name: "Ushigoro S 銀座 (頂級和牛私廚 / 6位)",
          hours: "18:30 - 21:00 (預約完成)",
          ticket: "訂位代號: ZWQR6K / 6位",
          notes: "Ushigoro 旗下最高殿堂全包廂個室服務，專人代烤頂級黑毛和牛全餐。",
          address: "Ushigoro S. Ginza",
          transitModeIcon: "car",
          transitTime: "計程車約 10 分鐘返銀座"
        }
      ]
    },
    {
      dateStr: "2026-11-15",
      weekday: "Sun",
      dayNumber: "15",
      location: "東京",
      hotel: {
        name: "東京銀座格蘭巴哈酒店",
        address: "東京都中央區銀座5-13-12"
      },
      items: [
        {
          id: "d8-kokyo",
          category: "景點",
          name: "丸之內林蔭仲通 & 皇居外苑散步",
          hours: "10:00 - 12:30",
          ticket: "免費",
          notes: "星期日丸之內仲通轉為徒步區，可悠閒散步至皇居二重橋與楠木正成銅像拍合照。",
          address: "皇居外苑 楠木正成銅像",
          transitModeIcon: "car",
          transitTime: "計程車約 8 分鐘"
        },
        {
          id: "d8-shopping",
          category: "購物",
          name: "銀座三越・松屋・伊東屋採買伴手禮",
          hours: "14:30 - 18:00",
          notes: "集中在銀座採購日本銘菓、保養品與文具，退稅櫃台動線清晰，隨時可回飯店放戰利品。",
          address: "銀座三越 百貨",
          transitModeIcon: "footprints",
          transitTime: "步行約 4 分鐘"
        },
        {
          id: "d8-dinner",
          category: "美食",
          name: "銀座割烹或季節天婦羅盛宴",
          hours: "18:30",
          notes: "旅程最後一晚在銀座享用精緻日式割烹或天婦羅，晚間整理行李備戰回程。",
          address: "銀座周邊"
        }
      ]
    },
    {
      dateStr: "2026-11-16",
      weekday: "Mon",
      dayNumber: "16",
      location: "東京",
      hotel: null,
      items: [
        {
          id: "d9-transit-airport",
          category: "其他",
          name: "飯店退房 ➔ 前往成田機場第二航廈",
          hours: "09:00 - 10:15",
          notes: "建議預約專車接送或搭乘計程車至東京站轉乘 成田特快 N'EX 直達第二航廈。",
          address: "成田國際機場第二航廈",
          transitModeIcon: "train",
          transitTime: "專車/特快約 60~75 分鐘"
        },
        {
          id: "d9-flight",
          category: "航班",
          name: "長榮航空 BR183 起飛返台",
          hours: "13:00 - 16:05",
          ticket: "BR183 成田T2 ➔ 桃園T2",
          notes: "10:15 抵達航廈辦理登機、安檢與免稅購物。16:05 順利返抵國門。",
          address: "成田國際機場第二航廈"
        }
      ]
    }
  ]
};
