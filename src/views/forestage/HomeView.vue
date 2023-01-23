<template>
  <!-- 輪播廣告 -->
  <Carousel :tagsList="tagLists"></Carousel>

  <!-- 產品分類選擇區 -->
  <div class="container my-3">
    <br />
    <hr />
    <swiper-item :breakpoints="selectionBreakpoints">
      <swiper-slide>
        <router-link
          class="homepage-products-selection mx-auto"
          :class="{ active: tempSelected === 'comic' }"
          to=""
          @click="$emit('temp-selection', 'comic'), (tempSelected = 'comic')"
        >
          <img
            class="w-100 homepage-products-selection-pic"
            src="@/assets/img/illustration_comic.png"
            alt=""
          />
          <div class="homepage-products-selection-text">
            <img src="@/assets/img/selected_img_comic.png" alt="" />
          </div>
        </router-link>
      </swiper-slide>
      <swiper-slide>
        <router-link
          class="homepage-products-selection mx-auto"
          :class="{ active: tempSelected === 'lightNovel' }"
          to=""
          @click="
            $emit('temp-selection', 'lightNovel'), (tempSelected = 'lightNovel')
          "
        >
          <img
            class="w-100 homepage-products-selection-pic"
            src="@/assets/img/illustration_lightnovel.png"
            alt=""
          />
          <div class="homepage-products-selection-text">
            <img src="@/assets/img/selected_img_lightnovel.png" alt="" />
          </div>
        </router-link>
      </swiper-slide>
      <swiper-slide>
        <router-link
          class="homepage-products-selection mx-auto"
          :class="{ active: tempSelected === 'novel' }"
          to=""
          @click="$emit('temp-selection', 'novel'), (tempSelected = 'novel')"
        >
          <img
            class="w-100 homepage-products-selection-pic"
            src="@/assets/img/illustration_novel.png"
            alt=""
          />
          <div class="homepage-products-selection-text">
            <img src="@/assets/img/selected_img_novel.png" alt="" />
          </div>
        </router-link>
      </swiper-slide>
      <swiper-slide>
        <router-link
          class="homepage-products-selection mx-auto"
          :class="{ active: tempSelected === 'nonfiction' }"
          to=""
          @click="
            $emit('temp-selection', 'nonfiction'), (tempSelected = 'nonfiction')
          "
        >
          <img
            class="w-100 homepage-products-selection-pic"
            src="@/assets/img/illustration_nonfiction.png"
            alt=""
          />
          <div class="homepage-products-selection-text">
            <img src="@/assets/img/selected_img_nonfiction.png" alt="" />
          </div>
        </router-link>
      </swiper-slide>
    </swiper-item>
  </div>

  <!-- 產品Swipers -->
  <div class="container my-3">
    <router-link
      class="fs-3 ms-3"
      style="color: #f7846a; font-weight: 600; text-decoration: none"
      :to="`/search?search=&category=${this.tempSelected}`"
    >
      <i class="fa-solid fa-hashtag"></i>&nbsp; 最新上架{{ tempSelectedCN }}
      <span class="fs-6 text-secondary ps-4">view more →</span>
    </router-link>

    <ProductSwiper
      listbox-name="latest_products"
      :products-list="this.filteredList.latestProducts.slice(0, 10)"
    ></ProductSwiper>
  </div>
  <div class="container my-3">
    <router-link
      class="fs-3 ms-3"
      style="color: #f7846a; font-weight: 600; text-decoration: none"
      :to="`/search?search=&category=${this.tempSelected}&isPopular=true`"
    >
      <i class="fa-solid fa-arrow-trend-up"></i>&nbsp; 人氣熱門{{
        tempSelectedCN
      }}<span class="fs-6 text-secondary ps-4">view more →</span>
    </router-link>
    <ProductSwiper
      listbox-name="popular_products"
      :products-list="this.filteredList.popularProducts.slice(0, 10)"
    ></ProductSwiper>
  </div>
  <div class="container my-3">
    <router-link
      class="fs-3 ms-3"
      style="color: #f7846a; font-weight: 600; text-decoration: none"
      :to="`/search?search=&category=${this.tempSelected}&isOnSale=true`"
    >
      <i class="fa-solid fa-arrows-down-to-line"></i>&nbsp; 現在特價{{
        tempSelectedCN
      }}<span class="fs-6 text-secondary ps-4">view more →</span>
    </router-link>
    <ProductSwiper
      listbox-name="onsale_products"
      :products-list="this.filteredList.onSaleProducts.slice(0, 10)"
    ></ProductSwiper>
  </div>

  <!-- 商店連結廣告 -->
  <div class="container-fluid mt-5 justify-content-center d-flex">
    <div class="homepage-box d-flex">
      <router-link
        class="btn btn-info mx-auto my-auto rounded-0 shadow-none"
        to="/search?search=&category=all"
      >
        前往商店
      </router-link>
    </div>
  </div>

  <!-- 下方swipers -->
  <!-- <div class="container">
    <h3 class="mt-5 mb-3 ms-3" style="color: #f7846a; font-weight: 600">
      <i class="fa-regular fa-face-smile"></i>&nbsp; 站長推薦
    </h3>
    <ProductSwiper class="" listbox-name="recommend_products"></ProductSwiper>
  </div> -->
</template>
<style lang="scss">
.homepage-box {
  height: 200px;
  width: 90vw;
  justify-content: center;
  border-radius: 20px;
  background-attachment: fixed;
  background-image: url(@/assets/img/homepageBkBox.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (min-width: 992px) {
    height: 300px;
    width: 75vw;
  }
}

.homepage-products-selection {
  display: flex;
  justify-content: center;
  height: 250px;
  width: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  box-sizing: border-box;
  // border: 5px solid #ffb168cc;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.171);
  background-color: #fde4d7;
  transition: all 0.2s ease-in;

  .homepage-products-selection-pic {
    transition: all 0.2s ease;
  }
  .homepage-products-selection-text {
    height: 250px;
    width: 250px;
    z-index: 1;
    position: absolute;
    inset: 100% 0 0 0;
    transition: all 0.2s ease-in;
    // backgrosund-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    .homepage-products-selection-pic {
      transform: translateY(-250px);
    }

    .homepage-products-selection-text {
      transform: translateY(-250px);
    }
  }
}
.homepage-products-selection.active {
  background-color: #ffc784;
  transform: scale(1.05);
}
</style>
<script>
import Carousel from '../../components/CarouselPart.vue';
import ProductSwiper from '../../components/ProductSwiper.vue';
// @ is an alias to /src
import routeToFn from '@/methods/routeToFn';

export default {
  props: {
    filteredList: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
    tagLists: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
  },
  emits: ['temp-selection'],

  data() {
    return {
      tempSelected: 'comic',
      tempSelectedCN: '',

      // selection area option
      selectionBreakpoints: {
        320: { slidesPerView: 1.2, spaceBetween: 10 },
        568: { slidesPerView: 1.75, spaceBetween: 20 },
        770: { slidesPerView: 2.5, spaceBetween: 40 },
        992: { slidesPerView: 3, spaceBetween: 50 },
        1200: { slidesPerView: 4.5, spaceBetween: 60 },
      },
    };
  },
  name: 'HomeView',
  components: {
    Carousel,
    ProductSwiper,
  },
  watch: {
    tempSelected: {
      immediate: true,
      handler: function () {
        if (this.tempSelected === 'comic') {
          this.tempSelectedCN = '漫畫';
        } else if (this.tempSelected === 'lightNovel') {
          this.tempSelectedCN = '輕小說';
        } else if (this.tempSelected === 'novel') {
          this.tempSelectedCN = '文學小說';
        } else if (this.tempSelected === 'nonfiction') {
          this.tempSelectedCN = '實用書';
        }
      },
    },
  },
  methods: {
    // 分類區連結fn
    routeToFn,
  },
  mounted() {
    window.scroll(0, 0);
  },
};
</script>
