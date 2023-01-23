<template>
  <div class="container p-0">
    <div class="cart-list">
      <div>
        <p class="fs-1 fw-bold text-center" style="color: #faa11f">
          購物車清單
        </p>
        <div class="col-12 col-lg-10 mx-lg-auto">
          <ul class="multi-steps">
            <li class="active" id="progressbar_cart"><span>購物車</span></li>
            <li id="progressbar_order"><span>訂單資料</span></li>
            <li id="progressbar_check"><span>確認訂單</span></li>
            <li id="progressbar_done"><span>完成訂單</span></li>
          </ul>
        </div>
      </div>
      <div
        class="d-md-none"
        style="min-height: 0.5rem; background-color: rgba(255, 173, 59, 0.856)"
      ></div>
      <div class="list-table-title d-none d-md-flex">
        <div class="col-1">選取</div>
        <div class="col-2">商品圖片</div>
        <div class="mx-2 col-8 flex-row">
          <div class="col-md-4">商品名稱</div>
          <div class="col-md-3 col-lg-2">價格</div>
          <div class="col-md-5 col-lg-4">數量</div>
          <div class="col-lg-2 d-none d-lg-flex"></div>
        </div>
      </div>
      <hr class="my-1" style="border-width: 3px" />
      <!-- list item -->
      <div class="item_box" v-for="cart in carts" :key="cart.id">
        <div class="item_content align-item-center py-2">
          <div class="d-flex">
            <div class="col-1 item-check">
              <input
                class="form-check-input select-btn cart_item_checkbox"
                type="checkbox"
                :value="cart.id"
                v-model="checkedItems"
              />
            </div>
            <div class="item-img col-3 col-md-2">
              <div>
                <img :src="cart.product.images[0]" alt="" />
              </div>
            </div>
            <div class="col-8 item-info mx-2">
              <p class="mt-2 mb-0 me-2 col-md-4">{{ cart.product.title }}</p>
              <div class="item-price my-2 px-2 col-md-3 col-lg-2">
                <div class="text-danger">
                  ${{ cart.total }}&ensp;<span
                    class="text-decoration-line-through text-secondary me-2"
                    v-if="cart.product.origin_price > cart.product.price"
                    >${{ cart.product.origin_price * cart.qty }}</span
                  >
                </div>
              </div>

              <div class="counter-group col-md-5 col-lg-4">
                <button
                  class=""
                  @click="updateCart(cart, -1)"
                  :disabled="status.loadingItem === cart.id"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <input
                  type="number"
                  class="qty-input"
                  min="1"
                  @change="updateCart(cart)"
                  v-model.number="cart.qty"
                  :disabled="status.loadingItem === cart.id"
                />
                <button
                  class=""
                  @click="updateCart(cart, +1)"
                  :disabled="status.loadingItem === cart.id"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>

              <div class="del-btn col-lg-2">
                <router-link to="" @click="openDelModal(cart)"
                  >刪除</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <!-- remove -->
        <div class="item_del my-2" @click="openDelModal(cart)">刪除</div>
      </div>
      <!--when nothing -->
      <div
        v-if="carts.length === 0"
        class="d-flex align-item-center flex-column"
      >
        <div
          class="lg-list-item p-2 mt-3 fs-2 fw-bold text-center"
          style="color: gray"
        >
          購物車沒有商品 . . .
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
    </div>
    <!-- cart footer -->
    <div class="cart-footer">
      <div class="footer-item check_out p-2">
        <div class="ms-1 align-items-center d-flex">
          <input
            class="form-check-input select-btn"
            type="checkbox"
            name="select_all"
            id="select_all"
            v-model="checkedAll"
            @click="selectAll()"
          />
          <label class="ms-2 d-flex me-2" for="select_all"
            >全選 ({{ carts.length }})</label
          >
        </div>

        <div class="ms-auto me-3">
          <p class="mb-0">
            小計: <span class="ms-2 text-danger fs-5">${{ totalAmount }}</span>
          </p>
        </div>

        <button
          class="btn btn-danger"
          :disabled="totalAmount == 0"
          @click="toOrder"
        >
          結帳
        </button>
      </div>
    </div>
  </div>
  <DelModal
    ref="delModal"
    :item-title="tempCart.product.title"
    :item-id="tempCart.id"
    @delete-item="deleteCart(tempCart.id)"
  ></DelModal>
</template>
<style lang="scss" scoped>
.cart-list {
  background-color: white;
  overflow: hidden;
  .item_box {
    position: relative;
    align-items: stretch;
    box-shadow: 0 4px rgba(104, 104, 104, 0.219);
    overflow: hidden;
    width: 118%;
    display: block;
    transition: all 0.2s linear;
    .item_content {
      flex-shrink: 0;
      width: 85%;

      .item-check {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .item-img {
        justify-content: center;
        display: flex;
        div {
          overflow: hidden;
          width: 5rem;
          img {
            width: 100%;
          }
        }
      }
      .item-info {
        display: flex;
        flex-direction: column;
        .counter-group {
          display: flex;

          button {
            border: 1px solid gray;
            background-color: white;
          }
          input {
            border-width: 1px 0px;
            border-color: gray;
            text-align: center;
            width: 5rem;
            box-sizing: border-box;

            margin: 0;
            &:focus {
              outline: none;
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            &[type='number'] {
              -moz-appearance: textfield;
            }
          }
        }
      }
      .del-btn {
        display: none;
      }
    }
    .item_del {
      position: absolute;
      inset: 0 0 auto auto;

      width: 15%;
      height: calc(100% - 1rem);
      background-color: red;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
    }
  }
  .swipeleft {
    transform: translateX(-15%);
  }
}
.list-table-title {
  background-color: rgba(255, 173, 59, 0.856);
  color: rgb(255, 255, 255);
  font-weight: 500;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
  div {
    display: flex;
    justify-content: center;
  }
}
.cart-footer {
  width: 100%;
  background-color: rgba(255, 252, 248, 0.973);
  position: sticky;
  bottom: 0px;
  box-shadow: 0 0 6px 0px rgba(0, 0, 0, 0.1);
  .footer-item {
    border-top: 1px solid rgba(0, 0, 0, 0.24);
  }
  .check_out {
    display: flex;
    align-items: center;
  }
}
.select-btn {
  &:focus {
    border-color: orange;
    box-shadow: 0 0 0 0.25rem rgba(248, 180, 33, 0.253);
  }
  &:checked {
    background-color: orange;
    border-color: orange;
  }
}

@media screen and (min-width: 768px) {
  .cart-list .item_box .item_content .item-info {
    flex-direction: row;
    align-items: center;

    div,
    p {
      display: flex;
      justify-content: center;
      &.del-btn {
        display: none;
      }
    }
  }
  .del-btn {
    a {
      text-decoration: none;
      color: rgb(236, 154, 2);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
@media screen and (min-width: 992px) {
  .cart-list .item_box .item_content .item-info {
    .del-btn {
      display: flex !important;
    }
  }
}
</style>
<script>
import DelModal from '@/components/DelModalFore.vue';

export default {
  data() {
    return {
      carts: [],
      tempCart: {
        product: {
          title: '',
        },
        id: '',
      },
      status: {
        loadingItem: '',
      },
      checkedItems: [],
      unCheckItems: [],
      checkedAll: false,
      coupon_code: '',
      isCoupon: false,
    };
  },
  components: {
    DelModal,
  },
  watch: {
    checkedItems() {
      if (this.checkedItems.length === this.carts.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
  },
  computed: {
    totalAmount() {
      let sum = 0;
      let matchItem = [];
      this.checkedItems.forEach((item) => {
        let filterItem = this.carts.filter((cart) => cart.id == item);
        let pushItem = filterItem[0];
        matchItem.push(pushItem);
        sum += pushItem.total;
      });
      console.log('matchItem', matchItem);
      return sum;
    },
  },
  methods: {
    itemSwipe() {
      let expansion = null;
      const itemBox = document.querySelectorAll('.cart-list .item_box');
      // console.log('box', itemBox);
      for (let i = 0; i < itemBox.length; i++) {
        let x, y, X, Y, swipeX, swipeY;
        itemBox[i].addEventListener('touchstart', function (event) {
          x = event.changedTouches[0].pageX;
          y = event.changedTouches[0].pageY;
          swipeX = true;
          swipeY = true;
          if (expansion) {
            // 判斷是否展開
            expansion.classList.remove('swipeleft');
          }
        });

        itemBox[i].addEventListener('touchmove', function (event) {
          X = event.changedTouches[0].pageX;
          Y = event.changedTouches[0].pageY;
          // 左右滑動
          if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
            // 阻止事件冒泡
            event.stopPropagation();
            //右滑
            if (X - x > 10) {
              event.preventDefault();
              // 右滑收起
              // console.dir(this);
              this.classList.remove('swipeleft');
            }
            // 左滑
            if (x - X > 10) {
              event.preventDefault();
              this.classList.add('swipeleft');
              // 左滑展開
              expansion = this;
            }
            swipeY = false;
          }
          // 上下滑動
          if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
            swipeX = false;
          }
        });
      }
    },
    getCarts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.unCheckItems = [];
      this.$http.get(url).then((res) => {
        this.carts = res.data.data.carts;
        this.carts.forEach((item) => this.unCheckItems.push(item.id));
        console.log('cart', this.carts, 'uncheck', this.unCheckItems);
        if (window.screen.width < 992) {
          this.$nextTick(() => {
            this.itemSwipe();
          });
        }
        this.$emitter.emit('cartsUpdate', {});
      });
    },
    updateCart(cart, changeQty) {
      console.log('change Qty');
      // this.isLoading = true;
      this.status.loadingItem = cart.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      let newQty;
      if (changeQty) {
        newQty = cart.qty + changeQty;
      } else {
        newQty = cart.qty;
      }
      if (newQty <= 0) {
        this.openDelModal(cart);
        this.status.loadingItem = '';
        return;
      }

      const newCart = {
        product_id: cart.product_id,
        qty: newQty,
      };
      this.$http.put(url, { data: newCart }).then((res) => {
        // this.isLoading = false;
        console.log(res);
        this.getCarts();
        this.status.loadingItem = '';
        // this.$httpMessageState(res, '更新購物車');
      });
    },
    openDelModal(item) {
      this.tempCart = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },

    deleteCart(id) {
      const delComponent = this.$refs.delModal;

      // 先從total移除
      const index = this.checkedItems.indexOf(id);
      if (index != -1) {
        this.checkedItems.splice(index, 1);
      }

      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        console.log(res);
        delComponent.hideModal();
        this.getCarts();
      });
    },
    selectAll() {
      if (this.checkedAll) {
        this.checkedItems = [];
      } else {
        this.carts.forEach((item) => {
          if (this.checkedItems.indexOf(item.id) == -1) {
            this.checkedItems.push(item.id);
          }
        });
      }
    },
    toOrder() {
      let resultItem = this.unCheckItems.filter((item) => {
        return this.checkedItems.indexOf(item) === -1;
      });
      console.log('result', resultItem);
      resultItem.forEach((id) => {
        let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
        this.$http.delete(api).then((res) => {
          console.log(res);
          this.$emitter.emit('cartsUpdate', {});
        });
      });

      this.$router.push('/order');
    },
  },
  created() {
    this.getCarts();
  },
  mounted() {},
};
</script>
