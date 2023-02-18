<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title"
              >標題
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
            /></label>
          </div>
          <div class="mb-3">
            <label for="coupon_code"
              >優惠碼
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
            /></label>
          </div>
          <div class="mb-3">
            <label for="due_date"
              >到期日
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="due_date"
            /></label>
          </div>
          <div class="mb-3">
            <label for="price"
              >折扣百分比
              <input
                type="number"
                class="form-control"
                min="0"
                id="price"
                v-model.number="couponPercent"
                placeholder="請輸入折扣百分比"
            /></label>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <label class="form-check-label" for="is_enabled"
                ><input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="emitCoupon">
            更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  name: 'couponModal',
  mixins: [modalMixin],
  emits: ['update-coupon'],
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      this.couponPercent = 100 - this.coupon.percent;

      // 將時間改為 YYYY-MM-DD
      if (Object.prototype.hasOwnProperty.call(this.tempCoupon, 'due_date')) {
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
          .toISOString()
          .split('T');
        [this.due_date] = dateAndTime;
      }
    },
    due_date() {
      if (this.due_date !== '') {
        this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
      }
    },
    couponPercent() {
      if (this.couponPercent) {
        this.tempCoupon.percent = 100 - this.couponPercent;
      }
    },
  },
  data() {
    return {
      modal: {},
      couponPercent: 0,
      tempCoupon: {},
      due_date: '',
    };
  },
  methods: {
    emitCoupon() {
      this.$emit('update-coupon', this.tempCoupon);
      this.due_date = '';
      this.couponPercent = 0;
    },
  },
};
</script>
