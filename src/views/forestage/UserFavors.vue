<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-12">
        <h1 class="fw-bold px-2" style="color: #ffbf00">收藏商品</h1>
        <div class="lg-list d-lg-none">
          <div class="w-100 lg-list-th"></div>
          <!-- when nothing -->
          <div v-if="products.length === 0">
            <div
              class="lg-list-item d-flex flex-row p-2 fs-3 fw-bold"
              style="color: gray"
            >
              目前沒有收藏的商品...
            </div>
            <div class="d-flex justify-content-center mt-5">
              <router-link
                class="btn text-white fw-semibold shadow-none"
                to="/search?search=&category=all"
                style="background-color: rgb(251 164 59)"
              >
                前往商店 <i class="bi bi-arrow-bar-right"></i>
              </router-link>
            </div>
          </div>
          <!-- items -->
          <div
            class="lg-list-item d-flex flex-row p-2"
            v-for="product in products"
            :key="product.id"
          >
            <div>
              <router-link to="#">
                <img
                  class="product-img"
                  :src="product.images[0]"
                  alt="product pic"
                />
              </router-link>
            </div>
            <div class="lg-list-item-info px-2 w-100">
              <div class="px-2">
                <router-link class="fs-5" to="#">{{
                  product.title
                }}</router-link>
              </div>
              <div class="px-2 my-1">
                <div class="text-danger">
                  ${{ product.price }}&ensp;<span
                    v-if="product.origin_price > product.price"
                    class="text-decoration-line-through text-secondary me-2"
                    >${{ product.origin_price }}</span
                  >
                </div>
              </div>
              <div class="lg-list-item-btn">
                <button
                  class="btn cart-btn"
                  @click.prevent="
                    cartIDs.push(product.id), addToCart(product.id)
                  "
                  :disabled="cartIDs.indexOf(product.id) !== -1"
                >
                  <i class="fa-solid fa-cart-arrow-down"></i>
                </button>
                <button
                  class="btn btn-outline-danger"
                  @click.prevent="removeFavor(product)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- table for lg up  -->
        <!-- when nothing -->
        <div
          class="lg-list-item flex-row d-none d-lg-block"
          v-if="products.length === 0"
          style="min-height: 50vh"
        >
          <div
            class="w-100"
            style="height: 1rem; background-color: rgb(251 164 59)"
          ></div>
          <p class="px-2 mt-3 fs-3 fw-bold" style="color: gray">
            目前沒有收藏的商品...
          </p>
          <div class="d-flex justify-content-center mt-5">
            <router-link
              class="btn text-white fw-semibold shadow-none"
              to="/search?search=&category=all"
              style="background-color: rgb(251 164 59)"
            >
              前往商店 <i class="bi bi-arrow-bar-right"></i>
            </router-link>
          </div>
        </div>
        <table class="table d-none d-lg-table" v-else>
          <thead>
            <tr>
              <th class="col-2"></th>
              <th class="col-5">品名</th>
              <th class="col-2">價格</th>
              <th class="col-2">
                <div>加入購物車</div>
              </th>
              <th class="col-1">
                <div>刪除</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- item -->
            <tr v-for="product in products" :key="product.id">
              <td>
                <div class="">
                  <img class="product-img" :src="product.images[0]" alt="" />
                </div>
              </td>
              <td>
                <p>{{ product.title }}</p>
              </td>
              <td>
                <p class="text-danger">
                  ${{ product.price }}&ensp;
                  <span
                    class="text-secondary text-decoration-line-through"
                    v-if="product.origin_price > product.price"
                    >${{ product.origin_price }}</span
                  >
                </p>
              </td>
              <td>
                <div>
                  <button
                    class="btn w-50 cart-btn"
                    @click.prevent="
                      cartIDs.push(product.id), addToCart(product.id)
                    "
                    :disabled="cartIDs.indexOf(product.id) !== -1"
                  >
                    <i class="fa-solid fa-cart-arrow-down"></i>
                  </button>
                </div>
              </td>
              <td>
                <div>
                  <button
                    class="btn btn-outline-danger"
                    @click.prevent="removeFavor(product)"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </td>
            </tr>
            <div
              class=""
              style="min-height: 50vh"
              v-if="products.length <= 2"
            ></div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.lg-list {
  min-height: 50vh;
  .lg-list-th {
    padding: 0.5rem 1rem;
    background-color: rgb(248, 176, 81);
    color: white;
    height: 1rem;
  }
  .lg-list-item {
    min-height: 120px;
    a {
      text-decoration: none;
      color: rgb(66, 66, 66);
    }
    .lg-list-item-info {
      position: relative;
    }
    .lg-list-item-btn {
      display: flex;
      width: 100%;
      align-items: center;
      position: absolute;
      bottom: 0.5rem;

      button {
        margin: 0rem 0.5rem;
        width: 30%;
        box-shadow: none;
        padding: 0.2rem 0.5rem;
      }
    }
  }
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
  border-top: 2px solid #dee2e6;
  background-color: rgb(248, 176, 81);
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 600;
  font-size: large;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.table tbody {
  td {
    padding: 1rem;
    vertical-align: middle;

    &:first-child {
      padding: 0.25rem;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.cart-btn {
  color: rgb(248, 169, 65);
  border: 1px solid rgb(248, 169, 65);
  &:hover {
    background-color: rgb(248, 169, 65);
    color: white;
  }
  &.active {
    background-color: rgb(248, 169, 65);
    color: white;
  }
  &:disabled {
    background-color: rgb(248, 169, 65);
    color: white;
  }
}

.product-img {
  max-width: 90px;
}
</style>
<script>
import { addToCart } from '@/methods/routeToFn';

export default {
  data() {
    return {
      isLoading: false,
      favorArr: JSON.parse(localStorage.getItem('favor')) || [],
      products: [],
      cartIDs: [],
      status: {
        loadingItem: '',
      },
    };
  },
  computed: {},
  created() {
    this.getCartIDs();
    this.favorArr.forEach((item, index) => {
      this.getProduct(item, index);
    });
  },
  methods: {
    getProduct(id, index) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url).then((res) => {
        this.products.splice(index, 0, res.data.product);
      });
    },
    getCartIDs() {
      this.cartIDs = [];
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        res.data.data.carts.forEach((item) => {
          this.cartIDs.push(item.product_id);
        });
      });
    },
    removeFavor(item) {
      const favorIndex = this.favorArr.indexOf(item.id);
      const pdIndex = this.products.indexOf(item);
      this.favorArr.splice(favorIndex, 1);
      this.products.splice(pdIndex, 1);
      localStorage.setItem('favor', JSON.stringify(this.favorArr));
    },
    addToCart,
    pushCart(id) {
      this.cartIDs.push(id);
    },
  },
};
</script>
