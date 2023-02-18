<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="container-fluid">
    <div class="text-end">
      <button
        class="btn btn-primary me-5"
        type="button"
        @click="openCouponModal(true)"
      >
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>標題</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>
            <span class="fw-bolder text-danger">{{ 100 - item.percent }}</span>
            %off
          </td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span class="text-success fw-bolder" v-if="item.is_enabled === 1"
              >啟用</span
            >
            <span class="text-muted fw-bolder" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCoupon(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal
    ref="couponModal"
    :coupon="tempCoupon"
    @update-coupon="updateCoupon"
  ></CouponModal>
  <DelModal
    ref="delModal"
    :item-title="tempCoupon.title"
    :item-id="tempCoupon.id"
    @delete-item="deleteCoupon"
  ></DelModal>
</template>
<script>
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      isActive: true,
      isLoading: false,
    };
  },
  components: { CouponModal, DelModal },
  inject: ['emitter'],
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        }
      });
    },
    openCouponModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = { is_enabled: 0 };
      } else {
        this.tempCoupon = { ...item };
      }
      this.isNew = isNew;
      const couponComponent = this.$refs.couponModal;
      couponComponent.showModal();
    },
    updateCoupon(item) {
      this.tempCoupon = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
      }
      const couponComponent = this.$refs.couponModal;
      this.isLoading = true;
      // fn 用[]
      this.$http[httpMethod](api, { data: this.tempCoupon }).then((res) => {
        this.isLoading = false;
        couponComponent.hideModal();
        this.getCoupons();
        this.$httpMessageState(res, '更新優惠券');
      });
    },
    openDelCoupon(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    // 刪除
    deleteCoupon(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      const delComponent = this.$refs.delModal;
      this.isLoading = true;
      this.$http.delete(api).then((res) => {
        this.isLoading = false;
        delComponent.hideModal();
        this.getCoupons();
        this.$httpMessageState(res, '刪除優惠券');
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
