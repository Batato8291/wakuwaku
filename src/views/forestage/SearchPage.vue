<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="container">
    <div class="row">
      <!-- 左側sidebar -->
      <div
        class="col-12 col-lg-3 category-list pb-3"
        style="background-color: bisque; min-height: 500px"
      >
        <!-- 清單 -->
        <ul class="list-group list-group-flush mt-3">
          <li class="list-group-item" @click.prevent="routeToFn('all')">
            <span class="nav-item-icon"
              ><i class="fa-regular fa-face-smile"></i>
            </span>
            全部商品
          </li>

          <li
            class="list-group-item"
            @click.prevent="routeToFn('all', false, false, false, true)"
          >
            <span class="nav-item-icon"
              ><i class="fa-solid fa-arrow-trend-up"></i
            ></span>
            人氣熱門
          </li>

          <li
            class="list-group-item"
            @click.prevent="routeToFn('all', false, false, false, false, true)"
          >
            <span class="nav-item-icon"
              ><i class="fa-solid fa-arrows-down-to-line"></i
            ></span>
            現在特價
          </li>

          <li
            class="list-group-item"
            href="#comicCollapse"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="true"
          >
            <a>
              <span class="category-icon nav-item-icon"
                ><i class="fa-solid fa-angles-right category-icon"></i
              ></span>
              漫畫分類
            </a>
            <ul
              class="collapse mt-2"
              id="comicCollapse"
              :class="[
                tempSearchQuery.category === 'comic' ? 'collapse show' : '',
              ]"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#comicCollapse .show"
                  @click="routeToFn('comic')"
                >
                  <i class="fa-solid fa-book"></i>
                  全部漫畫
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#comicCollapse .show"
                  @click="routeToFn('comic', false, false, false, true)"
                >
                  <i class="fa-solid fa-book"></i>
                  熱門漫畫
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#comicCollapse .show"
                  @click="routeToFn('comic', false, false, false, false, true)"
                  ><i class="fa-solid fa-book"></i>
                  特價漫畫
                </router-link>
              </li>

              <li>
                <hr />
              </li>

              <li v-for="(tag, i) in comicTags" :key="'comic-' + i">
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#comicCollapse .show"
                  @click="routeToFn('comic', tag)"
                  ><i class="fa-solid fa-hashtag"></i> {{ tag }}</router-link
                >
              </li>
            </ul>
          </li>
          <li
            class="list-group-item"
            href="#lightNovelCollapse"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
          >
            <a>
              <span class="category-icon nav-item-icon"
                ><i class="fa-solid fa-angles-right category-icon"></i
              ></span>
              輕小說分類
            </a>
            <ul
              class="collapse mt-2"
              :class="[
                tempSearchQuery.category === 'lightNovel'
                  ? 'collapse show'
                  : '',
              ]"
              id="lightNovelCollapse"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#lightNovelCollapse .show"
                  @click="routeToFn('lightNovel')"
                >
                  <i class="fa-solid fa-book-journal-whills"></i>
                  全部輕小說
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#lightNovelCollapse .show"
                  @click="routeToFn('lightNovel', false, false, false, true)"
                >
                  <i class="fa-solid fa-book-journal-whills"></i>
                  熱門輕小說
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#lightNovelCollapse .show"
                  @click="
                    routeToFn('lightNovel', false, false, false, false, true)
                  "
                  ><i class="fa-solid fa-book-journal-whills"></i>
                  特價輕小說
                </router-link>
              </li>
              <li>
                <hr />
              </li>
              <li v-for="(tag, i) in lightNovelTags" :key="'lightNovel-' + i">
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#lightNovelCollapse .show"
                  @click="routeToFn('lightNovel', tag)"
                  ><i class="fa-solid fa-hashtag"></i>{{ tag }}</router-link
                >
              </li>
            </ul>
          </li>
          <li
            class="list-group-item"
            href="#novelCollapse"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
          >
            <a>
              <span class="category-icon nav-item-icon"
                ><i class="fa-solid fa-angles-right category-icon"></i
              ></span>
              一般小說分類
            </a>
            <ul
              class="collapse mt-2"
              :class="[
                tempSearchQuery.category === 'novel' ? 'collapse show' : '',
              ]"
              id="novelCollapse"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#novelCollapse .show"
                  @click="routeToFn('novel')"
                >
                  <i class="fa-solid fa-book-bookmark"></i>
                  全部一般小說
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#novelCollapse .show"
                  @click="routeToFn('novel', false, false, false, true)"
                >
                  <i class="fa-solid fa-book-bookmark"></i>
                  熱門一般小說
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#novelCollapse .show"
                  @click="routeToFn('novel', false, false, false, false, true)"
                  ><i class="fa-solid fa-book-bookmark"></i>
                  特價一般小說
                </router-link>
              </li>
              <li>
                <hr />
              </li>
              <li v-for="(tag, i) in novelTags" :key="'novel-' + i">
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#novelCollapse .show"
                  @click="routeToFn('novel', tag)"
                  ><i class="fa-solid fa-hashtag"></i>{{ tag }}</router-link
                >
              </li>
            </ul>
          </li>

          <li
            class="list-group-item"
            href="#nonfictionCollapse"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
          >
            <a>
              <span class="category-icon nav-item-icon"
                ><i class="fa-solid fa-angles-right category-icon"></i
              ></span>
              實用書分類
            </a>
            <ul
              class="collapse mt-2"
              :class="[
                tempSearchQuery.category === 'nonfiction'
                  ? 'collapse show'
                  : '',
              ]"
              id="nonfictionCollapse"
            >
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#nonfictionCollapse .show"
                  @click="routeToFn('nonfiction')"
                >
                  <i class="fa-solid fa-book-atlas"></i>
                  全部實用書
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#nonfictionCollapse .show"
                  @click="routeToFn('nonfiction', false, false, false, true)"
                >
                  <i class="fa-solid fa-book-atlas"></i>
                  熱門實用書
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#nonfictionCollapse .show"
                  @click="
                    routeToFn('nonfiction', false, false, false, false, true)
                  "
                  ><i class="fa-solid fa-book-atlas"></i>
                  特價實用書
                </router-link>
              </li>
              <li>
                <hr />
              </li>
              <li v-for="(tag, i) in nonfictionTags" :key="'nonfiction-' + i">
                <router-link
                  class="dropdown-item"
                  to=""
                  data-bs-toggle="collapse"
                  data-bs-target="#nonfictionCollapse .show"
                  @click="routeToFn('nonfiction', tag)"
                  ><i class="fa-solid fa-hashtag"></i>{{ tag }}</router-link
                >
              </li>
            </ul>
          </li>

          <!-- 作者選單在有search時才啟動 -->
          <li
            class="list-group-item"
            href="#authorCollapse"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
          >
            <a>
              <span class="category-icon nav-item-icon"
                ><i class="fa-solid fa-angles-right category-icon"></i
              ></span>
              依作者
            </a>
            <ul class="collapse mt-2 show" id="authorCollapse">
              <li v-for="(item, i) in tempAuthorList" :key="'author-' + i">
                <router-link
                  class="dropdown-item"
                  to=""
                  @click="routeToFn('all', false, item)"
                >
                  {{ item }}
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="list-group-item"
            href="#publisherCollapse"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
          >
            <a>
              <span class="category-icon nav-item-icon"
                ><i class="fa-solid fa-angles-right category-icon"></i
              ></span>
              依出版社
            </a>
            <ul class="collapse mt-2 show" id="publisherCollapse">
              <li
                v-for="(item, i) in tempPublisherList"
                :key="'publisher-' + i"
              >
                <router-link
                  class="dropdown-item"
                  to=""
                  @click="routeToFn('all', false, false, item)"
                >
                  {{ item }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 右側產品列表 -->
      <div class="col-12 col-lg-9 bg-light" style="min-height: 500px">
        <!-- tag 介紹 -->
        <div class="row pt-2 search-title no-wrap">
          <h4 class="fw-bold col-8">
            <span v-if="tempSearchQuery.categoryCN"
              >{{ tempSearchQuery.categoryCN }}
            </span>
            <span>{{ this.$route.query.search.split(' ').join(', ') }}</span>
            <span v-if="tempSearchQuery.ps">{{ tempSearchQuery.ps }}</span>
            <span v-if="tempSearchQuery.search !== ''"> 的搜尋結果</span>
          </h4>
          <div class="col-4 text-end">
            <h4 class="fw-bold me-3">{{ filteredProducts.length }} 筆</h4>
          </div>
        </div>
        <!-- sortby 排列選項區 -->
        <div class="row display-selection-zone py-2">
          <div class="col-7 col-md-6 col-lg-4 d-flex">
            <select class="form-select" aria-label="sort by" v-model="sortBy">
              <option value="correlation">相關性</option>
              <option value="dateN2O" selected>出版日期：新&rarr;舊</option>
              <option value="dateO2N">出版日期：舊&rarr;新</option>
              <option value="priceH2L">價格：高&rarr;低</option>
              <option value="priceL2H">價格：低&rarr;高</option>
              <option value="nameA2Z">名稱：A&rarr;Z</option>
              <option value="nameZ2A">名稱：Z&rarr;A</option>
            </select>
          </div>
          <!-- 顯示模式 -->
          <div class="col-auto ms-auto" id="display-mode">
            <button
              class="btn"
              title="Grid"
              :class="{ active: displayMode === 'grid' }"
              @click="displayMode = 'grid'"
            >
              <i class="bi bi-grid-3x3-gap-fill"></i>
            </button>
            <button
              class="btn"
              title="List"
              :class="{ active: displayMode === 'list' }"
              @click="displayMode = 'list'"
              :disabled="window.width <= 768 && window.width !== 0"
            >
              <i class="fa-solid fa-list"></i>
            </button>
          </div>
        </div>

        <!-- 商品列表 Grid-->
        <div
          class="row grid-container"
          :class="{ show: this.displayMode === 'grid' }"
          v-if="displayMode === 'grid'"
        >
          <div
            class="col-6 col-md-4 col-xl-3 g-0 gy-0 d-flex"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <product-card
              class="mx-auto my-3 shadow-none search-product-card change"
              :product-info="product"
            ></product-card>
          </div>
        </div>
        <!-- 商品列表 Detail-->
        <div
          class="mt-2 list-container"
          :class="{ show: this.displayMode === 'list' }"
          v-if="displayMode === 'list'"
        >
          <div
            class="mb-3"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <detail-card
              class="product-card-detail change"
              :product-info="product"
            ></detail-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.category-list {
  .list-group {
    .list-group-item {
      color: #272727;
      &:hover {
        background-color: #f5feff;
        cursor: pointer;
      }
      a {
        text-decoration: none;
        color: #272727;
      }
      .category-icon {
        transition: all 0.2s;
      }
      &[aria-expanded='true'] .category-icon i {
        transform: rotate(90deg);
      }

      ul {
        list-style: none;
        padding-left: 1.5rem;
        a {
          width: auto;
        }
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.nav-item-icon {
  width: 22px;
  display: inline-block;
}

.search-title {
  background-color: #f1f1f1;

  background-color: #ffb876;
  color: white;
}

.display-selection-zone div select {
  &:focus {
    border-color: #faae6800;
    box-shadow: 0 0 5px 1px #fda655;
  }
}
.display-selection-zone {
  #display-mode {
    display: flex;
    button {
      padding: 4px;
      font-size: 2rem;
      line-height: 2rem;
      margin: 0 0.25rem 0;
      justify-content: end;
      background-color: transparent;
      border: none;
      color: #888888;
      box-shadow: none;
      &:focus {
        box-shadow: none;
        background-color: transparent;
        color: #272727;
      }
      &:hover {
        background-color: transparent;
        color: #272727;
      }
      &.active {
        background-color: transparent;
        color: #272727;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
}
.search-product-card {
  outline: solid 2px #808080;
}
// 翻牌動畫
.search-product-card.change {
  animation-name: cardRotate;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
}
.product-card-detail.change {
  animation-name: cardRotate;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-timing-function: linear;
  animation-fill-mode: backwards;
}
@keyframes cardRotate {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

.grid-container .search-product-card:hover {
  transform: none;
}
.grid-container {
  display: none;
  background-color: #f5feff;
  &.show {
    display: flex;
    animation: 0.3s linear 0s displayModeChange;
  }
}
.list-container {
  display: none;
  &.show {
    display: block;
    animation: 0.3s linear 0s displayModeChange;
  }
}
@keyframes displayModeChange {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@media screen and (max-width: 768px) {
  .display-selection-zone {
    #display-mode {
      display: none;
    }
  }
}
@media (max-width: 992px) {
  .category-list {
    display: none;
  }
}
</style>
<script>
import ProductCard from '@/components/ProductCard.vue';
import DetailCard from '@/components/ProductCardDetail.vue';
import Collapse from 'bootstrap/js/dist/collapse';
import routeToFn from '@/methods/routeToFn';

export default {
  components: { ProductCard, DetailCard },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      displayMode: 'grid',
      sortBy: 'dateN2O',
      // mounted 要準備好
      allProducts: [],
      comicTags: [],
      lightNovelTags: [],
      novelTags: [],
      nonfictionTags: [],
      // 當下狀況
      tempProducts: [],
      tempSearchQuery: {
        tempCategoryCN: '',
        ps: '',
      },
      tempPublisherList: [],
      tempAuthorList: [],
      favorArr: JSON.parse(localStorage.getItem('favor')) || [],
    };
  },

  watch: {
    'window.width': function () {
      if (this.window.width <= 768) {
        this.displayMode = 'grid';
      }
    },
    '$route.query': {
      handler: function () {
        this.tempSearchQuery = this.$route.query;

        // 分類標示
        if (this.$route.query.category === 'comic') {
          this.tempSearchQuery.categoryCN = '漫畫, ';
          if (this.$route.query.search === '') {
            this.tempSearchQuery.ps = '全部';
          }
        } else if (this.$route.query.category === 'lightNovel') {
          this.tempSearchQuery.categoryCN = '輕小說, ';
          if (this.$route.query.search === '') {
            this.tempSearchQuery.ps = '全部';
          }
        } else if (this.$route.query.category === 'novel') {
          this.tempSearchQuery.categoryCN = '一般小說, ';
          if (this.$route.query.search === '') {
            this.tempSearchQuery.ps = '全部';
          }
        } else if (this.$route.query.category === 'nonfiction') {
          this.tempSearchQuery.categoryCN = '實用書, ';
          if (this.$route.query.search === '') {
            this.tempSearchQuery.ps = '全部';
          }
        } else if (
          this.$route.query.search === '' &&
          this.$route.query.category === 'all'
        ) {
          this.tempSearchQuery.categoryCN = '全部 ';
        }
        // 備註
        if (this.tempSearchQuery.isPopular) {
          this.tempSearchQuery.ps = '熱門';
        } else if (this.tempSearchQuery.isOnSale) {
          this.tempSearchQuery.ps = '特價';
        }
        // tag, author, publisher
        if (this.tempSearchQuery.tag) {
          this.tempSearchQuery.ps = this.tempSearchQuery.tag;
        } else if (this.tempSearchQuery.publisher) {
          this.tempSearchQuery.ps = this.tempSearchQuery.publisher;
        } else if (this.tempSearchQuery.author) {
          this.tempSearchQuery.ps = this.tempSearchQuery.author;
        }
        window.scroll({ top: 0 });
      },
      immediate: true,
    },
  },
  computed: {
    filteredProducts() {
      let filteredResult = [];
      // 篩選種類
      this.filterByCategory(this.allProducts, this.tempSearchQuery.category);
      // 拆解搜尋條件
      if (this.$route.query.search === '') {
        if (this.$route.query.isPopular) {
          filteredResult = this.matchPopularOrOnsale(this.tempProducts, true);
        } else if (this.$route.query.isOnSale) {
          filteredResult = this.matchPopularOrOnsale(
            this.tempProducts,
            false,
            true,
          );
        } else if (this.$route.query.tag) {
          filteredResult = this.matchTags(
            this.tempProducts,
            this.$route.query.tag,
          );
        } else if (this.$route.query.publisher) {
          filteredResult = this.matchPublisher(
            this.tempProducts,
            this.$route.query.publisher,
          );
        } else if (this.$route.query.author) {
          filteredResult = this.matchAuthor(
            this.tempProducts,
            this.$route.query.author,
          );
        } else {
          filteredResult = this.tempProducts;
        }

        // 搜尋欄有東西
      } else {
        this.sortBy = 'correlation';
        const newSearch = this.$route.query.search
          .trim()
          .toLowerCase()
          .replace(/\(/g, '\\(')
          .replace(/\)/g, '\\)');

        this.tempSearchQuery.searchArr = newSearch.split(' ');
        this.tempSearchQuery.searchArr.splice(0, 0, newSearch);

        filteredResult = this.filterFn(
          this.tempProducts,
          this.tempSearchQuery.searchArr,
        );
      }
      // 篩選搜尋結果

      // list publisher & authors
      this.tempPublisherList = this.listAllPublisher(filteredResult);
      this.tempAuthorList = this.listAllAuthor(filteredResult);

      const finalFilteredResult = [...new Set(filteredResult)];

      //sortBy
      let sortedResult = [];
      if (this.sortBy === 'correlation') {
        sortedResult = finalFilteredResult;
      } else if (this.sortBy === 'dateN2O') {
        sortedResult = this.sortByDate(finalFilteredResult);
      } else if (this.sortBy === 'dateO2N') {
        sortedResult = this.sortByDate(finalFilteredResult).reverse();
      } else if (this.sortBy === 'priceH2L') {
        sortedResult = this.sortByPrice(finalFilteredResult);
      } else if (this.sortBy === 'priceL2H') {
        sortedResult = this.sortByPrice(finalFilteredResult).reverse();
      } else if (this.sortBy === 'nameA2Z') {
        sortedResult = this.sortByName(finalFilteredResult);
      } else if (this.sortBy === 'nameZ2A') {
        sortedResult = this.sortByName(finalFilteredResult).reverse();
      }

      return sortedResult;
    },
  },
  methods: {
    // watch window size
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },

    // get product
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          const productsArr = Object.values(res.data.products);

          this.allProducts = productsArr;

          // tags 提取
          this.comicTags = this.categoryAllTags(this.allProducts, 'comic');
          this.lightNovelTags = this.categoryAllTags(
            this.allProducts,
            'lightNovel',
          );
          this.novelTags = this.categoryAllTags(this.allProducts, 'novel');
          this.nonfictionTags = this.categoryAllTags(
            this.allProducts,
            'nonfiction',
          );
        }
      });
    },

    //list category all tags, publishers, and authors
    categoryAllTags(productArr, tempCategory) {
      const tagsList = [];
      const tempProductsList = productArr.filter((item) => {
        return item.category === tempCategory;
      });
      if (tempProductsList.length == 0) {
        console.error('wrong category');
      }
      tempProductsList.forEach((item) => {
        tagsList.push(...item.tags);
      });
      const finalTagsList = [...new Set(tagsList)];
      return finalTagsList;
    },
    listAllPublisher(productArr) {
      const publisherList = [];
      productArr.forEach((item) => {
        publisherList.push(item.publisher);
      });
      const finalPublisherList = [...new Set(publisherList)];
      return finalPublisherList;
    },
    listAllAuthor(productArr) {
      const authorList = [];
      productArr.forEach((item) => {
        authorList.push(...item.author);
      });
      const finalAuthorList = [...new Set(authorList)];
      return finalAuthorList;
    },

    // filter Fn
    filterByCategory(products, tempCategory) {
      if (tempCategory === 'all') {
        this.tempProducts = [...products];
      } else {
        this.tempProducts = products.filter(
          (item) => item.category === tempCategory,
        );
      }
    },
    //search filter 組合包
    filterFn(allProductList, search) {
      const filterResult = [];
      if (search) {
        const searchConditions = [...search];
        // match name
        searchConditions.forEach((condition) => {
          const matchTitleList = this.matchName(allProductList, condition);
          filterResult.push(...matchTitleList);
        });
        // match series
        searchConditions.forEach((condition) => {
          const matchSeriesList = this.matchSeries(allProductList, condition);
          filterResult.push(...matchSeriesList);
        });
        // match author
        searchConditions.forEach((condition) => {
          const matchAuthorList = this.matchAuthor(allProductList, condition);
          filterResult.push(...matchAuthorList);
        });
        // match publisher
        searchConditions.forEach((condition) => {
          const matchPublisherList = this.matchPublisher(
            allProductList,
            condition,
          );
          filterResult.push(...matchPublisherList);
        });
        // match tags
        if (filterResult.length == 0) {
          searchConditions.forEach((condition) => {
            const matchTagsList = this.matchTags(allProductList, condition);
            filterResult.push(...matchTagsList);
          });
        }
      }

      return filterResult;
    },
    matchName(list, title) {
      const match = list.filter((item) => {
        item.title.trim().toLowerCase();

        return item.title.match(title);
      });
      return match;
    },
    matchSeries(list, series) {
      const match = list.filter((item) => {
        return item.series.trim().toLowerCase().match(series);
      });
      return match;
    },
    matchAuthor(list, author) {
      const nAuthor = author.toLowerCase();
      const match = list.filter((item) => {
        return item.author.join().trim().toLowerCase().match(nAuthor);
      });
      return match;
    },
    matchPublisher(list, publisher) {
      const nPublisher = publisher.toLowerCase();
      const match = list.filter((item) => {
        return item.publisher.toLowerCase().match(nPublisher);
      });
      return match;
    },
    matchTags(list, tag) {
      const match = list.filter((item) => {
        return item.tags.join().trim().toLowerCase().match(tag);
      });
      return match;
    },
    matchPopularOrOnsale(list, isPopular, isOnSale) {
      let match = [];
      if (isPopular) {
        match = list.filter((item) => item.is_popular === true);
      } else if (isOnSale) {
        match = list.filter((item) => item.price < item.origin_price);
      }
      return match;
    },
    // 分類區連結fn
    routeToFn,

    // Sort Fn
    // sort by date N2O
    sortByDate(Arr) {
      const tempArr = [...Arr];
      tempArr.sort((a, b) => {
        if (a.pub_date > b.pub_date) return -1;
        if (a.pub_date < b.pub_date) return 1;
        return 0;
      });
      return tempArr;
    },
    // sort by price H2L
    sortByPrice(Arr) {
      const tempArr = [...Arr];
      tempArr.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
      });
      return tempArr;
    },
    // sort by name A2Z
    sortByName(Arr) {
      const tempArr = [...Arr];
      tempArr.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      return tempArr;
    },
  },
  created() {
    // 偵測螢幕大小變化
    window.addEventListener('resize', this.handleResize);
    this.handleResize;
    // collapse
    const collapseElementList = document.querySelectorAll('.collapse');
    const collapseList = [...collapseElementList].map(
      (collapseEl) => new Collapse(collapseEl),
    );

    // get products
    this.getProducts();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {},
};
</script>
