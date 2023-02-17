<template>
  <div class="container">
    <!-- breadcrumb -->
    <div class="my-2">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="product breadcrumb">
        <ol class="breadcrumb my-0 product-breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/home">Home</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="`/search?search=&category=${product.category}`">{{
              categoryCN
            }}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link
              :to="`/search?category=all&search=${product.series}`"
              >{{ product.series }}</router-link
            >
          </li>
        </ol>
      </nav>
    </div>
    <div class="row justify-content-center align-item-center">
      <!-- 左邊產品圖片區 -->
      <div class="col-10 col-md-6 col-lg-4">
        <!-- 圖片 -->
        <div class="pic-box mx-auto">
          <div class="product-pics">
            <swiper-item
              :pagination="swiperOptions.pagination"
              :navigation="swiperOptions.navigation"
              :modules="modules"
              class="productSwiper"
            >
              <swiper-slide
                class="m-0"
                v-for="(pic, i) in product.images"
                :key="i"
              >
                <div
                  class="w-100 product-pic"
                  :style="`
                    background-image: url(${pic});`"
                  @mouseenter="addZoomFn"
                  @mousemove="moveHandler"
                  @mouseleave="removeZoomFn"
                  @click="picModal.show(), picCarousel.to(i)"
                ></div>
                <!-- carousel到指定頁數↑ -->
              </swiper-slide>
            </swiper-item>
          </div>
          <!-- 圖片控制btn -->
          <button class="btn swiper-btn-prev">
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <button class="btn swiper-btn-next">
            <i class="fa-solid fa-angle-right"></i>
          </button>
          <!-- pagination -->
          <div class="product-swiper-pagination"></div>
        </div>

        <!-- products pic lightbox -->
        <div class="modal" tabindex="-1" ref="pic_modal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!-- 輪播 圖片本體 -->
              <div class="modal-body p-1">
                <div
                  id="picCarouselBox"
                  class="carousel slide"
                  ref="pic_carousel"
                  data-bs-touch="false"
                >
                  <!-- 底部按鈕 -->
                  <div class="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#picCarouselBox"
                      v-for="(pic, i) in product.images"
                      :key="'indicator-' + i"
                      :data-bs-slide-to="i"
                      :class="{ active: i === 0 }"
                      aria-current="true"
                      :aria-label="'Slide' + (i + 1)"
                    ></button>
                  </div>
                  <div class="carousel-inner">
                    <div
                      v-for="(pic, i) in product.images"
                      :key="'inner-' + i"
                      class="carousel-item"
                      :class="{ active: i === 0 }"
                    >
                      <img class="d-block w-100" :src="pic" alt="pic" />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#picCarouselBox"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#picCarouselBox"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 產品購買資訊 -->
      <div class="col-11 col-md-6 col-lg-8">
        <div class="my-3 title-info mx-lg-5 mt-lg-4">
          <h1 class="fw-semibold text-dark">{{ product.title }}</h1>
          <h5 class="mb-lg-3">{{ product.subtitle }}</h5>
          <p>
            作者：<router-link
              class=""
              v-for="(author, i) in product.author"
              :key="'author-' + i"
              :to="`/search?search=&category=all&author=${author}`"
              ><span class="text-black" v-if="i >= 1">、</span>{{ author }}
            </router-link>
          </p>
          <p>
            出版社：<router-link
              class=""
              :to="`/search?search=&category=all&publisher=${product.publisher}`"
              >{{ product.publisher }}</router-link
            >
          </p>
          <p>出版日期：{{ $filters.date(product.pub_date) }}</p>
        </div>
        <!-- 價錢 -->
        <div class="col-auto product-price mx-lg-5 mt-lg-5">
          <p class="fs-1 fs-lg-3 text-danger fw-bold">
            ${{ product.price }}
            <span
              class="fs-6 fw-normal text-secondary text-decoration-line-through"
              v-if="product.origin_price > product.price"
              >${{ product.origin_price }}</span
            ><span
              class="fs-4 text-success fw-bolder ms-3"
              v-if="product.origin_price > product.price"
            >
              {{ discount }}%
            </span>
          </p>
        </div>
        <!-- 購買控制 -->
        <div
          class="row justify-content-center justify-content-lg-start product-control mx-lg-5"
        >
          <button class="btn col-5 col-lg-3" @click="addToFavor(this.id)">
            <span v-if="isFavorite"
              ><i class="fa-solid fa-sun"></i> 取消收藏</span
            >
            <span v-else> <i class="fa-regular fa-sun"></i> 加入收藏 </span>
          </button>
          <button
            class="btn col-5 col-lg-3"
            @click="addToCart(this.id)"
            :disabled="this.status.loadingItem === this.id"
          >
            <span><i class="fa-solid fa-cart-arrow-down"></i> 加入購物車</span>
          </button>
        </div>
      </div>
    </div>
    <hr class="my-4" />
    <!-- 下方詳細資訊區    -->
    <div class="nav nav-tabs" id="info-tab" role="tablist">
      <!-- 分頁按鈕 -->
      <button
        class="nav-link active"
        id="nav-description-tab"
        data-bs-toggle="tab"
        data-bs-target="#info-description"
        type="button"
        role="tab"
        aria-controls="info-description"
        aria-selected="true"
      >
        內容簡介
      </button>
      <button
        class="nav-link"
        id="nav-description-tab"
        data-bs-toggle="tab"
        data-bs-target="#info-author"
        type="button"
        role="tab"
        aria-controls="info-author"
        aria-selected="true"
      >
        作者簡介
      </button>
      <button
        class="nav-link"
        id="nav-detail-tab"
        data-bs-toggle="tab"
        data-bs-target="#info-detail"
        type="button"
        role="tab"
        aria-controls="info-detail"
        aria-selected="false"
      >
        詳細資料
      </button>
    </div>
    <!-- 分頁資料 -->
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="info-description"
        role="tabpanel"
        aria-labelledby="description"
      >
        <!-- 內容簡介 HTMl -->
        <div class="my-1 mx-4 content-des" v-html="product.description"></div>
      </div>
      <div
        class="tab-pane fade"
        id="info-author"
        role="tabpanel"
        aria-labelledby="author"
      >
        <!-- 作者簡介 HTMl -->
        <div class="my-1 mx-4 author-des" v-html="product.author_des"></div>
      </div>
      <div
        class="tab-pane fade"
        id="info-detail"
        role="tabpanel"
        aria-labelledby="detail information"
      >
        <div class="mx-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="col-4"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="product.series">
                <th>系列</th>
                <td>{{ product.series }}</td>
              </tr>
              <tr v-if="product.title">
                <th>書名</th>
                <td>{{ product.title }}</td>
              </tr>
              <tr v-if="product.subtitle">
                <th>副標</th>
                <td>{{ product.subtitle }}</td>
              </tr>
              <tr v-if="product.author">
                <th>作者</th>
                <td>
                  {{
                    product.author.length > 1
                      ? product.author.join('、')
                      : product.author[0]
                  }}
                </td>
              </tr>
              <tr v-if="product.original_author">
                <th>原作</th>
                <td>
                  {{
                    product.original_author.length > 1
                      ? product.original_author.join('、')
                      : product.original_author[0]
                  }}
                </td>
              </tr>
              <tr v-if="product.illustrator">
                <th>繪師</th>
                <td>
                  {{
                    product.illustrator.length > 1
                      ? product.illustrator.join('、')
                      : product.illustrator[0]
                  }}
                </td>
              </tr>
              <tr v-if="product.translator">
                <th>譯者</th>
                <td>
                  {{
                    product.translator.length > 1
                      ? product.translator.join('、')
                      : product.translator[0]
                  }}
                </td>
              </tr>
              <tr v-if="product.pages_num">
                <th>頁數</th>
                <td>{{ product.pages_num }}</td>
              </tr>
              <tr>
                <th>出版社</th>
                <td>{{ product.publisher }}</td>
              </tr>
              <tr>
                <th>出版日期</th>
                <td>{{ $filters.date(product.pub_date) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <hr class="my-3" />
    <!-- 作品標籤 -->
    <div class="mx-1">
      <h2>Tags</h2>
      <div class="row mx-0 tag-list">
        <router-link
          class="btn btn-outline-secondary d-flex col-auto"
          v-for="(tag, i) in product.tags"
          :key="'tag-' + i"
          :to="`/search?search=&category=${product.category}&tag=${tag}`"
        >
          #{{ tag }}
        </router-link>
      </div>
    </div>
    <!-- 推薦Swiper -->
    <div class="mt-5">
      <h3>| 你可能還喜歡</h3>
      <recommend-swiper
        listbox-name="recommend_products"
        :products-list="recommendProducts"
      ></recommend-swiper>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// breadcrumb setting
.product-breadcrumb {
  .breadcrumb-item {
    a {
      text-decoration: none;
      color: rgb(247, 151, 42);
      font-weight: 600;
    }
    &.active {
      font-weight: 600;
      a {
        color: rgb(108, 117, 125);
      }
    }
    &:hover {
      text-decoration: underline;
    }
  }
}

// product cover
.pic-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgb(230, 230, 230);
  // max-width: 320px;

  // product pic zoom fn
  .product-pics {
    width: 300px;
    height: 400px;
    swiper-item {
      width: 100%;
    }
  }
  .product-pic {
    width: 300px;
    height: 400px;
    background-color: transparent;
    background-size: 300px 400px;
    background-repeat: no-repeat;
    transition: background-size 0.05s linear;
  }
  .product-pic.pic-zoom {
    z-index: 10;
    background-size: 600px 800px;
    background-position: calc(var(--x) * 100%) calc(var(--y) * 100%);
  }

  button {
    z-index: 1;
    background-color: none;
    position: absolute;
    border: none;
    color: rgb(255, 161, 53);
    font-size: 2rem;

    &:disabled {
      color: transparent;
    }
    &.swiper-btn-prev {
      left: 0;
    }
    &.swiper-btn-next {
      right: 0;
    }
  }
  .product-swiper-pagination {
    background-color: rgba(0, 0, 0, 0.637);
    color: white;
    width: 3rem;
    padding: 0rem 0.25rem;
    text-align: center;
    border-radius: 9px;
    position: absolute;
    z-index: 10;
    left: 80%;
    font-size: 0.75rem;
  }
  .products-pic-lightbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000066;
    z-index: -1;
    opacity: 0;
    &:target {
      z-index: 1;
      opacity: 1;
      transition: 0.5s;
    }
  }
}

.title-info {
  p {
    margin: 0.25rem 0;
    a:hover {
      color: rgb(129, 129, 129);
      text-decoration: underline;
    }
    a {
      text-decoration: none;
      color: var(--bs-body-color);
    }
  }
}
.product-control {
  & > button {
    margin: 0 0.5rem;
    background-color: white;
    border: 5px solid rgb(247, 151, 42);
    color: rgb(243, 141, 24);
    border-radius: 2px;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.25rem;

    &:hover {
      background-color: rgb(247, 151, 42);
      color: white;
    }
    &:last-child {
      background-color: rgb(247, 151, 42);
      color: white;
      &:hover {
        background-color: rgb(247, 165, 72);
        border-color: rgb(247, 165, 72);
      }
    }
  }
}
//分頁按鈕
.nav-tabs {
  button {
    font-weight: 600;
    color: gray;
    &.active {
      color: rgb(247, 151, 42);
    }
  }
}
//分頁內容
.tab-content {
  .content-des,
  .author-des {
    p {
      margin-bottom: 0.5rem;
    }
  }
}
.tag-list {
  a {
    // border: 1px solid rgb(247, 151, 42);
    // color: rgb(247, 151, 42);
    font-weight: 600;
    margin: 0.1rem;

    &:hover,
    &:focus,
    &:active {
      box-shadow: none;
      background-color: rgb(247, 151, 42);
      border-color: rgb(247, 151, 42);
    }
  }
}
</style>
<script>
import { addToFavor, addToCart } from '@/methods/routeToFn';
import { Pagination, Navigation } from 'swiper';
import Tab from 'bootstrap/js/dist/tab';
import RecommendSwiper from '@/components/ProductSwiper.vue';
import Modal from 'bootstrap/js/dist/modal';
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  components: { RecommendSwiper },
  data() {
    return {
      modules: [Pagination, Navigation],
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev',
        },
        pagination: {
          type: 'fraction',
          el: '.product-swiper-pagination',
        },
      },

      picModal: {},
      picCarousel: {},

      // product data
      product: {},
      categoryCN: '',
      id: '',
      status: {
        loadingItem: '', //動應品項id
      },
      favorArr: JSON.parse(localStorage.getItem('favor')) || [],
    };
  },
  props: {
    filteredList: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
  },
  watch: {
    'product.category'() {
      if (this.product.category === 'comic') {
        this.categoryCN = '漫畫';
      } else if (this.product.category === 'lightNovel') {
        this.categoryCN = '輕小說';
      } else if (this.product.category === 'novel') {
        this.categoryCN = '文學小說';
      } else if (this.product.category === 'nonfiction') {
        this.categoryCN = '實用書';
      }
    },
    '$route.params.productId'() {
      this.id = this.$route.params.productId;
      this.getProduct();
    },
  },
  computed: {
    recommendProducts() {
      const tempArr = [...this.filteredList.latestProducts];
      let matchItemIndex;
      tempArr.forEach((item, index) => {
        if (item.id === this.id) {
          matchItemIndex = index;
        }
      });
      if (matchItemIndex || matchItemIndex === 0) {
        tempArr.splice(matchItemIndex, 1);
      } else {
        tempArr.splice(10, 1);
      }
      return tempArr;
    },
    discount() {
      const num = this.product.price - this.product.origin_price;
      const deno = this.product.origin_price;
      const discountPercent = Math.round((num / deno) * 100);
      return discountPercent;
    },
    isFavorite() {
      const index = this.favorArr.indexOf(this.id);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    addToFavor,
    addToCart,
    // 放大圖片
    addZoomFn(event) {
      event.target.className += ' pic-zoom';
    },
    removeZoomFn(event) {
      event.target.classList.remove('pic-zoom');
    },
    // 移動控制
    moveHandler(e) {
      // 總尺寸
      let rect = e.target.getBoundingClientRect();
      // 配合手機 touch事件沒有offset
      let offsetX, offsetY;
      // 判斷e type
      if (['touchstart', 'touchmove', 'touchend'].includes(e.type)) {
        // touches[0] 為多點觸控的第一點

        offsetX = e.changedTouches[0].clientX - rect.left;
        offsetY = e.changedTouches[0].clientY - rect.top;

        e.preventDefault();
      } else {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
      }
      // x,y 的比例
      let x = offsetX / rect.width;
      let y = offsetY / rect.height;

      e.target.style.setProperty('--x', x);
      e.target.style.setProperty('--y', y);
    },
    // 取得資料
    getProduct() {
      window.scroll({
        top: 0,
        behavior: 'instant',
      });
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
          console.log('temp product', this.product);
          this.$emit('temp-selection', this.product.category);
        }
      });
    },
  },
  created() {
    // 取得 ID
    this.id = this.$route.params.productId;
    this.getProduct();
  },
  mounted() {
    const triggerTabList = document.querySelectorAll('#info-tab button');
    triggerTabList.forEach((triggerEl) => {
      const tabTrigger = new Tab(triggerEl);
      triggerEl.addEventListener('click', (event) => {
        event.preventDefault();
        tabTrigger.show();
      });
    });
    //pic modal
    this.picModal = new Modal(this.$refs.pic_modal);
    this.picCarousel = new Carousel(this.$refs.pic_carousel);
  },
};
</script>
