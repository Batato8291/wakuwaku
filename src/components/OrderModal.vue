<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單資料</span>
          </h5>
          <button
            type="button"
            class="btn btn-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <h3>客戶資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th style="width: 100px">Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th style="width: 100px">電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th style="width: 100px">地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                  <tr>
                    <th>付款方式</th>
                    <td>{{ paymentMeth }}</td>
                  </tr>
                  <tr>
                    <th>備註</th>
                    <td>{{ tempOrder.message }}</td>
                  </tr>
                </tbody>
              </table>
              <h3 class="mt-5">訂單資料</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>
                      {{
                        new Date(
                          tempOrder.create_at * 1000,
                        ).toLocaleDateString()
                      }}
                    </td>
                  </tr>
                  <tr v-if="tempOrder.paid_date">
                    <th>付款時間</th>
                    <td>
                      {{
                        new Date(
                          tempOrder.paid_date * 1000,
                        ).toLocaleDateString()
                      }}
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-danger">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      $
                      {{
                        Math.round(tempOrder.total + tempOrder.user.deliveryFee)
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-8 bg-light">
              <h3>選購商品</h3>
              <table class="table">
                <tbody>
                  <tr v-for="product in tempOrder.products" :key="product.id">
                    <th style="min-width: 200px">
                      {{ product.product.title }}
                    </th>
                    <td style="min-width: 60px">X {{ product.qty }}</td>
                    <td style="min-width: 100px" class="text-end fw-bold">
                      $ {{ Math.round(product.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    order() {
      this.tempOrder = this.order;
      console.log(this.tempOrder);
      const pm = this.order.user.payment;
      if (pm == 'credit_card') {
        this.paymentMeth = '信用卡付款 $60';
      } else if (pm == 'atm') {
        this.paymentMeth = 'ATM轉帳 $60';
      } else if (pm == 'mart') {
        this.paymentMeth = '超商取貨付款 $75';
      } else if (pm == 'home_delivery') {
        this.paymentMeth = '宅配付款 $100';
      }
    },
  },
  data() {
    return {
      modal: {},
      tempOrder: {
        user: {
          name: '',
          email: '',
          address: '',
          tel: '',
          payment: '',
          deliveryFee: '',
        },
      },
      paymentMeth: '',
    };
  },
  mixins: [modalMixin],
  methods: {},
  mounted() {
    console.log(this.order);
    this.tempOrder = { ...this.order };
  },
};
</script>
