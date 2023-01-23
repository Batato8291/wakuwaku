<template>
  <div class="container">
    <!-- progress bar -->
    <div>
      <p class="fs-1 fw-bold text-center" style="color: #faa11f">訂單資料</p>
      <div class="col-12 col-lg-10 mx-lg-auto">
        <ul class="multi-steps">
          <li class="active" id="progressbar_cart"><span>購物車</span></li>
          <li id="progressbar_order" class="active"><span>訂單資料</span></li>
          <li id="progressbar_check"><span>確認訂單</span></li>
          <li id="progressbar_done"><span>完成訂單</span></li>
        </ul>
      </div>
    </div>
    <!--when nothing -->
    <div v-if="carts.length === 0" class="d-flex align-item-center flex-column">
      <div
        class="mb-1"
        style="min-height: 0.5rem; background-color: rgba(255, 173, 59, 0.856)"
      ></div>

      <div
        class="lg-list-item p-2 mt-3 fs-2 fw-bold text-center"
        style="color: gray"
      >
        訂單沒有內容 . . .
      </div>
      <div class="d-flex justify-content-center mt-3 mb-5">
        <router-link
          class="btn text-white fw-semibold shadow-none"
          to="/search?search=&category=all"
          style="background-color: rgb(251 164 59)"
        >
          前往商店 <i class="bi bi-arrow-bar-right"></i>
        </router-link>
      </div>
    </div>
    <!-- order info -->
    <div class="row justify-content-center" v-else>
      <div class="col-12 col-lg-5 px-3">
        <div
          class="mb-1"
          style="
            min-height: 0.5rem;
            background-color: rgba(255, 173, 59, 0.856);
          "
        ></div>
        <!-- order Info -->
        <div class="accordion mx-1" id="accordionOrder">
          <div class="accordion-item order-list">
            <h2
              class="accordion-header"
              style="border-bottom: 2px solid #535353"
            >
              <button
                class="accordion-button collapsed px-3 py-2 order-list-btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#order-accordion"
                aria-expanded="false"
                aria-controls="#order-accordion"
              >
                <p class="fs-3">訂單內容</p>
              </button>
            </h2>
            <div
              id="order-accordion"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionOrder"
            >
              <div class="accordion-body p-0">
                <div class="lg-list">
                  <div
                    class="lg-list-item d-flex flex-row p-2 list-item-border"
                    v-for="cart in carts"
                    :key="cart.id"
                  >
                    <div
                      class="col-1 d-flex justify-content-center align-item-center"
                    >
                      <button
                        class="px-1 py-0 btn btn-outline-danger align-self-center"
                        @click.prevent="deleteCart(cart.id)"
                      >
                        <i class="bi bi-x"></i>
                      </button>
                    </div>

                    <div class="product-img col-2">
                      <img
                        class=""
                        :src="cart.product.images[0]"
                        alt="product image"
                      />
                    </div>
                    <div class="w-100 ps-2 col">
                      <p class="fs-5 m-0">{{ cart.product.title }}</p>

                      <div class="my-1">x {{ cart.qty }}</div>
                    </div>
                    <div
                      class="d-flex flex-column align-items-end justify-content-center col-2"
                    >
                      <del v-if="isCoupon" class="text-secondary mb-2"
                        >$ {{ cart.total }}</del
                      >
                      <span>$ {{ Math.round(cart.final_total) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2">
          <!-- coupon card -->
          <div class="px-3 my-2">
            <div class="input-group coupon-input">
              <input
                type="text "
                class="form-control"
                placeholder="請輸入優惠碼"
                v-model="coupon_code"
                @keyup.enter="addCouponCode"
                :disabled="carts.length === 0"
              />
              <button
                class="btn btn-outline-warning"
                type="button"
                id="button-addon2"
                :class="{ active: isLoading }"
                @click="addCouponCode"
                :disabled="carts.length === 0"
              >
                <div class="text-center" v-if="isLoading">
                  <div
                    class="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <span v-else>套用</span>
              </button>
            </div>
            <div class="text-danger mt-1" v-if="!couponSuccess">
              {{ errorMessage }}
            </div>
          </div>
          <ul class="list-unstyled px-2">
            <li class="d-flex justify-content-between mb-1">
              <span>小計</span>
              <span>${{ totalAmount.total }}</span>
            </li>
            <li class="d-flex justify-content-between mb-1">
              <span>運費</span>
              <span>${{ shippingFee }}</span>
            </li>
            <!-- discount -->
            <li class="d-flex justify-content-between mb-1" v-if="isCoupon">
              <span>{{ carts[0].coupon.title }} 折扣</span>
              <span class="text-success fw-bold"
                >- ${{ totalAmount.discount }}</span
              >
            </li>
            <hr class="my-2" />
            <li class="d-flex justify-content-between mb-1 fw-bold">
              <span>應付總額</span>
              <span class="text-danger"
                >$ {{ totalAmount.finalTotal + shippingFee }}</span
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- information card -->
      <div class="col-12 col-lg-5 px-3">
        <div
          class=""
          style="
            min-height: 0.5rem;
            background-color: rgba(255, 173, 59, 0.856);
          "
        ></div>
        <div class="mb-2 mx-1" style="border-bottom: 2px solid #535353">
          <p class="fs-3 my-1 text-center">訂單資料</p>
        </div>
        <div class="px-2">
          <VForm class="order-form" v-slot="{ errors }" @submit="createOrder">
            <div class="mb-2">
              <label for="email" class="form-label"
                ><span class="text-danger">*</span> Email</label
              >
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></VField>
              <ErrorMessage
                name="email"
                class="invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mb-2">
              <label for="name" class="form-label"
                ><span class="text-danger">*</span> 收件人姓名</label
              >
              <VField
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              ></VField>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-2">
              <label for="tel" class="form-label"
                ><span class="text-danger">*</span> 收件人電話</label
              >
              <VField
                id="phone"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話"
                :rules="isPhone"
                maxlength="10"
                v-model="form.user.tel"
              ></VField>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>

            <div class="mb-2">
              <label for="address" class="form-label"
                ><span class="text-danger">*</span> 收件人地址</label
              >
              <div class="row mb-2">
                <div class="col-6">
                  <VField
                    id="city"
                    name="縣市"
                    rules="required"
                    as="select"
                    class="form-select"
                    :class="{ 'is-invalid': errors['縣市'] }"
                    v-model="city"
                  >
                    <option value="" selected disabled>請選擇縣市</option>
                    <option
                      v-for="item in postal"
                      :value="item.name"
                      :key="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </VField>

                  <ErrorMessage
                    name="縣市"
                    class="invalid-feedback"
                  ></ErrorMessage>
                </div>
                <div class="col-6">
                  <VField
                    id="area"
                    name="鄉鎮市區"
                    rules="required"
                    as="select"
                    class="form-select"
                    :class="{ 'is-invalid': errors['鄉鎮市區'] }"
                    v-model="area"
                  >
                    <option value="" selected disabled>請選擇區域</option>
                    <option
                      v-for="item in areaArr"
                      :value="item.code + ' ' + item.name"
                      :key="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </VField>
                  <ErrorMessage
                    name="區域"
                    class="invalid-feedback"
                  ></ErrorMessage>
                </div>
              </div>
              <VField
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="addressText"
              ></VField>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-2">
              <label for="address" class="form-label"
                ><span class="text-danger">*</span> 付款方式</label
              >
              <VField
                class="form-select"
                id="payment"
                name="付款方式"
                rules="required"
                as="select"
                :class="{ 'is-invalid': errors['付款方式'] }"
                v-model="form.user.payment"
              >
                <option value="">請選擇付款方式</option>
                <option value="credit_card">信用卡付款 $60</option>
                <option value="atm">ATM轉帳 $60</option>
                <option value="mart">超商取貨付款 $75</option>
                <option value="home_delivery">宅配付款 $100</option>
              </VField>
              <ErrorMessage name="付款方式" class="invalid-feedback" />
            </div>
            <div class="mb-2">
              <label for="message" class="form-label">留言</label>
              <textarea
                name=""
                id="message"
                cols="30"
                rows="10"
                class="form-control"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-end mt-3">
              <button
                class="btn btn-danger"
                type="submit"
                style="border-radius: 5px"
                :disabled="carts.length === 0"
              >
                送出訂單
              </button>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
  <!--leave modal -->
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-4 text-center fs-5 fw-bold">
          訂單尚未完成，確定要離開嗎？
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
.order-list {
  border: 0;
  border-radius: 0;
  .accordion-body {
    background-color: rgb(245, 245, 245);
  }
}

.order-list-btn {
  background-color: white;
  color: black;
  box-shadow: none;
  p {
    padding: 0;
    margin: 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}

.coupon-input {
  input,
  button {
    border-radius: 2px;
  }
  input:focus {
    border-color: #ffc107;
    box-shadow: 0 0 0 0.25rem rgba(247, 146, 22, 0.315);
  }
}
.order-form {
  label {
    margin-left: 0.2rem;
  }
  input,
  select,
  textarea {
    border-radius: 2px;
  }
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
.lg-list {
  .lg-list-item {
    min-height: 80px;
    .product-img {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 80%;
      }
    }
  }
}
</style>
<script>
import collapse from 'bootstrap/js/dist/collapse';
import postal from '@/assets/postal.json';
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      postal,
      isLoading: false,
      modal: {},
      carts: [],
      delivery: {
        credit_card: 60,
        atm: 60,
        mart: 75,
        home_delivery: 100,
      },
      shippingFee: 0,
      form: {
        user: {
          name: '',
          tel: '',
          email: '',
          address: '',
          payment: '',
          deliveryFee: 0,
        },
        message: '',
      },
      city: null,
      areaArr: [],
      area: '',
      addressText: '',
      coupon_code: '',
      isCoupon: false,
      couponSuccess: true,
      couponErrorMeg: '',
      toPage: '',
      confirmLeave: false,
    };
  },
  emits: ['temp-selection'],
  props: ['filtered-list', 'tag-lists'],

  mixins: [modalMixin],
  watch: {
    city() {
      const currentArea = this.postal.find((item) => {
        return item.name === this.city;
      });
      this.areaArr = currentArea ? currentArea.children : [];
      this.area = '';
    },
    address(val) {
      this.form.user.address = val;
    },
    'form.user.payment'() {
      this.shippingFee = this.delivery[this.form.user.payment];
      this.form.user.deliveryFee = this.shippingFee;
    },
  },
  computed: {
    address() {
      return `${this.area.split(' ')[0]} ${this.city} ${
        this.area.split(' ')[1]
      } ${this.addressText}`;
    },
    totalAmount() {
      let total = 0,
        finalTotal = 0,
        discount = 0;
      if (this.carts) {
        this.carts.forEach((item) => {
          total += item.total;
          finalTotal += item.final_total;
        });
        discount = total - finalTotal;
        return {
          total: total,
          finalTotal: Math.round(finalTotal),
          discount: Math.round(discount),
        };
      } else {
        this.getCarts();
      }
    },
  },
  methods: {
    getCarts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.carts = res.data.data.carts;
        console.log('cart', this.carts);
        if (this.carts[0].hasOwnProperty('coupon')) {
          this.isCoupon = true;
        }
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        console.log(res);
        this.getCarts();
      });
    },

    createOrder() {
      console.log(this.form);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(api, { data: this.form }).then((res) => {
        this.$emitter.emit('cartsUpdate', {});

        if (res.data.success) {
          this.confirmLeave = true;
          this.$router.push(`/checkout/${res.data.orderId}`);
        } else {
          this.confirmLeave = false;
          console.log('error 發送失敗');
        }
      });
    },
    isPhone(value) {
      if (!value) {
        return '電話 為必填';
      }
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '填入正確的電話格式';
    },
    addCouponCode() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon }).then((res) => {
        if (res.data.success) {
          this.isCoupon = true;
          this.couponSuccess = true;
          this.errorMessage = res.data.message;

          this.getCarts();
        } else {
          this.couponSuccess = false;
          this.errorMessage = res.data.message;
        }
        this.isLoading = false;
      });
    },
    confirmLeaveFn() {
      this.confirmLeave = true;
      this.hideModal();
      this.$router.push(this.toPage);
    },
  },

  created() {
    this.getCarts();
  },
  beforeRouteLeave(to, from, next) {
    this.toPage = to.fullPath;
    if (
      to.name !== 'Order' &&
      this.carts.length !== 0 &&
      this.confirmLeave === false
    ) {
      this.showModal();
    } else {
      next();
    }
  },
};
</script>
