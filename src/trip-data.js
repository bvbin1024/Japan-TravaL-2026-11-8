export const TRIP_DATA = {
      title: "日本深度旅遊",
      subtitle: "關西・南紀勝浦・京都・東京",
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
      hotels: [
        {
          name: "MIMARU 大阪心齋橋 CENTRAL",
          dates: "11/08 - 11/09 (1晚)",
          address: "大阪府大阪市中央区西心斎橋1-9-27",
          latitude: 34.6733954,
          longitude: 135.498324,
          phone: "+81 6-6241-7111"
        },
        {
          name: "TAOYA 那智勝浦（TAOYA Nachikatsuura）",
          dates: "11/09 - 11/11 (2晚)",
          address: "和歌山県東牟婁郡那智勝浦町湯川1108",
          latitude: 33.6224181,
          longitude: 135.9421641,
          phone: "+81 570-550-078"
        },
        {
          name: "MIMARU 京都 河原町五條",
          dates: "11/11 - 11/13 (2晚)",
          address: "京都府京都市下京区西石垣通五条下る平居町17-1",
          phone: "+81 75-746-2481",
          latitude: 34.9952444,
          longitude: 135.7664668
        },
        {
          name: "東京銀座格蘭巴哈酒店 (Hotel GrandBach Tokyo Ginza)",
          dates: "11/13 - 11/16 (3晚)",
          address: "東京都中央区銀座5-13-12",
          phone: "+81 3-5550-2222",
          latitude: 35.6686151,
          longitude: 139.7665053
        }
      ],
      cities: {
        "大阪": { lat: 34.69, lon: 135.50 },
        "南紀勝浦": { lat: 33.63, lon: 135.94 },
        "京都": { lat: 35.01, lon: 135.76 },
        "天橋立": { lat: 35.56, lon: 135.19 },
        "東京": { lat: 35.68, lon: 139.76 }
      },
      days: [
        {
          dateStr: "2026-11-08",
          weekday: "Sun",
          dayNumber: "08",
          location: "大阪",
          energy: {
            steps: "4,500",
            level: "適中",
            terrain: "全平坦拱廊商場",
            rest: "心齋橋喫茶店豐富"
          },
          hotel: {
            name: "MIMARU 大阪心齋橋 CENTRAL",
            address: "大阪府大阪市中央区西心斎橋1-9-27",
            latitude: 34.6733954,
            longitude: 135.498324
          },
          items: [
            {
              id: "d1-flight",
              category: "航班",
              name: "長榮航空 BR178 抵達關西",
              hours: "06:30 - 09:50",
              notes: "抵達關西機場第一航廈。入境後搭乘南海電鐵特急 Rapi:t 前往難波站。",
              address: "関西国際空港 第1ターミナル",
              mapQuery: "関西国際空港",
              transitModeIcon: "plane"
            },
            {
              id: "d1-hotel-drop",
              category: "住宿",
              name: "MIMARU 大阪心齋橋 CENTRAL 寄存行李",
              hours: "11:45 抵達",
              notes: "自難波站搭乘計程車約5分鐘抵達飯店。木質極簡大廳，先放行李後輕裝出遊。",
              address: "大阪府大阪市中央区西心斎橋1-9-27",
              latitude: 34.6733954,
              longitude: 135.498324,
              mapQuery: "MIMARU大阪 心斎橋CENTRAL 西心斎橋1-9-27",
              transitModeIcon: "train",
              transitTime: "約 50 分鐘 (南海電鐵 Rapi:t)"
            },
            {
              id: "d1-shinsaibashi",
              category: "景點",
              name: "心齋橋筋・道頓堀周邊平坦散策",
              hours: "12:00 - 17:00",
              ticket: "平緩商店街 · 免門票",
              notes: "拱廊商店街遮陽避雨且全程平坦，長輩可悠閒品嚐章魚燒、喫茶咖啡。",
              address: "大阪府大阪市中央区道頓堀",
              latitude: 34.6690672,
              longitude: 135.5013046,
              mapQuery: "道頓堀 グリコサイン",
              transitModeIcon: "footprints",
              transitTime: "步行約 5 分鐘"
            },
            {
              id: "d1-dinner",
              category: "美食",
              name: "Yakiniku Ushigoro Umeda (梅田燒肉)",
              hours: "18:00 - 20:00",
              ticket: "預約完成 · 6位 (專人代烤)",
              bookingCode: "PERQZJ",
              notes: "建議自飯店搭計程車直達梅田餐廳，避免長輩在梅田地下迷航。",
              address: "大阪府大阪市北区梅田2-2-22",
              latitude: 34.6997745,
              longitude: 135.4946044,
              mapQuery: "焼肉うしごろ 梅田店",
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
          energy: {
            steps: "1,800",
            level: "極輕鬆",
            terrain: "全日坐車與溫泉享受",
            rest: "景觀列車與海景酒廊"
          },
          hotel: {
            name: "TAOYA 那智勝浦",
            address: "和歌山県東牟婁郡那智勝浦町湯川1108",
            latitude: 33.6224181,
            longitude: 135.9421641
          },
          items: [
            {
              id: "d2-transit-kuroshio",
              category: "交通",
              name: "JR 特急黑潮號 (Kuroshio) 景觀鐵道",
              hours: "10:00 - 14:00",
              notes: "從天王寺或新大阪站上車。沿途飽覽和歌山蔚藍太平洋海景，全程舒適安坐。",
              address: "和歌山県東牟婁郡那智勝浦町大字築地６丁目 紀伊勝浦駅",
              latitude: 33.6281084,
              longitude: 135.9418263,
              mapQuery: "JR 紀伊勝浦駅",
              transitModeIcon: "train",
              transitTime: "特急約 3.5~4 小時"
            },
            {
              id: "d2-checkin-taoya",
              category: "住宿",
              name: "TAOYA 那智勝浦 辦理入住",
              hours: "14:30 抵達",
              notes: "抵達紀伊勝浦站後搭乘專用接駁車前往飯店，享受全包式溫泉服務。",
              address: "和歌山県東牟婁郡那智勝浦町湯川1108",
              latitude: 33.6224181,
              longitude: 135.9421641,
              mapQuery: "TAOYA那智勝浦 湯川1108",
              transitModeIcon: "bus",
              transitTime: "接駁車約 10 分鐘"
            },
            {
              id: "d2-hotspring",
              category: "景點",
              name: "海景無邊際露天風呂 & Lounge 酒廊",
              hours: "15:30 - 18:00",
              ticket: "房客全包式免費服務",
              notes: "泡湯欣賞勝浦港海灣夕陽，大廳酒廊免費提供生啤酒、軟飲與精緻點心。",
              address: "和歌山県東牟婁郡那智勝浦町湯川1108",
              latitude: 33.6224181,
              longitude: 135.9421641,
              mapQuery: "TAOYA那智勝浦 湯川1108",
              transitModeIcon: "bed"
            },
            {
              id: "d2-dinner",
              category: "美食",
              name: "飯店海鮮豪華自助晚宴",
              hours: "18:30 - 20:30",
              ticket: "溫泉晚宴 · 免額外付費",
              notes: "享用在地生黑鮪魚、黑毛和牛與現做海鮮料理，步調放鬆無負擔。",
              address: "和歌山県東牟婁郡那智勝浦町湯川1108",
              latitude: 33.6224181,
              longitude: 135.9421641,
              mapQuery: "TAOYA那智勝浦 湯川1108",
              transitModeIcon: "calculator"
            }
          ]
        },
        {
          dateStr: "2026-11-10",
          weekday: "Tue",
          dayNumber: "10",
          location: "南紀勝浦",
          energy: {
            steps: "3,200",
            level: "輕鬆",
            terrain: "專車直達入口/遊船安坐",
            rest: "避開古道大石階梯"
          },
          hotel: {
            name: "TAOYA 那智勝浦",
            address: "和歌山県東牟婁郡那智勝浦町湯川1108",
            latitude: 33.6224181,
            longitude: 135.9421641
          },
          items: [
            {
              id: "d3-nachi-falls",
              category: "景點",
              name: "世界遺產熊野那智大社 & 那智之瀧",
              hours: "09:00 - 12:00",
              ticket: "瀧御拜所 300円",
              notes: "日本第一名瀑。長輩建議搭車至飛瀧神社入口處下車，完全避開古道大石階梯。",
              address: "和歌山県東牟婁郡那智勝浦町那智山 那智の滝",
              latitude: 33.6752833,
              longitude: 135.8876266,
              mapQuery: "那智の滝",
              transitModeIcon: "car",
              transitTime: "計程車/專車約 20 分鐘"
            },
            {
              id: "d3-lunch-maguro",
              category: "美食",
              name: "勝浦漁港 賑合市場生黑鮪魚午餐",
              hours: "12:30 - 14:00",
              ticket: "黑鮪魚產地直送名店",
              notes: "品嚐全日本第一「不經冷凍、產地直送」的熟成生黑鮪魚丼飯與定食。",
              address: "和歌山県東牟婁郡那智勝浦町築地7-12",
              latitude: 33.626586,
              longitude: 135.9439419,
              mapQuery: "勝浦漁港 にぎわい市場",
              transitModeIcon: "car",
              transitTime: "約 15 分鐘"
            },
            {
              id: "d3-boat-tour",
              category: "景點",
              name: "紀之松島遊覽船巡航 (海風休憩)",
              hours: "14:30 - 16:00",
              ticket: "觀光船票 約 1,600円",
              notes: "平穩坐於遊覽船內欣賞外海奇岩島嶼，免步行極致放鬆。",
              address: "和歌山県東牟婁郡那智勝浦町勝浦 勝浦港観光船のりば",
              mapQuery: "紀の松島めぐり遊覧船",
              transitModeIcon: "sailboat",
              transitTime: "步行約 3 分鐘"
            },
            {
              id: "d3-dinner",
              category: "美食",
              name: "TAOYA 精緻溫泉百匯晚宴",
              hours: "18:30",
              ticket: "溫泉晚宴",
              notes: "返回飯店泡湯放鬆並享用豐盛晚餐。",
              address: "和歌山県東牟婁郡那智勝浦町湯川1108",
              latitude: 33.6224181,
              longitude: 135.9421641,
              mapQuery: "TAOYA那智勝浦 湯川1108",
              transitModeIcon: "calculator"
            }
          ]
        },
        {
          dateStr: "2026-11-11",
          weekday: "Wed",
          dayNumber: "11",
          location: "京都",
          energy: {
            steps: "3,800",
            level: "適中",
            terrain: "特急列車 + 鴨川平緩河畔",
            rest: "河岸長椅散步"
          },
          hotel: {
            name: "MIMARU 京都 河原町五條",
            address: "京都府京都市下京区西石垣通五条下る平居町17-1",
            latitude: 34.9952444,
            longitude: 135.7664668
          },
          items: [
            {
              id: "d4-transit-kyoto",
              category: "交通",
              name: "JR 特急黑潮號前往古都京都",
              hours: "10:00 - 14:00",
              notes: "紀伊勝浦站出發，安坐車廂內欣賞海岸與鄉村風景，直抵京都站。",
              address: "京都府京都市下京区東塩小路高倉町8-3 京都駅",
              latitude: 34.9861909,
              longitude: 135.7600629,
              mapQuery: "JR 京都駅",
              transitModeIcon: "train",
              transitTime: "特急直達約 3.5~4 小時"
            },
            {
              id: "d4-hotel-mimaru",
              category: "住宿",
              name: "MIMARU 京都 河原町五條 入住",
              hours: "14:30 辦理入住",
              notes: "自京都站搭乘計程車約8分鐘抵達飯店，稍作梳洗休息。",
              address: "京都府京都市下京区西石垣通五条下る平居町17-1",
              latitude: 34.9952444,
              longitude: 135.7664668,
              mapQuery: "MIMARU京都 河原町五条",
              transitModeIcon: "car",
              transitTime: "計程車約 8 分鐘"
            },
            {
              id: "d4-kamogawa",
              category: "景點",
              name: "鴨川河畔散策・四條河原町漫步",
              hours: "15:30 - 18:00",
              ticket: "平緩河畔 · 免門票",
              notes: "秋意漸濃的鴨川旁平坦步道，伴隨微風散步拍照非常舒適。",
              address: "京都府京都市下京区 四条大橋",
              latitude: 35.0037898,
              longitude: 135.7714948,
              mapQuery: "四条大橋 鴨川",
              transitModeIcon: "footprints",
              transitTime: "步行約 5 分鐘"
            },
            {
              id: "d4-dinner",
              category: "美食",
              name: "中島家 Kyoto (預約確認 / 6位)",
              hours: "18:30 - 20:30",
              ticket: "預約確認 · 6位 (京都和風料理)",
              bookingCode: "NAKAJIMA",
              notes: "京都地道精緻家常菜與和風割烹居酒料理，環境舒適雅緻。",
              address: "京都府京都市下京区仏光寺通烏丸東入上柳町315-4",
              mapQuery: "中島家 京都",
              transitModeIcon: "car",
              transitTime: "短程計程車即達"
            }
          ]
        },
        {
          dateStr: "2026-11-12",
          weekday: "Thu",
          dayNumber: "12",
          location: "天橋立",
          energy: {
            steps: "2,500",
            level: "極輕鬆",
            terrain: "全日專屬專車+單軌斜坡車",
            rest: "免爬坡、專車隨時歇腳"
          },
          hotel: {
            name: "MIMARU 京都 河原町五條",
            address: "京都府京都市下京区西石垣通五条下る平居町17-1",
            latitude: 34.9952444,
            longitude: 135.7664668
          },
          items: [
            {
              id: "d5-charter-start",
              category: "交通",
              name: "海之京都 全日專屬包車出發",
              hours: "08:00 集合",
              ticket: "全日專屬專車 · 免轉車奔波",
              notes: "今日全程專屬包車直達天橋立與伊根，長輩免舟車勞頓與轉車之苦。",
              address: "京都府京都市下京区西石垣通五条下る平居町17-1",
              latitude: 34.9952444,
              longitude: 135.7664668,
              mapQuery: "MIMARU京都 河原町五条",
              transitModeIcon: "car",
              transitTime: "專車前往宮津約 100 分鐘"
            },
            {
              id: "d5-amanohashidate",
              category: "景點",
              name: "天橋立 傘松公園 (昇龍觀) & 元伊勢籠神社",
              hours: "09:50 - 11:20",
              ticket: "單軌斜坡車來回約 680円",
              notes: "搭乘平穩安全的單軌斜坡車直達景觀台，長輩免走陡坡即可俯瞰日本三景。",
              address: "京都府宮津市字大垣75 傘松公園",
              latitude: 35.5867585,
              longitude: 135.195117,
              mapQuery: "傘松公園 ケーブルカー",
              transitModeIcon: "mountain",
              transitTime: "搭乘斜坡車約 5 分鐘"
            },
            {
              id: "d5-lunch",
              category: "美食",
              name: "宮津灣海鮮名物午餐",
              hours: "12:00 - 13:00",
              ticket: "丹後新鮮漁獲定食",
              notes: "品嚐丹後若狹灣新鮮海鮮丼、烤魚定食。",
              address: "京都府宮津市文珠 天橋立桟橋周辺",
              latitude: 35.5585434,
              longitude: 135.1847388,
              mapQuery: "天橋立桟橋",
              transitModeIcon: "calculator"
            },
            {
              id: "d5-ine-cruise",
              category: "景點",
              name: "伊根町舟屋巡禮 & 伊根灣觀光船",
              hours: "13:40 - 15:40",
              ticket: "遊船票 1,000円",
              notes: "從海上遠眺230間傳統水上舟屋，船上可餵海鷗。隨後在舟屋咖啡館坐下飲茶。",
              address: "京都府与謝郡伊根町日出11 伊根湾めぐり遊覧船",
              latitude: 35.670506,
              longitude: 135.277374,
              mapQuery: "伊根湾めぐり遊覧船のりば",
              transitModeIcon: "sailboat",
              transitTime: "包車車程約 30 分鐘"
            },
            {
              id: "d5-dinner",
              category: "美食",
              name: "Lugol Kyoto (預約確認 / 4+2位)",
              hours: "19:00 - 21:00",
              ticket: "預約確認 · 4+2位 (餐酒館)",
              bookingCode: "LUGOL",
              notes: "專車約 17:30 返回京都飯店休整，晚間前往精緻餐酒館 Lugol 享用晚餐。",
              address: "京都府京都市中京区烏丸通蛸薬師西入る橋弁慶町222",
              mapQuery: "Lugol Kyoto",
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
          energy: {
            steps: "4,000",
            level: "適中",
            terrain: "新幹線 + GINZA SIX 室內平路",
            rest: "商場座椅充足"
          },
          hotel: {
            name: "東京銀座格蘭巴哈酒店",
            address: "東京都中央区銀座5-13-12",
            latitude: 35.6686151,
            longitude: 139.7665053
          },
          items: [
            {
              id: "d6-shinkansen",
              category: "交通",
              name: "東海道新幹線 Nozomi 前往東京",
              hours: "10:00 - 12:15",
              ticket: "新幹線指定席 · 2h 15m",
              notes: "京都站搭乘新幹線直達東京站，平穩疾馳約 2 小時 15 分，車上享受鐵道便當與熱咖啡。",
              address: "東京都千代田区丸の内１丁目 東京駅",
              latitude: 35.6811505,
              longitude: 139.7659765,
              mapQuery: "JR 東京駅",
              transitModeIcon: "train",
              transitTime: "新幹線 2h 15m"
            },
            {
              id: "d6-hotel-tokyo",
              category: "住宿",
              name: "銀座格蘭巴哈酒店 入住寄放行李",
              hours: "12:45 抵達",
              notes: "東京站搭計程車5分鐘即達飯店。環境雅緻清幽，周邊生活機能極佳。",
              address: "東京都中央区銀座5-13-12",
              latitude: 35.6686151,
              longitude: 139.7665053,
              mapQuery: "ホテルグランバッハ東京銀座",
              transitModeIcon: "car",
              transitTime: "計程車約 8 分鐘"
            },
            {
              id: "d6-ginza-six",
              category: "景點",
              name: "GINZA SIX、蔦屋書店與銀座大道漫步",
              hours: "14:00 - 18:00",
              ticket: "全平坦商場 · 免門票",
              notes: "GINZA SIX 內部挑高舒適、空調宜人且休息座椅豐富，長輩逛街毫無壓力。",
              address: "東京都中央区銀座6-10-1",
              latitude: 35.6695326,
              longitude: 139.764049,
              mapQuery: "GINZA SIX",
              transitModeIcon: "footprints",
              transitTime: "步行約 3 分鐘"
            },
            {
              id: "d6-dinner",
              category: "美食",
              name: "銀座精緻洋食或壽司輕晚餐",
              hours: "18:30 - 20:00",
              ticket: "銀座老舖風味",
              notes: "於銀座四丁目附近享用老舖洋食或板前壽司，散步回飯店。",
              address: "東京都中央区銀座４丁目",
              mapQuery: "銀座四丁目交差点",
              transitModeIcon: "calculator"
            }
          ]
        },
        {
          dateStr: "2026-11-14",
          weekday: "Sat",
          dayNumber: "14",
          location: "東京",
          energy: {
            steps: "5,800",
            level: "微累 (中)",
            terrain: "林蔭步道與現代花園",
            rest: "中途安排喫茶店歇腳"
          },
          hotel: {
            name: "東京銀座格蘭巴哈酒店",
            address: "東京都中央区銀座5-13-12",
            latitude: 35.6686151,
            longitude: 139.7665053
          },
          items: [
            {
              id: "d7-omotesando",
              category: "景點",
              name: "表參道林蔭大道・當代建築巡禮",
              hours: "10:00 - 13:00",
              ticket: "林蔭步道 · 免門票",
              notes: "櫸樹林蔭大道地勢平緩，欣賞大師建築外觀，漫步選品店，步調悠閒。",
              address: "東京都渋谷区神宮前４丁目１２−１０",
              latitude: 35.6672123,
              longitude: 139.7089044,
              mapQuery: "表参道ヒルズ",
              transitModeIcon: "car",
              transitTime: "銀座搭計程車約 15 分鐘"
            },
            {
              id: "d7-azabudai",
              category: "景點",
              name: "麻布台之丘 (Azabudai Hills) 現代花園漫遊",
              hours: "15:00 - 17:30",
              ticket: "中央花園 · 免門票",
              notes: "全日本最新地標。中央廣場綠意盎然，全區無障礙電梯與坡道完善，長輩參觀輕鬆舒服。",
              address: "東京都港区麻布台１丁目３−１",
              latitude: 35.6614747,
              longitude: 139.7408267,
              mapQuery: "麻布台ヒルズ",
              transitModeIcon: "car",
              transitTime: "計程車約 10 分鐘"
            },
            {
              id: "d7-dinner",
              category: "美食",
              name: "Ushigoro S 銀座 (頂級和牛私廚 / 6位)",
              hours: "18:30 - 21:00",
              ticket: "預約完成 · 6位 (專人全代烤 / 全包廂)",
              bookingCode: "ZWQR6K",
              notes: "Ushigoro 旗下最高殿堂全包廂個室服務，專人代烤頂級黑毛和牛全餐。",
              address: "東京都中央区銀座7-7-7 銀座777ビル 6F",
              mapQuery: "USHIGORO S. GINZA",
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
          energy: {
            steps: "4,600",
            level: "適中",
            terrain: "週日步行天國 + 百貨專櫃",
            rest: "隨時回飯店放戰利品"
          },
          hotel: {
            name: "東京銀座格蘭巴哈酒店",
            address: "東京都中央区銀座5-13-12",
            latitude: 35.6686151,
            longitude: 139.7665053
          },
          items: [
            {
              id: "d8-kokyo",
              category: "景點",
              name: "丸之內林蔭仲通 & 皇居外苑散步",
              hours: "10:00 - 12:30",
              ticket: "週日步行者天國 · 免門票",
              notes: "星期日丸之內仲通轉為徒步區，可悠閒散步至皇居二重橋與楠木正成銅像拍合照。",
              address: "東京都千代田区皇居外苑１−１",
              latitude: 35.6779167,
              longitude: 139.7584722,
              mapQuery: "楠木正成像",
              transitModeIcon: "car",
              transitTime: "計程車約 8 分鐘"
            },
            {
              id: "d8-shopping",
              category: "購物",
              name: "銀座三越・松屋・伊東屋採買伴手禮",
              hours: "14:30 - 18:00",
              notes: "集中在銀座採購日本銘菓、保養品與文具，退稅櫃台動線清晰，隨時可回飯店放戰利品。",
              address: "東京都中央区銀座4-6-16",
              latitude: 35.6711936,
              longitude: 139.7659061,
              mapQuery: "銀座三越",
              transitModeIcon: "footprints",
              transitTime: "步行約 4 分鐘"
            },
            {
              id: "d8-dinner",
              category: "美食",
              name: "銀座割烹或季節天婦羅盛宴",
              hours: "18:30",
              ticket: "旅程慶功晚宴",
              notes: "旅程最後一晚在銀座享用精緻日式割烹或天婦羅，晚間整理行李備戰回程。",
              address: "東京都中央区銀座",
              mapQuery: "銀座駅",
              transitModeIcon: "calculator"
            }
          ]
        },
        {
          dateStr: "2026-11-16",
          weekday: "Mon",
          dayNumber: "16",
          location: "東京",
          energy: {
            steps: "2,000",
            level: "極輕鬆",
            terrain: "專車/特快直達機場航廈",
            rest: "機場免稅候機"
          },
          hotel: null,
          items: [
            {
              id: "d9-transit-airport",
              category: "其他",
              name: "飯店退房 ➔ 前往成田機場第二航廈",
              hours: "09:00 - 10:15",
              notes: "建議預約專車接送或搭乘計程車至東京站轉乘 成田特快 N'EX 直達第二航廈。",
              address: "千葉県成田市古込1-1 成田国際空港 第2ターミナル",
              latitude: 35.7732544,
              longitude: 140.3875885,
              mapQuery: "成田国際空港 第2ターミナル",
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
              address: "成田国際空港 第2ターミナル",
              mapQuery: "成田国際空港 第2ターミナル",
              transitModeIcon: "plane"
            }
          ]
        }
      ]
    };
