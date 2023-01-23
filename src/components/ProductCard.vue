<template>
  <div class="card_container">
    <div class="card_pic" id="eko">
      <div class="card_collect" @click="addToFavor(productInfo.id)">
        <span class="collect_icon" v-if="isFavorite === false"
          ><i class="fa-regular fa-sun"></i
        ></span>
        <span class="collect_icon" v-else><i class="fa-solid fa-sun"></i></span>
      </div>
      <router-link class="w-100" :to="`/product/${productInfo.id}`">
        <img class="w-100" :src="productInfo.images[0]" alt="產品圖片" />
      </router-link>
    </div>
    <router-link class="card_content" :to="`/product/${productInfo.id}`">
      <p class="card_title words-loop" :title="productInfo.title">
        {{ productInfo.title }}
      </p>
      <p class="card_author" :title="productInfo.author.join('、')">
        {{ productInfo.author.join('、') }}
      </p>
    </router-link>
    <div class="card_control">
      <button
        class="card_cartBtn"
        @click="addToCart(productInfo.id)"
        :disabled="this.status.loadingItem === productInfo.id"
      >
        <span class="btn_price">${{ productInfo.price }}</span>
        <span class="btn_shopping_icon">
          <div
            v-if="this.status.loadingItem === productInfo.id"
            class="spinner-border spinner-border-sm text-light"
            role="status"
            style="margin-bottom: 0.2rem"
          >
            <span class="visually-hidden">Loading...</span>
          </div>

          <i v-else class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
        </span>
        <span class="btn_add">加入購物車</span>
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card_container {
  width: 200px;
  height: 380px;
  border-radius: 3px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  position: relative;
  animation: ease;
  box-shadow: 0px 0px 20px 2px #faa95d;
  .card_pic {
    outline: 1.5px solid rgb(90, 90, 90);
    width: 180px;
    height: 240px;
    // max-height: 280px;
    overflow: hidden;
    position: relative;

    .card_collect {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      background-color: #faa95d;
      width: 50px;
      height: 50px;
      border-radius: 0 0 0 100%;
      font-size: 1.5rem;
      font-weight: bolder;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      transition: 0.2s;
      .collect_icon {
        display: inline-block;
        transform: translate(5px, -5px);
        color: white;
      }
    }
  }
  .card_content {
    overflow: hidden;
    text-decoration: none;
    .card_title {
      font: bold 1.5rem sans-serif;
      color: rgb(43, 43, 43);
      max-height: 64px;
      margin: 0.4rem 0.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card_author {
      margin: 0 0.4rem;
      font-weight: 500;
      color: rgb(71, 71, 71);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .card_control {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 80%;
    height: 35px;
    .card_cartBtn {
      background: #e9982d;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      outline: none;
      border: none;
      color: #eee;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      span {
        transition: transform 0.3s;
        display: inline-block;
        font-size: 1.2rem;
        margin: 0;
      }
      &:disabled {
        background-color: #ffddb1;
        color: white;
      }
      .btn_price,
      .btn_shopping_icon {
        background: rgb(70, 70, 70);
        border: none;
        margin: 0;
        padding-right: 4px;
        text-align: center;
        line-height: 35px;
        box-sizing: border-box;
        width: 35%;
        font-size: 1.1rem;
        font-weight: 600;
      }
      .btn_shopping_icon {
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        transform: translateX(-100%);
        font-size: 1.2rem;
      }
      .btn_add {
        z-index: 3;
        font-weight: bolder;
        padding: 2px 2px;
        box-sizing: border-box;
        width: 65%;
      }
      &:hover {
        .btn_price {
          transform: translateX(-100%);
        }
        .btn_shopping_icon {
          transform: translateX(0%);
        }
      }
    }
  }
}
// &符號為上一層容器的意思
.card_container:hover {
  transform: scale(1.075);
  background-color: #faa95d;
  transition: all 0.2s ease-out;
  box-shadow: none;

  .card_pic {
    outline: none;
    background-color: white;
  }
  .card_pic .card_collect {
    background-color: white;
    outline: none;
    span {
      color: #faa95d;
    }
    &:hover {
      transform: translate(2px, -2px);
      background-color: #faa95d;
      box-shadow: 5px -5px #faa95d;
      span {
        color: white;
      }
    }
  }
  .card_content {
    max-width: 180px;
    .card_title {
      color: aliceblue;
      margin: 0.4rem 0.2rem 0rem 0.2rem;
    }
    .card_author {
      color: aliceblue;
    }
    .words-loop {
      display: inline-block;
      text-overflow: clip;
      // wordsLoop anime
      animation-name: wordsLoop;
      animation-duration: 2.5s;
      animation-iteration-count: 1;
      animation-delay: 0.2s;
      animation-direction: normal;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  }
  .card_cartBtn {
    background-color: white;
    color: #e9982d;
    // bottom: 4px;
    .btn_price,
    .btn_shopping_icon {
      color: white;
    }
  }
}
@keyframes wordsLoop {
  100% {
    transform: translateX(min(calc(-100% + 175px), 1px));
  }
}
// 手機上縮小顯示
@media screen and (max-width: 768px) {
  .card_container {
    width: 160px;
    height: 310px;

    .card_pic {
      width: 144px;
      height: 192px;
      .card_collect {
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
        line-height: 40px;
      }
    }
    .card_content .card_title {
      font-size: 1.2rem;
      margin-bottom: 0.2rem;
    }
    .card_control {
      height: 28px;
      bottom: 0.8rem;
      .card_cartBtn {
        span {
          font-size: 1rem;
        }
        .btn_price,
        .btn_shopping_icon {
          line-height: 28px;
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
<script>
import { addToFavor, addToCart } from '@/methods/routeToFn';
export default {
  props: {
    productInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    productInfo: () => {
      console.log('change Card');
    },
    favorArr() {
      console.log('favor change');
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
  data() {
    return {
      favorIndex: '',
      favorArr: JSON.parse(localStorage.getItem('favor')) || [],
      changeCard: false,
      tempProductInfo: {},
      status: {
        loadingItem: '', //動應品項id
      },
    };
  },
  methods: {
    addToCart,
    addToFavor,
  },
  mounted() {},
};
</script>
