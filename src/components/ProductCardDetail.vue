<template>
  <div class="card_container">
    <!-- 封面照片 -->
    <div class="pic_box">
      <router-link class="w-100" :to="`/product/${productInfo.id}`">
        <img class="w-100" :src="productInfo.images[0]" alt="產品圖片" />
      </router-link>
    </div>
    <div class="info_container">
      <!-- 書名 -->
      <p :title="productInfo.title" class="product_title">
        {{ productInfo.title }}
      </p>
      <!-- 作者資訊 -->
      <div class="d-flex product_info">
        <p :title="productInfo.author.join('、')">
          {{ productInfo.author.join('、') }}
        </p>
        <p class="ms-5" :title="productInfo.publisher">
          {{ productInfo.publisher }}
        </p>
        <p class="" :title="productInfo.pub_date">
          {{ $filters.date(productInfo.pub_date) }}
        </p>
      </div>
      <!-- 簡介 -->
      <div class="des_short bg-light">
        <p>
          {{ productInfo.des_short }}
          <span
            ><router-link :to="`/product/${productInfo.id}`" class=""
              >... more</router-link
            ></span
          >
        </p>
      </div>
      <!-- 價格、按鈕 -->
      <div class="card_control">
        <div class="product_price ms-3">
          <p>
            $ {{ productInfo.price }}
            <span v-if="productInfo.price < productInfo.origin_price"
              >$ {{ productInfo.origin_price }}</span
            >
          </p>
        </div>
        <div class="cart_btn">
          <button
            class="btn"
            @click="addToCart(productInfo.id)"
            :disabled="this.status.loadingItem === productInfo.id"
          >
            <div
              v-if="this.status.loadingItem === productInfo.id"
              class="spinner-border spinner-border-sm d-inline-block mx-1"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <i v-else class="fa-solid fa-cart-shopping" aria-hidden="true"></i>

            加入購物車
          </button>
          <button class="btn" @click="addToFavor(productInfo.id)">
            <i class="fa-regular fa-sun d-flex fs-4" v-if="!isFavorite"></i>
            <i class="fa-solid fa-sun d-flex fs-4" v-else></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card_container {
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.295);
  .pic_box {
    background-color: rgb(255, 255, 255);

    width: 21vw;
    height: 28vw;
    box-sizing: border-box;
    margin: 0.5rem 0.5rem;
    overflow: hidden;
  }
  .info_container {
    padding: 0.2rem;
    position: relative;
    width: 60vw;
    .product_title {
      font-size: 1.5rem;
      width: 100%;
      font-weight: 600;
      color: rgb(92, 92, 92);
      margin-bottom: 0rem;
      margin-top: 0.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .product_info {
      p {
        margin-left: 0.1rem;
        font-weight: 600;
        color: rgb(151, 151, 151);
        margin-bottom: 0.25rem;
        &:nth-child(2) {
          flex-grow: 1;
          text-align: right;
          margin-right: 5%;
        }
        &:last-child {
          text-align: right;
          margin-right: 5%;
        }
      }
    }
    .des_short {
      height: 50%;
      overflow: hidden;

      span a {
        text-decoration: none;
        color: #6c757d;
        &:hover {
          color: rgb(52, 189, 252);
          text-decoration: underline;
        }
      }
    }
    .card_control {
      position: absolute;
      bottom: 5%;
      display: flex;
      width: 100%;
      align-items: center;
      .product_price p {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        font-weight: 800;
        color: rgb(253, 66, 66);
        span {
          margin-left: 0.5rem;
          font-size: 1rem;
          color: gray;
          font-weight: 400;
          text-decoration: line-through;
        }
      }
      .cart_btn {
        margin-left: auto;
        margin-right: 10%;
        display: flex;
        button {
          background-color: #faa95d;
          padding: 0.5rem;
          margin: 0rem 0.25rem;
          border: none;
          color: rgb(255, 255, 255);
          border-radius: 0;
          font-weight: 600;
          font-size: medium;
          &:last-child {
            box-sizing: border-box;
            padding: 0;
            width: 2.5rem;
            height: 2.5rem;
            border: 3px solid #faa95d;
            background-color: white;
            color: #faa95d;
            i {
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .card_container {
    .pic_box {
      width: 15vw;
      height: 20vw;
    }
    .info_container {
      max-width: 70%;
    }
  }
}

@media screen and (min-width: 1400px) {
  .card_container {
    .pic_box {
      width: 9vw;
      height: 12vw;
    }
    .info_container {
      max-width: 75%;
    }
  }
}
</style>
<script>
import { addToFavor, addToCart } from '@/methods/routeToFn';

export default {
  data() {
    return {
      favorIndex: '',
      favorArr: JSON.parse(localStorage.getItem('favor')) || [],
      status: {
        loadingItem: '', //動應品項id
      },
    };
  },
  props: {
    productInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  computed: {
    isFavorite() {
      const index = this.favorArr.indexOf(this.productInfo.id);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    addToCart,
    addToFavor,
  },
  mounted() {},
};
</script>
