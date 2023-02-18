<template>
  <div class="container">
    <!-- progress bar -->
    <div>
      <p class="fs-1 fw-bold text-center" style="color: #faa11f">確認訂單</p>
      <div class="col-12 col-lg-10 mx-lg-auto">
        <ul class="multi-steps">
          <li class="active" id="progressbar_cart"><span>購物車</span></li>
          <li class="active" id="progressbar_order"><span>訂單資料</span></li>
          <li class="active" id="progressbar_check"><span>確認訂單</span></li>
          <li id="progressbar_done"><span>完成訂單</span></li>
        </ul>
      </div>
    </div>
    <!-- order Info -->
    <div class="d-flex justify-content-center flex-wrap">
      <!-- order list -->
      <div class="col-12 col-lg-5 px-3">
        <div
          class="mb-1"
          style="height: 0.5rem; background-color: rgba(255, 173, 59, 0.856)"
        ></div>
        <div class="mb-2 mx-1" style="border-bottom: 2px solid #535353">
          <p class="fs-3 my-1 text-center">訂單明細</p>
        </div>
        <div class="lg-list">
          <div
            class="lg-list-item d-flex flex-row p-2 list-item-border"
            v-for="item in order.products"
            :key="item.product.product_id"
          >
            <div class="product-img">
              <img class="" :src="item.product.images[0]" alt="product image" />
            </div>
            <div class="w-100 ps-3">
              <div class="row h-100 p-0">
                <div class="col-9 py-1">
                  <p class="fs-5 m-0">{{ item.product.title }}</p>

                  <div class="mb-1">x {{ item.qty }}</div>
                </div>
                <div
                  class="col-3 d-flex align-items-center justify-content-end"
                >
                  $ {{ Math.round(item.final_total * 10) / 10 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- order total -->
        <div class="row mt-2 px-2 justify-content-end text-end">
          <div class="col-3">小計：</div>
          <div class="col-3">$ {{ Math.round(order.total) }}</div>
        </div>
        <div class="row px-2 justify-content-end text-end">
          <div class="col-3">運費：</div>
          <div class="col-3">$ {{ order.user.deliveryFee }}</div>
        </div>
        <hr class="my-2" style="border-color: #53535363; opacity: 1" />
        <div class="row mt-2 mb-3 px-2 justify-content-end text-end fw-bold">
          <div class="col-5">應付金額：</div>
          <div class="col-3">
            $ {{ Math.round(order.total + order.user.deliveryFee) }}
          </div>
        </div>
      </div>
      <!-- personal Info -->
      <div class="col-12 col-lg-5 px-3">
        <div
          class="mb-1"
          style="height: 0.5rem; background-color: rgba(255, 173, 59, 0.856)"
        ></div>

        <div class="mx-1 px-2" style="border-bottom: 2px solid #535353">
          <p class="fs-3 my-1 text-center">訂購人資訊</p>
        </div>
        <table class="table px-2">
          <tbody>
            <tr>
              <th>訂單時間</th>
              <td>
                {{ new Date(order.create_at * 1000).toLocaleDateString() }}
              </td>
            </tr>
            <tr>
              <th>訂單編號</th>
              <td>{{ order.id }}</td>
            </tr>
            <tr>
              <th>收件人</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ addressSaw }}</td>
            </tr>
            <tr>
              <th>付款方式</th>
              <td>{{ paymentMeth }}</td>
            </tr>
            <tr>
              <th>備註</th>
              <td>{{ order.message }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="order.is_paid" class="text-success">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-end mt-2 pe-2">
          <button class="btn btn-danger" @click="toPay(id)">前往付款</button>
        </div>
      </div>
    </div>
  </div>
  <!--leave modal -->
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-4 text-center fs-5 fw-bold">
          訂單尚未付款，確定要離開嗎？
        </div>
        <div class="leave-btn-group">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="toPage = ''"
          >
            取消
          </button>
          <button type="button" class="btn" @click="confirmLeaveFn()">
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.lg-list {
  .lg-list-item {
    min-height: 80px;

    .product-img {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 60px;
      }
    }
  }
}
.list-item-border {
  border-bottom: 1px solid #53535342;
}
.modal-content {
  margin: 0 auto;
  border-radius: 5px;
  .modal-body {
    color: rgb(65, 65, 65);
  }
  .leave-btn-group {
    display: flex;
    justify-content: center;
    padding: 1rem;
    button {
      margin: 0 1rem;
      border-radius: 5px;
      padding: 0.5rem 2rem;
      &:last-child {
        background-color: #f8a43e;
        color: white;
      }
    }
  }
}
</style>
<script>
import modalMixin from '@/mixins/modalMixin';
export default {
  data() {
    return {
      // order data
      id: '',
      modal: {},
      order: {
        user: {
          deliveryFee: '',
        },
      },
      paymentMeth: '',
      addressSaw: '',
      toPage: '',
      confirmLeave: false,
    };
  },
  mixins: [modalMixin],
  emits: ['temp-selection'],
  props: ['filtered-list', 'tag-lists'],
  watch: {
    'order.user.payment': {
      handler: function () {
        const pm = this.order.user.payment;
        if (pm == 'credit_card') {
          this.paymentMeth = '信用卡付款';
        } else if (pm == 'atm') {
          this.paymentMeth = 'ATM轉帳';
        } else if (pm == 'mart') {
          this.paymentMeth = '超商取貨付款';
        } else if (pm == 'home_delivery') {
          this.paymentMeth = '宅配付款';
        }
      },
    },
    'order.user.address': {
      handler: function () {
        const a = this.order.user.address;
        this.addressSaw = a.replace(/\s*/g, '');
      },
    },
  },

  methods: {
    getOrder(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success && res.data.order) {
          this.order = res.data.order;
          if (this.order.is_paid) {
            this.confirmLeave = true;
            this.$router.push(`/order-done/${id}`);
          }
        }
      });
    },
    toPay(orderId) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${orderId}`;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.confirmLeave = true;
          this.$router.push(`/order-done/${orderId}`);
        }
      });
    },
    confirmLeaveFn() {
      this.confirmLeave = true;
      this.hideModal();
      this.$router.push(this.toPage);
    },

    getAllOrder(page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      this.$http.get(api).then();
    },
  },

  beforeRouteLeave(to, from) {
    this.toPage = to.fullPath;
    if (
      to.name !== 'CheckOut' &&
      this.order.is_paid === false &&
      this.confirmLeave === false
    ) {
      this.showModal();
      return false;
    }
  },
  created() {
    // 取得 ID
    this.id = this.$route.params.orderId;
    this.getOrder(this.id);
  },
};
</script>
