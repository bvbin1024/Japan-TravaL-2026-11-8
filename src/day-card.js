// 行程卡。下一階段若要照設計稿改時間軸卡片，主要改這個檔案。
// 行程文字（時間、地點、備註、電話）來自 item，不要在這裡改寫內容。

const transitIcon = (icon) => {
  const valid = ['train', 'bus', 'car', 'sailboat', 'mountain', 'footprints', 'plane', 'calculator', 'bed'];
  return valid.includes(icon) ? icon : 'train';
};

const dotColor = (cat) => {
  switch (cat) {
    case '景點': return 'bg-emerald-600';
    case '美食': return 'bg-amber-600';
    case '住宿': return 'bg-indigo-600';
    case '航班': return 'bg-slate-800';
    case '交通': return 'bg-sky-600';
    default: return 'bg-wabi-red';
  }
};

const accent = (cat) => {
  switch (cat) {
    case '景點': return 'accent-sight';
    case '美食': return 'accent-food';
    case '住宿': return 'accent-stay';
    case '交通': return 'accent-transit';
    default: return 'accent-other';
  }
};

const badge = (cat) => {
  switch (cat) {
    case '景點': return 'bg-emerald-700 text-white';
    case '住宿': return 'bg-indigo-700 text-white';
    case '美食': return 'bg-orange-800 text-white';
    case '購物': return 'bg-rose-800 text-white';
    case '交通': return 'bg-sky-800 text-white';
    case '航班': return 'bg-slate-800 text-white';
    default: return 'bg-slate-700 text-white';
  }
};

const reserved = (item) => {
  if (!item) return false;
  if (item.bookingCode) return true;
  return `${item.ticket || ''} ${item.hours || ''}`.includes('預約');
};

export const DayCard = {
  name: 'DayCard',
  props: {
    item: { type: Object, required: true },
    showTransit: { type: Boolean, default: false },
  },
  emits: ['navigate', 'copy', 'edit', 'show-driver'],
  computed: {
    dotClass() { return dotColor(this.item.category); },
    accentClass() { return accent(this.item.category); },
    badgeClass() { return badge(this.item.category); },
    iconName() { return transitIcon(this.item.transitModeIcon); },
    isReserved() { return reserved(this.item); },
    mapQuery() { return this.item.mapQuery || this.item.address || this.item.name; },
  },
  template: `
    <div class="relative">
      <div
        class="absolute -left-8 top-3 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center z-10"
        :class="dotClass"
      >
        <app-icon :name="iconName" class="icon-sm text-white"></app-icon>
      </div>

      <p v-if="showTransit && item.transitTime" class="text-base font-bold text-slate-800 pb-2">
        交通 {{ item.transitTime }}
      </p>

      <article v-if="item.category === '航班'" class="dark-card rounded-2xl p-4 bg-slate-900 text-white shadow-md">
        <div class="flex items-start justify-between gap-2">
          <h3 class="name">{{ item.name }}</h3>
          <span class="shrink-0 bg-wabi-red text-white text-base font-bold px-2 py-1 rounded-lg">{{ item.ticket || '長榮航空' }}</span>
        </div>
        <p v-if="item.hours" class="time mt-2">時間：{{ item.hours }}</p>
        <p v-if="item.notes" class="text-base font-bold text-white mt-2 leading-relaxed">{{ item.notes }}</p>
        <button type="button" class="btn-nav mt-4" @click="$emit('navigate', item.address || item.name)" aria-label="導航到這裡">導航到這裡</button>
      </article>

      <article v-else-if="item.bookingCode || item.category === '美食'" class="card p-4" :class="accentClass">
        <div class="flex flex-wrap items-center gap-2">
          <span :class="badgeClass" class="text-base font-bold px-3 py-1 rounded-full">{{ item.category }}</span>
          <span v-if="isReserved" class="text-base font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">已預約 ✅</span>
        </div>
        <h3 class="name mt-2">{{ item.name }}</h3>
        <p v-if="item.hours" class="time mt-2">{{ item.hours }}</p>
        <p v-if="item.ticket" class="text-base font-bold text-slate-800 mt-2">{{ item.ticket }}</p>
        <div v-if="item.bookingCode" class="mt-3 p-3 border-2 border-dashed border-wabi-border rounded-xl">
          <p class="text-base font-bold text-slate-800">預約號碼</p>
          <p class="text-[1.45rem] font-black tracking-wider text-slate-900">{{ item.bookingCode }}</p>
        </div>
        <p v-if="item.notes" class="mt-3 text-base text-slate-800 leading-relaxed">{{ item.notes }}</p>
        <div class="mt-4 flex flex-col gap-2">
          <button type="button" class="btn-nav" @click.stop="$emit('navigate', mapQuery)" aria-label="導航到這裡">導航到這裡</button>
          <ride-actions :place="item" @show-driver="$emit('show-driver', $event)"></ride-actions>
          <button v-if="item.bookingCode" type="button" class="btn-secondary" @click="$emit('copy', item.bookingCode, '預約代號')" aria-label="複製預約碼">複製預約碼</button>
          <div class="grid grid-cols-2 gap-2">
            <button v-if="item.address" type="button" class="btn-secondary" @click="$emit('copy', item.address, '日文地址')" aria-label="複製地址">複製地址</button>
            <button type="button" class="btn-secondary" :class="item.address ? '' : 'col-span-2'" @click.stop="$emit('edit', item)" aria-label="修改這個行程">修改</button>
          </div>
        </div>
      </article>

      <article v-else class="card p-4" :class="accentClass">
        <span :class="badgeClass" class="text-base font-bold px-3 py-1 rounded-full">{{ item.category }}</span>
        <h3 class="name mt-2">{{ item.name }}</h3>
        <p v-if="item.hours" class="time mt-2">{{ item.hours }}</p>
        <p v-if="item.ticket" class="text-base font-bold text-slate-800 mt-2">{{ item.ticket }}</p>
        <p v-if="item.notes" class="mt-3 text-base text-slate-800 leading-relaxed">{{ item.notes }}</p>
        <div class="mt-4 flex flex-col gap-2">
          <button type="button" class="btn-nav" @click.stop="$emit('navigate', mapQuery)" aria-label="導航到這裡">導航到這裡</button>
          <ride-actions :place="item" @show-driver="$emit('show-driver', $event)"></ride-actions>
          <div class="grid grid-cols-2 gap-2">
            <button v-if="item.address" type="button" class="btn-secondary" @click="$emit('copy', item.address, '日文地址')" aria-label="複製地址">複製地址</button>
            <button type="button" class="btn-secondary" :class="item.address ? '' : 'col-span-2'" @click.stop="$emit('edit', item)" aria-label="修改這個行程">修改</button>
          </div>
        </div>
      </article>
    </div>
  `,
};
