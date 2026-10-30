// 行程卡外觀照設計稿：時間加地名最大、左色條、站與站之間的交通條。
// 行程文字仍來自 item，不在這裡改寫。

import { parseHours } from './clock.js';
import { photoFor } from './photos.js';

const TYPES = {
  景點: { color: '#15803D', emoji: '🏯' },
  美食: { color: '#C2410C', emoji: '🍜' },
  住宿: { color: '#7E22CE', emoji: '🏨' },
  交通: { color: '#2563EB', emoji: '🚃' },
  航班: { color: '#2563EB', emoji: '✈️' },
  購物: { color: '#9F1239', emoji: '🛍️' },
  其他: { color: '#475569', emoji: '📍' },
};

const TRANSIT_EMOJI = {
  train: '🚃',
  bus: '🚌',
  car: '🚕',
  footprints: '🚶',
  sailboat: '⛵',
  plane: '✈️',
  mountain: '🚞',
  bed: '🏨',
  calculator: '🚕',
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
    status: { type: String, default: '' },
  },
  emits: ['navigate', 'copy', 'edit', 'show-driver', 'show-staff', 'show-credit'],
  computed: {
    typeMeta() { return TYPES[this.item.category] || TYPES['其他']; },
    photo() { return photoFor(this.item.id); },
    times() { return parseHours(this.item.hours); },
    isReserved() { return reserved(this.item); },
    mapQuery() { return this.item.mapQuery || this.item.address || this.item.name; },
    transitEmoji() { return TRANSIT_EMOJI[this.item.transitModeIcon] || '🚃'; },
  },
  template: `
    <div :id="'stop-' + item.id" :class="status === 'past' ? 'opacity-60' : ''">
      <p v-if="showTransit && item.transitTime" class="my-3 text-base font-bold text-slate-800">
        <span class="inline-block rounded-full bg-slate-200 px-4 py-2">{{ transitEmoji }} {{ item.transitTime }}</span>
      </p>

      <article
        class="card overflow-hidden border-l-8"
        :class="status === 'now' ? 'ring-4 ring-[#B23A2E]' : ''"
        :style="{ borderLeftColor: typeMeta.color }"
      >
        <img
          v-if="photo"
          :src="photo.src"
          :alt="photo.title"
          class="aspect-video w-full object-cover"
          width="640"
          height="360"
          loading="lazy"
          decoding="async"
        />
        <div class="p-4">
          <div class="mb-2 flex flex-wrap items-center gap-2">
            <span v-if="status === 'now'" class="rounded-full bg-wabi-red px-3 py-1 text-base font-black text-white">現在</span>
            <span v-else-if="status === 'past'" class="rounded-full bg-emerald-100 px-3 py-1 text-base font-black text-emerald-800">已完成</span>
            <span class="rounded-full px-3 py-1 text-base font-bold text-white" :style="{ background: typeMeta.color }">{{ item.category }}</span>
          </div>

          <h3 class="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1.35rem] font-black leading-snug text-slate-900">
            <span v-if="times" class="text-[#B23A2E]">{{ times.startLabel }}</span>
            <span>{{ typeMeta.emoji }} {{ item.name }}</span>
          </h3>
          <p v-if="item.hours && item.hours !== times?.startLabel" class="mt-1 text-base font-bold text-slate-700">{{ item.hours }}</p>
          <p v-if="item.ticket" class="mt-2 text-base font-bold text-emerald-800">{{ item.ticket }}</p>
          <p v-else-if="isReserved" class="mt-2 text-base font-black text-emerald-800">已預約 ✅</p>

          <div v-if="item.bookingCode" class="mt-3 rounded-xl border-2 border-dashed border-[#E5DED3] p-3">
            <p class="text-base font-bold text-slate-800">預約號碼</p>
            <p class="text-[1.6rem] font-black tracking-wider text-slate-900">{{ item.bookingCode }}</p>
          </div>

          <p v-if="item.notes" class="mt-3 text-base leading-relaxed text-slate-800">{{ item.notes }}</p>
          <button v-if="photo" type="button" class="mt-2 text-base font-bold text-slate-700 underline" @click="$emit('show-credit', photo)">照片來源</button>

          <div class="mt-4 flex flex-col gap-2">
            <button type="button" class="btn-nav" @click.stop="$emit('navigate', mapQuery)" aria-label="導航到這裡">導航到這裡</button>
            <ride-actions v-if="item.category !== '航班'" :place="item" @show-driver="$emit('show-driver', $event)"></ride-actions>
            <button v-if="item.bookingCode" type="button" class="btn-secondary" @click="$emit('show-staff', item)" aria-label="出示給店家">出示給店家</button>
            <button v-if="item.bookingCode" type="button" class="btn-secondary" @click="$emit('copy', item.bookingCode, '預約代號')" aria-label="複製預約碼">複製預約碼</button>
            <div class="grid grid-cols-2 gap-2">
              <button v-if="item.address" type="button" class="btn-secondary" @click="$emit('copy', item.address, '日文地址')" aria-label="複製地址">複製地址</button>
              <button type="button" class="btn-secondary" :class="item.address ? '' : 'col-span-2'" @click.stop="$emit('edit', item)" aria-label="修改這個行程">修改</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  `,
};
