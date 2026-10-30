// Uber 通用連結。只組網址，不呼叫 Uber API，也不需要金鑰。
// 文件：https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction
// 只有這個地點自己帶有座標時才放入經緯度。城市天氣用的座標不能拿來當下車點。

function finiteCoord(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function canRequestRide(place) {
  if (!place || place.category === '航班') return false;
  const address = String(place.address || '').trim();
  const name = String(place.name || '').trim();
  return Boolean(address || name);
}

export function uberDropoffUrl(place) {
  const nickname = String(place?.name || place?.address || '').trim();
  const address = String(place?.address || place?.name || '').trim();
  const parts = ['action=setPickup', 'pickup=my_location'];
  const latitude = finiteCoord(place?.latitude ?? place?.lat);
  const longitude = finiteCoord(place?.longitude ?? place?.lon);
  if (latitude !== null && longitude !== null) {
    parts.push(`dropoff[latitude]=${encodeURIComponent(String(latitude))}`);
    parts.push(`dropoff[longitude]=${encodeURIComponent(String(longitude))}`);
  }
  if (nickname) parts.push(`dropoff[nickname]=${encodeURIComponent(nickname)}`);
  if (address) parts.push(`dropoff[formatted_address]=${encodeURIComponent(address)}`);
  return `https://m.uber.com/ul/?${parts.join('&')}`;
}

export const RideActions = {
  name: 'RideActions',
  props: {
    place: { type: Object, required: true },
    uberLabel: { type: String, default: '用 Uber 叫車' },
  },
  emits: ['show-driver'],
  computed: {
    url() {
      return canRequestRide(this.place) ? uberDropoffUrl(this.place) : '';
    },
  },
  template: `
    <div v-if="url" class="mt-2 flex flex-col gap-2">
      <a :href="url" class="btn-uber" :aria-label="uberLabel">{{ uberLabel }}</a>
      <button type="button" class="btn-secondary" @click="$emit('show-driver', place)" aria-label="給司機看">給司機看</button>
    </div>
  `,
};
