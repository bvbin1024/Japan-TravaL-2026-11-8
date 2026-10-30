import { createApp, ref, computed, onMounted, watch } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import { TRIP_DATA } from './trip-data.js';
import { DayCard } from './day-card.js';
import { RideActions } from './uber.js';
import { readNowOverride, tokyoParts, planDay } from './clock.js';
import { clothingAdvice } from './advice.js';
import { parseHours } from './clock.js';
import { dayRouteUrl } from './route.js';
import { PHOTO_LIST } from './photos.js';
import { buildBackup, validateBackup } from './backup.js';
import './styles.css';

registerSW({
  immediate: true,
  onRegisteredSW(_url, registration) {
    if (!registration) return;
    const check = () => registration.update().catch(() => {});
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') check();
    });
    setInterval(check, 60 * 60 * 1000);
  }
});

    // 精選城市伴手禮推薦庫
    const CITY_SOUVENIRS = [
      { city: '大阪', name: "Bâton d'or 頂級奶油酥條", desc: "固力果旗艦排隊名菓，濃醇發酵奶油香氣，老少咸宜。", tag: "百貨限定", location: "阪急梅田 / 難波高島屋" },
      { city: '大阪', name: "一心堂 水果大福", desc: "嚴選季節完熟哈密瓜、水蜜桃，外皮軟糯清甜不膩。", tag: "長輩最愛", location: "阪急百貨梅田總店 B1" },
      { city: '大阪', name: "呼吸巧克力 (呼吸チョコ)", desc: "杏仁外裹醇濃馬斯卡彭起司巧克力，曾獲全國菓子大賞。", tag: "經典伴手", location: "關西機場免稅 / 難波站" },
      { city: '大阪', name: "551 蓬萊 鮮肉包 / 燒賣", desc: "大阪靈魂美食，長輩回飯店當宵夜的絕佳點心。", tag: "現做美味", location: "新大阪 / 梅田 / 難波站" },
      { city: '南紀勝浦', name: "紀州南高梅 (蜂蜜/減鹽)", desc: "和歌山特產頂級梅干，肉厚柔嫩，健康生津開胃。", tag: "養生首選", location: "勝浦漁港市場 / 飯店賣店" },
      { city: '南紀勝浦', name: "熟成生黑鮪魚 角煮/佃煮", desc: "勝浦產地直送鮮黑鮪魚特調佃煮，常溫真空好攜帶，配粥絕品。", tag: "產地直送", location: "勝浦漁港 にぎわい市場" },
      { city: '南紀勝浦', name: "那智黑飴 (熊野黑糖名菓)", desc: "以熊野黑石為意象，古法熬煉天然純黑糖，潤喉爽口。", tag: "名勝名產", location: "那智瀑布參道 / 勝浦車站" },
      { city: '南紀勝浦', name: "和歌山 溫州蜜柑汁/果醬", desc: "100% 完熟蜜柑純榨，香甜醇厚，富含天然維他命 C。", tag: "天然無添加", location: "紀伊勝浦車站土產專櫃" },
      { city: '京都', name: "丸久小山園 / 辻利 宇治抹茶", desc: "京都百年茶舖精選抹茶粉、烘焙茶茶包，香氣高雅回甘。", tag: "茶道名門", location: "京都站 / 四條河原町" },
      { city: '京都', name: "原了郭 黑七味粉 (木筒裝)", desc: "宮內省御用調味，烘焙研磨七香，灑在蕎麥麵或火鍋上極香。", tag: "百年調味", location: "京都車站伴手禮街 / 祇園" },
      { city: '京都', name: "茅乃舍 經典純天然高湯包", desc: "烤飛魚與柴魚黃金比例，長輩回台煮湯下麵秒變大廚。", tag: "廚房必備", location: "大丸京都店 / 高島屋專櫃" },
      { city: '天橋立', name: "丹後 黑豆米果仙貝", desc: "天橋立沿海丹後產黑大豆製成，鹹香酥脆，高纖無負擔。", tag: "海之京都", location: "傘松公園賣店 / 伊根觀光船碼頭" },
      { city: '東京', name: "銀座木村屋 酒種紅豆麵包", desc: "1874 年明治天皇御用名物，天然酒種發酵外皮與綿密紅豆餡。", tag: "明治老舖", location: "銀座四丁目 木村屋總本店" },
      { city: '東京', name: "NewYork Perfect Cheese", desc: "白巧克力、切達起司與貓舌餅乾完美融合，全東京最熱門伴手禮。", tag: "排隊冠軍", location: "東京車站內 南通路特設櫃" },
      { city: '東京', name: "合利他命 EX Plus 270錠", desc: "舒緩眼睛疲勞、腰酸背痛，長輩日本藥妝必帶保養品。", tag: "長輩常備", location: "銀座松本清 / 堂吉訶德" },
      { city: '東京', name: "銀座松屋/三越 地下街老舖銘菓", desc: "資生堂 Parlour 花椿餅乾、小形羊羹，包裝極盡雅緻尊榮。", tag: "頂級送禮", location: "銀座三越 / 松屋銀座 B1" }
    ];

    // 純 SVG 原生元件
    const AppIcon = {
      props: ['name'],
      inheritAttrs: false,
      template: `
        <svg v-bind="$attrs" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="app-icon" aria-hidden="true">
          <template v-if="name === 'map-pin'"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></template>
          <template v-else-if="name === 'navigation-2'"><polygon points="12 2 19 21 12 17 5 21 12 2"/></template>
          <template v-else-if="name === 'info'"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></template>
          <template v-else-if="name === 'shopping-bag'"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></template>
          <template v-else-if="name === 'badge-dollar-sign'"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></template>
          <template v-else-if="name === 'train'"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M4 10h16"/><path d="m8 20-2 2"/><path d="m16 20 2 2"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></template>
          <template v-else-if="name === 'bus'"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4C2.9 6 1.9 6.8 1.6 7.8l-1.4 5c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"/><circle cx="7" cy="18" r="2"/><circle cx="15" cy="18" r="2"/></template>
          <template v-else-if="name === 'plane'"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></template>
          <template v-else-if="name === 'car'"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.2 1 12 1 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></template>
          <template v-else-if="name === 'sailboat'"><path d="M22 18H2a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3Z"/><path d="M2 14c5 0 8 3 8 3V2L2 14Z"/><path d="M14 17c1.5-3 4-5 8-5V7l-8 10Z"/></template>
          <template v-else-if="name === 'mountain'"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="m4.14 15 .86-1.5 2.5 2.5"/></template>
          <template v-else-if="name === 'footprints'"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.5v2"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.5v2"/></template>
          <template v-else-if="name === 'bed'"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></template>
          <template v-else-if="name === 'pencil'"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></template>
          <template v-else-if="name === 'clock'"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></template>
          <template v-else-if="name === 'ticket'"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/></template>
          <template v-else-if="name === 'copy'"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></template>
          <template v-else-if="name === 'qr-code'"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></template>
          <template v-else-if="name === 'maximize-2'"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></template>
          <template v-else-if="name === 'refresh-cw'"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></template>
          <template v-else-if="name === 'calculator'"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></template>
          <template v-else-if="name === 'shield-alert'"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></template>
          <template v-else-if="name === 'message-square'"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></template>
          <template v-else-if="name === 'volume-2'"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></template>
          <template v-else-if="name === 'plus'"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></template>
          <template v-else-if="name === 'x'"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></template>
          <template v-else-if="name === 'image'"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></template>
          <template v-else-if="name === 'sun'"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></template>
          <template v-else-if="name === 'cloud-sun'"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></template>
          <template v-else-if="name === 'cloud'"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></template>
          <template v-else-if="name === 'snowflake'"><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></template>
          <template v-else-if="name === 'cloud-rain'"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></template>
          <template v-else><circle cx="12" cy="12" r="9"/></template>
        </svg>
      `
    };

    const app = createApp({
      setup() {
        const tripInfo = ref(TRIP_DATA);
        const currentTab = ref('schedule');
        const selectedDateIndex = ref(0);
        const nowOverride = readNowOverride(window.location.search);
        const nowDate = ref(nowOverride || new Date());
        const clockOverrideLabel = nowOverride ? tokyoParts(nowOverride).label : '';
        
        const isIosDevice = computed(() => {
          return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        });

        const FONT_KEY = 'jp_elderly_mode_timeline';
        const FONT_SCALE_KEY = 'jp_font_scale';
        const readFontMode = () => {
          const legacy = localStorage.getItem(FONT_KEY);
          const scale = localStorage.getItem(FONT_SCALE_KEY);
          if (legacy === 'false') return 'standard';
          if (scale === 'xl') return 'xl';
          return 'large';
        };
        const fontMode = ref(readFontMode());
        const applyFontMode = (mode) => {
          document.documentElement.classList.remove('font-standard', 'font-large', 'font-xl');
          const cls = mode === 'standard' ? 'font-standard' : mode === 'xl' ? 'font-xl' : 'font-large';
          document.documentElement.classList.add(cls);
        };
        const persistFontMode = (mode) => {
          localStorage.setItem(FONT_KEY, mode === 'standard' ? 'false' : 'true');
          if (mode === 'xl') localStorage.setItem(FONT_SCALE_KEY, 'xl');
          else localStorage.removeItem(FONT_SCALE_KEY);
        };
        const fontModeLabel = computed(() => fontMode.value === 'xl' ? '特大' : fontMode.value === 'standard' ? '標準' : '大字');
        const cycleFontMode = () => {
          const order = ['large', 'xl', 'standard'];
          const next = order[(order.indexOf(fontMode.value) + 1) % order.length];
          fontMode.value = next;
          persistFontMode(next);
          applyFontMode(next);
        };

        const bottomTabs = [
          { id: 'schedule', name: '每日行程', short: '行程', icon: 'map-pin' },
          { id: 'phrases', name: '日語卡', short: '日語卡', icon: 'message-square' },
          { id: 'rates', name: '匯率', short: '匯率', icon: 'badge-dollar-sign' },
          { id: 'emergency', name: '緊急', short: '緊急', icon: 'shield-alert' }
        ];

        const WEEKDAY_ZH = { Sun: '日', Mon: '一', Tue: '二', Wed: '三', Thu: '四', Fri: '五', Sat: '六' };
        const dayLabel = (day, index) => {
          const parts = String(day?.dateStr || '').split('-');
          const month = Number(parts[1]);
          const date = Number(parts[2]);
          return {
            date: month && date ? `${month}/${date}（${WEEKDAY_ZH[day.weekday] || ''}）` : '',
            nth: `第${index + 1}天`
          };
        };
        const isToday = (day) => dayPlan.value.phase === 'during' && day?.dateStr === dayPlan.value.tokyo.dateStr;
        const isOffline = ref(typeof navigator !== 'undefined' ? !navigator.onLine : false);
        const toast = ref('');
        const driverCard = ref(null);
        const staffCard = ref(null);
        const openStaffCard = (item) => {
          if (!item?.bookingCode) return;
          staffCard.value = { code: item.bookingCode, name: item.name || '' };
        };
        const openDriverCard = (place) => {
          if (!place) return;
          driverCard.value = {
            name: place.name || '',
            address: place.address || '',
          };
        };
        let toastTimer = null;
        const showToast = (msg) => {
          toast.value = msg;
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => { toast.value = ''; }, 2800);
        };

        let deferredPrompt = null;
        const canInstall = ref(false);
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          deferredPrompt = e;
          canInstall.value = true;
        });
        const promptInstall = async () => {
          if (!deferredPrompt) return;
          deferredPrompt.prompt();
          try { await deferredPrompt.userChoice; } catch (e) {}
          deferredPrompt = null;
          canInstall.value = false;
        };
        const goInstallHelp = () => {
          currentTab.value = 'info';
          setTimeout(() => {
            const el = document.getElementById('install-help');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 60);
        };

        const quickPhrases = [
          { zh: "請問電梯在哪裡？", jp: "すみません、エレベーターはどこですか？" },
          { zh: "請問洗手間在哪裡？", jp: "トイレはどこですか？" },
          { zh: "可以給我溫開水嗎？", jp: "温かいお湯をいただけますか？" },
          { zh: "請幫我們分開結帳。", jp: "別々で会計をお願いします。" },
          { zh: "請問可以免稅退稅嗎？", jp: "免税（Tax-Free）はできますか？" },
          { zh: "請問結帳可以使用信用卡嗎？", jp: "クレジットカードは使えますか？" }
        ];

        const selectedPhrase = ref(null);

        const playFallbackAudio = (text) => {
          try {
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ja&client=tw-ob`;
            const audio = new Audio(url);
            audio.play().catch(() => {
              console.warn('音訊播放需使用者手動點擊觸發');
            });
          } catch(e) {
            console.error('音訊保底異常', e);
          }
        };

        const speakText = (text, lang) => {
          if (!text) return;
          if (!window.speechSynthesis) {
            showToast('這支手機目前不能朗讀，請看畫面上的字');
            return;
          }
          try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = lang.startsWith('ja') ? 0.85 : 0.95;
            const voices = window.speechSynthesis.getVoices?.() || [];
            const prefix = lang.slice(0, 2).toLowerCase();
            const voice = voices.find((item) => String(item.lang || '').toLowerCase().startsWith(prefix));
            if (voice) utterance.voice = voice;
            utterance.onerror = () => {
              if (lang.startsWith('ja')) playFallbackAudio(text);
              else showToast('這支手機目前唸不出來，請看畫面上的字');
            };
            window.speechSynthesis.speak(utterance);
          } catch (e) {
            if (lang.startsWith('ja')) playFallbackAudio(text);
            else showToast('這支手機目前不能朗讀，請看畫面上的字');
          }
        };

        const speakJapanese = (text) => speakText(text, 'ja-JP');
        const readTodayAloud = () => {
          const day = currentDay.value || {};
          const label = dayLabel(day, selectedDateIndex.value);
          const lines = [`${label.date} ${label.nth} ${day.location || ''}`];
          (day.items || []).forEach((item) => {
            const times = parseHours(item.hours);
            lines.push(`${times ? times.startLabel : ''} ${item.name}`);
          });
          if (day.hotel?.name) lines.push(`今晚住 ${day.hotel.name}`);
          speakText(lines.filter(Boolean).join('。'), 'zh-TW');
        };
        const readNextAloud = () => {
          const text = dayPlan.value.banner?.text;
          if (!text) {
            showToast('現在沒有下一站可以唸');
            return;
          }
          speakText(text, 'zh-TW');
        };

        const openPhraseModal = (ph) => {
          selectedPhrase.value = ph;
          speakJapanese(ph.jp);
        };

        // 行程資料 (含體力指數資料更新鍵)
        let savedDays = null;
        try {
          const raw = localStorage.getItem('jp_trip_v2026_energy');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) savedDays = parsed;
          }
        } catch(e) {}

        const itineraryDays = ref(savedDays || tripInfo.value.days);

        const availableCities = ['全部', '大阪', '南紀勝浦', '京都', '天橋立', '東京'];
        const activeShoppingCity = ref('全部');

        const currentDay = computed(() => {
          return itineraryDays.value[selectedDateIndex.value] || itineraryDays.value[0] || {};
        });

        const dayPlan = computed(() => planDay(itineraryDays.value, nowDate.value));
        const stopStatus = (item) => dayPlan.value.statuses?.[item?.id] || '';
        const routeUrl = computed(() => dayRouteUrl(currentDay.value?.items || []));

        const todayGlanceText = computed(() => {
          const items = currentDay.value?.items || [];
          const hasDinner = items.some(i => i.bookingCode || i.category === '美食');
          const loc = currentDay.value?.location || '日本';
          if (hasDinner) {
            return `📍 ${loc} · 安排精緻晚餐預約 · 步調舒適`;
          }
          return `📍 ${loc} · 平緩漫遊步道 · 輕鬆無負擔`;
        });

        // 體力指數徽章顏色
        const energyBadgeColor = (level) => {
          switch (level) {
            case '極輕鬆': return 'bg-emerald-100 text-emerald-800';
            case '輕鬆': return 'bg-teal-100 text-teal-800';
            case '適中': return 'bg-amber-100 text-amber-900';
            case '微累 (中)': return 'bg-orange-100 text-orange-900';
            default: return 'bg-emerald-100 text-emerald-800';
          }
        };

        watch(() => currentDay.value?.location, (newLoc) => {
          if (newLoc && availableCities.includes(newLoc)) {
            activeShoppingCity.value = newLoc;
          }
        }, { immediate: true });

        const filteredRecommendations = computed(() => {
          if (activeShoppingCity.value === '全部') {
            return CITY_SOUVENIRS;
          }
          return CITY_SOUVENIRS.filter(item => item.city === activeShoppingCity.value);
        });

        const shoppingList = ref(JSON.parse(localStorage.getItem('jp_shopping_user_list')) || []);
        const expenses = ref(JSON.parse(localStorage.getItem('jp_expenses_clean')) || []);

        const totalExpenseJPY = computed(() => {
          return expenses.value.reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);
        });

        const addRecommendedToShopping = (rec) => {
          shoppingList.value.push({
            id: 'rec-' + Date.now(),
            name: `${rec.name} (${rec.city})`,
            notes: `${rec.desc} · 推薦地點：${rec.location}`,
            image: null,
            bought: false
          });
          persistShopping();
        };

        const currentJpyRate = ref(Number(localStorage.getItem('cached_jpy_rate_clean')) || 0.215);
        const inputJpyAmount = ref(10000);
        const isRateLoading = ref(false);
        const rateLastUpdated = ref(localStorage.getItem('jpy_rate_time_clean') || '預設匯率');

        const convertedTWD = computed(() => {
          return Math.round((inputJpyAmount.value || 0) * currentJpyRate.value);
        });

        const rateOffline = ref(!navigator.onLine);
        const rateUpdatedLabel = computed(() => {
          const t = rateLastUpdated.value;
          if (rateOffline.value && t && t !== '預設匯率') return `${t}（離線，這是上次記下的匯率）`;
          if (rateOffline.value) return '離線，使用預設匯率';
          return t;
        });

        const fetchLiveRates = async () => {
          if (!navigator.onLine) {
            rateOffline.value = true;
            isRateLoading.value = false;
            return;
          }
          isRateLoading.value = true;
          try {
            const res = await fetch('https://open.er-api.com/v6/latest/JPY');
            if (!res.ok) throw new Error('rate');
            const data = await res.json();
            if (data && data.result === 'success' && data.rates.TWD) {
              currentJpyRate.value = Number(data.rates.TWD.toFixed(4));
              const now = new Date();
              const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
              rateLastUpdated.value = timeStr;
              rateOffline.value = false;
              localStorage.setItem('cached_jpy_rate_clean', currentJpyRate.value);
              localStorage.setItem('jpy_rate_time_clean', timeStr);
            }
          } catch (e) {
            rateOffline.value = true;
            console.warn('匯率更新失敗');
          } finally {
            isRateLoading.value = false;
          }
        };

        const isWeatherLoading = ref(false);
        const WEATHER_TIME_KEY = 'cached_jp_weather_time_clean';
        let weatherTimesInit = {};
        try { weatherTimesInit = JSON.parse(localStorage.getItem(WEATHER_TIME_KEY) || '{}') || {}; } catch (e) { weatherTimesInit = {}; }
        const weatherTimes = ref(weatherTimesInit);
        const weatherOffline = ref(!navigator.onLine);
        let storedWeatherLocs = new Set();
        try {
          const rawWeather = localStorage.getItem('cached_jp_weather_clean');
          if (rawWeather) storedWeatherLocs = new Set(Object.keys(JSON.parse(rawWeather)));
        } catch (e) {}
        const weatherLastUpdated = ref('');
        const defaultWeather = {
          '大阪': { icon: 'cloud-sun', summary: '晴時多雲 · 涼爽', temp: 18, feelsLike: 17 },
          '南紀勝浦': { icon: 'sun', summary: '太平洋晴朗 · 溫暖', temp: 20, feelsLike: 20 },
          '京都': { icon: 'cloud-sun', summary: '秋意漸濃 · 涼爽', temp: 16, feelsLike: 15 },
          '天橋立': { icon: 'cloud', summary: '海灣微風 · 舒適', temp: 15, feelsLike: 14 },
          '東京': { icon: 'sun', summary: '秋高氣爽 · 晴朗', temp: 17, feelsLike: 16 }
        };

        const liveWeatherData = ref(JSON.parse(localStorage.getItem('cached_jp_weather_clean')) || defaultWeather);

        const currentDayWeather = computed(() => {
          const loc = currentDay.value?.location || '大阪';
          return liveWeatherData.value[loc] || defaultWeather[loc] || { icon: 'cloud-sun', summary: '氣候宜人', temp: 17, feelsLike: 16 };
        });

        const fetchLiveWeather = async (targetLoc) => {
          const loc = targetLoc || currentDay.value?.location || '大阪';
          if (!navigator.onLine) {
            weatherOffline.value = true;
            isWeatherLoading.value = false;
            return;
          }
          const coords = tripInfo.value.cities?.[loc] || { lat: 34.69, lon: 135.50 };

          isWeatherLoading.value = true;
          try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,apparent_temperature,weather_code&timezone=Asia/Tokyo`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('weather');
            const data = await res.json();
            if (data && data.current) {
              const cur = data.current;
              let icon = 'cloud-sun';
              let summary = '晴時多雲';
              if (cur.weather_code === 0) { icon = 'sun'; summary = '晴朗無雲'; }
              else if (cur.weather_code === 3) { icon = 'cloud'; summary = '陰天多雲'; }
              else if (cur.weather_code >= 51) { icon = 'cloud-rain'; summary = '短暫降雨'; }

              liveWeatherData.value[loc] = {
                icon,
                summary,
                temp: Math.round(cur.temperature_2m),
                feelsLike: Math.round(cur.apparent_temperature)
              };

              const now = new Date();
              const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
              weatherLastUpdated.value = timeStr;
              weatherTimes.value = { ...weatherTimes.value, [loc]: timeStr };
              weatherOffline.value = false;
              storedWeatherLocs.add(loc);
              localStorage.setItem('cached_jp_weather_clean', JSON.stringify(liveWeatherData.value));
              localStorage.setItem(WEATHER_TIME_KEY, JSON.stringify(weatherTimes.value));
            }
          } catch (e) {
            weatherOffline.value = true;
            console.warn('氣象讀取異常');
          } finally {
            isWeatherLoading.value = false;
          }
        };

        const weatherUpdatedLabel = computed(() => {
          const loc = currentDay.value?.location;
          const t = loc && weatherTimes.value[loc];
          if (t && weatherOffline.value) return `${t}（離線，這是上次記下的天氣）`;
          if (t) return t;
          if (loc && storedWeatherLocs.has(loc)) return '上次記下的天氣（日期未存）';
          return '季節預估，連上網後會更新';
        });

        const FORECAST_KEY = 'cached_jp_forecast_clean';
        let forecastInit = {};
        try { forecastInit = JSON.parse(localStorage.getItem(FORECAST_KEY) || '{}') || {}; } catch (e) { forecastInit = {}; }
        const forecastCache = ref(forecastInit);
        const forecastOffline = ref(!navigator.onLine);
        const forecastKey = (day) => day?.dateStr && day?.location ? `${day.dateStr}|${day.location}` : '';
        const currentForecast = computed(() => forecastCache.value[forecastKey(currentDay.value)] || null);
        const forecastLabel = computed(() => {
          const item = currentForecast.value;
          if (!item) return '這天的預報還沒有抓到';
          if (forecastOffline.value) return `${item.updatedAt}（離線，這是上次記下的預報）`;
          return item.updatedAt;
        });

        const fetchForecast = async (day) => {
          const key = forecastKey(day);
          const coords = day?.location ? tripInfo.value.cities?.[day.location] : null;
          if (!key || !coords) return;
          if (!navigator.onLine) {
            forecastOffline.value = true;
            return;
          }
          try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&start_date=${day.dateStr}&end_date=${day.dateStr}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('forecast');
            const data = await res.json();
            const advice = clothingAdvice(data);
            if (!advice) throw new Error('empty forecast');
            const now = new Date();
            const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            forecastCache.value = { ...forecastCache.value, [key]: { ...advice, updatedAt: timeStr } };
            localStorage.setItem(FORECAST_KEY, JSON.stringify(forecastCache.value));
            forecastOffline.value = false;
          } catch (e) {
            forecastOffline.value = true;
            console.warn('預報讀取異常');
          }
        };

        const copyText = async (txt, label = '內容') => {
          if (!txt) return;
          const okMsg = `已複製${label}：${txt}`;
          const fallbackMsg = `${label}：${txt}`;
          try {
            if (navigator.clipboard && window.isSecureContext) {
              await navigator.clipboard.writeText(txt);
              showToast(okMsg);
              return;
            }
            throw new Error('clipboard');
          } catch (e) {
            try {
              const ta = document.createElement('textarea');
              ta.value = txt;
              ta.setAttribute('readonly', '');
              ta.style.position = 'fixed';
              ta.style.top = '0';
              ta.style.left = '-9999px';
              document.body.appendChild(ta);
              ta.select();
              const ok = document.execCommand('copy');
              document.body.removeChild(ta);
              showToast(ok ? okMsg : fallbackMsg);
            } catch (err) {
              showToast(fallbackMsg);
            }
          }
        };

        const vjwQr = ref(localStorage.getItem('my_vjw_qr_clean') || null);
        const showFullScreenQr = ref(false);

        const compressImg = (file, maxDim, quality, cb) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              let w = img.width, h = img.height;
              if (w > h && w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; }
              else if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; }
              const cvs = document.createElement('canvas');
              cvs.width = w; cvs.height = h;
              cvs.getContext('2d').drawImage(img, 0, 0, w, h);
              cb(cvs.toDataURL('image/jpeg', quality));
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        };

        const handleVjwUpload = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          compressImg(file, 800, 0.8, (base64) => {
            vjwQr.value = base64;
            localStorage.setItem('my_vjw_qr_clean', base64);
          });
        };

        const handleShoppingImageUpload = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          compressImg(file, 600, 0.75, (base64) => {
            shoppingForm.value.image = base64;
          });
        };

        const changeDate = (idx) => { selectedDateIndex.value = idx; };

        const openSmartMap = (query) => {
          if (!query) return;
          const encoded = encodeURIComponent(query);
          if (isIosDevice.value) {
            window.location.href = `maps://maps.apple.com/?q=${encoded}`;
          } else {
            window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
          }
        };

        const searchNearby = (type) => {
          const loc = currentDay.value?.location || '大阪';
          let query = '';
          
          if (type === 'toilet') {
            if (loc === '大阪') query = '大阪 心斎橋 駅周辺 トイレ 多目的トイレ';
            else if (loc === '南紀勝浦') query = '紀伊勝浦 駅周辺 トイレ 公衆トイレ';
            else if (loc === '京都') query = '京都 河原町 駅周辺 トイレ 多目的トイレ';
            else if (loc === '天橋立') query = '天橋立 傘松公園 周辺 トイレ';
            else if (loc === '東京') query = '東京 銀座 駅周辺 トイレ 多目的トイレ';
            else query = `${loc} 駅周辺 トイレ 多目的トイレ`;
          } else {
            if (loc === '大阪') query = '大阪 心斎橋 コンビニ 7-Eleven';
            else if (loc === '南紀勝浦') query = '勝浦 温泉 コンビニ';
            else if (loc === '京都') query = '京都 河原町 五条 コンビニ';
            else if (loc === '天橋立') query = '宮津 天橋立 コンビニ';
            else if (loc === '東京') query = '東京 銀座 コンビニ';
            else query = `${loc} コンビニ`;
          }
          
          openSmartMap(query);
        };

        const expenseCategoryIcon = (cat) => {
          switch (cat) {
            case '飲食': return 'calculator';
            case '交通': return 'train';
            case '購物': return 'shopping-bag';
            case '住宿': return 'bed';
            case '門票': return 'ticket';
            default: return 'badge-dollar-sign';
          }
        };

        // Modal 邏輯
        const showScheduleModal = ref(false);
        const isEditingSchedule = ref(false);
        const modalScheduleForm = ref({});
        const showShoppingModal = ref(false);
        const shoppingForm = ref({ name: '', image: null, notes: '', bought: false });
        const showExpenseModal = ref(false);
        const expenseForm = ref({ category: '飲食', name: '', date: new Date().toISOString().slice(0, 10), amount: 0, paymentMethod: '信用卡', notes: '' });

        const addExpenseAmount = (val) => {
          const current = Number(expenseForm.value.amount) || 0;
          expenseForm.value.amount = current + val;
        };

        const handleFabClick = () => {
          if (currentTab.value === 'schedule') {
            isEditingSchedule.value = false;
            modalScheduleForm.value = { id: 'it-' + Date.now(), category: '景點', name: '', hours: '', ticket: '', bookingCode: '', notes: '', address: '', transitModeIcon: 'train', transitTime: '15 分鐘' };
            showScheduleModal.value = true;
          } else if (currentTab.value === 'shopping') {
            shoppingForm.value = { name: '', image: null, notes: '', bought: false };
            showShoppingModal.value = true;
          } else if (currentTab.value === 'rates' || currentTab.value === 'expenses') {
            expenseForm.value = { category: '飲食', name: '', date: new Date().toISOString().slice(0, 10), amount: 0, paymentMethod: '信用卡', notes: '' };
            showExpenseModal.value = true;
          }
        };

        const openEditModal = (item) => {
          isEditingSchedule.value = true;
          modalScheduleForm.value = JSON.parse(JSON.stringify(item));
          showScheduleModal.value = true;
        };

        const saveScheduleItem = () => {
          if (!modalScheduleForm.value.name) return;
          const items = currentDay.value.items;
          if (isEditingSchedule.value) {
            const idx = items.findIndex(i => i.id === modalScheduleForm.value.id);
            if (idx !== -1) items[idx] = { ...modalScheduleForm.value };
          } else {
            items.push({ ...modalScheduleForm.value });
          }
          localStorage.setItem('jp_trip_v2026_energy', JSON.stringify(itineraryDays.value));
          showScheduleModal.value = false;
        };

        const confirmDeleteScheduleItem = () => {
          if (confirm('確定刪除這個行程嗎？')) {
            const items = currentDay.value.items;
            const idx = items.findIndex(i => i.id === modalScheduleForm.value.id);
            if (idx !== -1) items.splice(idx, 1);
            localStorage.setItem('jp_trip_v2026_energy', JSON.stringify(itineraryDays.value));
            showScheduleModal.value = false;
          }
        };

        const persistShopping = () => {
          localStorage.setItem('jp_shopping_user_list', JSON.stringify(shoppingList.value));
        };

        const saveShoppingItem = () => {
          if (!shoppingForm.value.name) return;
          shoppingList.value.push({ id: 's-' + Date.now(), ...shoppingForm.value });
          persistShopping();
          showShoppingModal.value = false;
        };

        const deleteShoppingItem = (idx) => {
          if (confirm('確定刪除此項目？')) {
            shoppingList.value.splice(idx, 1);
            persistShopping();
          }
        };

        const saveExpenseItem = () => {
          if (!expenseForm.value.name || !expenseForm.value.amount) return;
          expenses.value.unshift({ id: 'e-' + Date.now(), ...expenseForm.value });
          localStorage.setItem('jp_expenses_clean', JSON.stringify(expenses.value));
          showExpenseModal.value = false;
        };

        const deleteExpense = (idx) => {
          if (confirm('確定刪除此紀錄？')) {
            expenses.value.splice(idx, 1);
            localStorage.setItem('jp_expenses_clean', JSON.stringify(expenses.value));
          }
        };

        const scrollToFocus = () => {
          const plan = dayPlan.value;
          const tab = document.getElementById('day-tab-' + selectedDateIndex.value);
          if (tab) tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          if (plan.phase === 'during' && plan.focusId && plan.focusDayIndex === selectedDateIndex.value) {
            const stop = document.getElementById('stop-' + plan.focusId);
            if (stop) stop.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        };

        const autoFocusToday = () => {
          const plan = dayPlan.value;
          if (plan.phase === 'during') {
            const idx = itineraryDays.value.findIndex((day) => day.dateStr === plan.tokyo.dateStr);
            if (idx !== -1) selectedDateIndex.value = idx;
          }
          setTimeout(scrollToFocus, 350);
        };

        const showFab = computed(() => ['schedule', 'shopping', 'rates', 'expenses'].includes(currentTab.value));
        const fabLabel = computed(() => {
          if (currentTab.value === 'rates' || currentTab.value === 'expenses') return '記帳';
          if (currentTab.value === 'shopping') return '新增物品';
          return '新增行程';
        });

        const pressKey = (digit) => {
          const current = String(inputJpyAmount.value || '');
          const next = (current === '0' ? '' : current) + String(digit);
          if (next.length > 7) return;
          inputJpyAmount.value = Number(next);
        };
        const clearAmount = () => { inputJpyAmount.value = 0; };
        const backspaceAmount = () => {
          const text = String(inputJpyAmount.value || '');
          inputJpyAmount.value = Number(text.slice(0, -1) || 0);
        };
        const setAmount = (amount) => { inputJpyAmount.value = amount; };
        const expenseTwd = computed(() => Math.round((Number(expenseForm.value.amount) || 0) * currentJpyRate.value));

        const FAMILY_KEY = 'jp_family_contacts';
        let familyInit = [];
        try {
          const parsed = JSON.parse(localStorage.getItem(FAMILY_KEY) || '[]');
          if (Array.isArray(parsed)) familyInit = parsed;
        } catch (e) { familyInit = []; }
        const familyContacts = ref(familyInit);
        const familyForm = ref({ name: '', phone: '' });
        const saveFamilyContact = () => {
          const phone = String(familyForm.value.phone || '').trim();
          const name = String(familyForm.value.name || '').trim();
          if (!phone) return;
          familyContacts.value.push({ id: 'f-' + Date.now(), name, phone });
          localStorage.setItem(FAMILY_KEY, JSON.stringify(familyContacts.value));
          familyForm.value = { name: '', phone: '' };
        };
        const deleteFamilyContact = (idx) => {
          familyContacts.value.splice(idx, 1);
          localStorage.setItem(FAMILY_KEY, JSON.stringify(familyContacts.value));
        };

        const photoCredit = ref(null);
        const openPhotoCredit = (photo) => { photoCredit.value = photo; };
        const exportBackup = () => {
          const payload = buildBackup(localStorage);
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = '日本深度旅遊-備份.json';
          link.click();
          setTimeout(() => URL.revokeObjectURL(link.href), 1000);
          showToast('已下載備份。入境 QR Code 也請另外截一張圖');
        };
        const importBackup = (event) => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const parsed = JSON.parse(String(reader.result || ''));
              const data = validateBackup(parsed);
              Object.entries(data).forEach(([key, value]) => localStorage.setItem(key, value));
              showToast('備份已匯入，正在重新整理');
              setTimeout(() => window.location.reload(), 600);
            } catch (e) {
              showToast('這份備份讀不起來，原來的資料沒有改動');
            }
          };
          reader.onerror = () => showToast('這份備份讀不起來，原來的資料沒有改動');
          reader.readAsText(file);
        };

        onMounted(() => {
          applyFontMode(fontMode.value);
          if (!itineraryDays.value || itineraryDays.value.length === 0) {
            itineraryDays.value = TRIP_DATA.days;
          }
          autoFocusToday();
          fetchLiveRates();
          fetchLiveWeather(currentDay.value?.location);
          fetchForecast(currentDay.value);
          if (!nowOverride) {
            setInterval(() => { nowDate.value = new Date(); }, 60000);
          }
          window.addEventListener('offline', () => {
            isOffline.value = true;
            weatherOffline.value = true;
            rateOffline.value = true;
            forecastOffline.value = true;
          });
          window.addEventListener('online', () => {
            isOffline.value = false;
            fetchLiveRates();
            fetchLiveWeather(currentDay.value?.location);
            fetchForecast(currentDay.value);
          });
        });

        watch(currentDay, (day) => { fetchForecast(day); });

        return {
          tripInfo,
          currentTab,
          bottomTabs,
          selectedDateIndex,
          itineraryDays,
          currentDay,
          currentDayWeather,
          isWeatherLoading,
          weatherLastUpdated,
          weatherUpdatedLabel,
          weatherOffline,
          fetchLiveWeather,
          currentForecast,
          forecastLabel,
          fetchForecast,
          dayPlan,
          stopStatus,
          routeUrl,
          clockOverrideLabel,
          readTodayAloud,
          readNextAloud,
          photoList: PHOTO_LIST,
          photoCredit,
          openPhotoCredit,
          exportBackup,
          importBackup,
          fontMode,
          fontModeLabel,
          cycleFontMode,
          isIosDevice,
          quickPhrases,
          selectedPhrase,
          openPhraseModal,
          speakJapanese,
          copyText,
          todayGlanceText,
          energyBadgeColor,
          openSmartMap,
          searchNearby,
          vjwQr,
          showFullScreenQr,
          handleVjwUpload,
          currentJpyRate,
          inputJpyAmount,
          convertedTWD,
          isRateLoading,
          rateLastUpdated,
          rateUpdatedLabel,
          rateOffline,
          fetchLiveRates,
          availableCities,
          activeShoppingCity,
          filteredRecommendations,
          addRecommendedToShopping,
          shoppingList,
          expenses,
          totalExpenseJPY,
          showScheduleModal,
          isEditingSchedule,
          modalScheduleForm,
          showShoppingModal,
          shoppingForm,
          showExpenseModal,
          expenseForm,
          addExpenseAmount,
          changeDate,
          handleFabClick,
          openEditModal,
          saveScheduleItem,
          confirmDeleteScheduleItem,
          handleShoppingImageUpload,
          saveShoppingItem,
          deleteShoppingItem,
          persistShopping,
          saveExpenseItem,
          deleteExpense,
          expenseCategoryIcon,
          dayLabel,
          isToday,
          toast,
          driverCard,
          openDriverCard,
          staffCard,
          openStaffCard,
          pressKey,
          clearAmount,
          backspaceAmount,
          setAmount,
          expenseTwd,
          familyContacts,
          familyForm,
          saveFamilyContact,
          deleteFamilyContact,
          showFab,
          isOffline,
          fabLabel,
          canInstall,
          promptInstall,
          goInstallHelp
        };
      }
    });

    app.component('app-icon', AppIcon);
    app.component('day-card', DayCard);
    app.component('ride-actions', RideActions);
    app.mount('#app');
  