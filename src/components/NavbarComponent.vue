<!-- eslint-disable max-len  -->
<template>
  <nav
    class="navbar navbar-light bg-gradient homeNbSet py-0 py-lg-2 mb-2 mb-sm-4"
  >
    <div class="container-fluid container-lg px-0 px-md-3">
      <!-- offcanvas 開關 -->
      <button
        class="navbar-toggler navbarBtn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#homeNavbar"
        aria-controls="homeNavbar"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
      <!-- Logo -->

      <router-link
        class="navbar-brand mt-1 mx-auto mx-lg-0 me-lg-auto"
        to="/home"
      >
        <h1 class="logo" id="logo">
          <span>W</span><span>a</span><span>k</span><span>u</span><span>W</span
          ><span>a</span><span>k</span><span>u</span><span>&nbsp;!</span>
        </h1>
      </router-link>

      <button
        class="btn smCartBtn"
        :class="{ 'carts-num': cartsLength != 0 }"
        :carts-length="cartsLength"
        @click="$router.push('/cart')"
      >
        <i class="fa-solid fa-cart-flatbed"></i>
      </button>

      <!-- search control -->
      <div
        class="d-flex justify-content-center mx-auto my-0 order-2 order-lg-0 col-10 col-lg-6"
        :class="{ hide: hideSearchBar }"
        id="search-bar"
      >
        <div class="search-group d-flex justify-content-center">
          <div class="search-input-group">
            <select
              class="form-select search-input-select"
              v-model="searchCategory"
            >
              <option value="all" selected>全部</option>
              <option value="comic">漫畫</option>
              <option value="lightNovel">輕小說</option>
              <option value="novel">一般小說</option>
              <option value="nonfiction">實用中文書</option>
            </select>
            <div class="search-input-text">
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Search input"
                aria-describedby="search-button"
                v-model.trim="this.search"
                @keydown="keyboardEvent"
              />
              <button
                class="search-clear-btn"
                title="Clear"
                v-if="search !== ''"
                @click="search = ''"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
              <ul
                class="auteComplete search-input-list"
                :class="autoComplete ? '' : 'd-none'"
              >
                <li
                  v-for="(item, i) in filterProducts"
                  :key="item.id"
                  :class="selectedIndex === i ? 'bg-selected-item' : ''"
                  @click="$router.push(`/product/${item.id}`), (search = '')"
                >
                  <p class="m-0">{{ item.title }}</p>
                </li>
              </ul>
            </div>
          </div>
          <button
            class="btn btn-outline-secondary search-input-btn"
            type="button"
            id="search-button"
            @click="searchProduct"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div class="cover_banner"></div>
      <div class="nbList">
        <ul class="nbList-ul">
          <!-- <li class="">
            <router-link class="btn btn-lg" to="/user/products">
              <i class="fa-solid fa-magnifying-glass"></i>
            </router-link>
          </li> -->
          <li class="nbList-li">
            <button
              class="btn btn-lg nbList-li-btn"
              @click="$router.push('/login')"
            >
              <i class="fa-regular fa-circle-user"></i>
            </button>
          </li>
          <li class="nbList-li">
            <button
              class="btn btn-lg nbList-li-btn"
              @click="$router.push('/favors')"
            >
              <i class="fa-regular fa-heart"></i>
            </button>
          </li>
          <li class="nbList-li">
            <button
              class="btn btn-lg nbList-li-btn cart-btn"
              :class="{ 'carts-num': cartsLength != 0 }"
              :carts-length="cartsLength"
              @click="$router.push('/cart')"
            >
              <i class="fa-solid fa-cart-flatbed"></i>
            </button>
          </li>
        </ul>
      </div>

      <!-- 滑出的抽屜頁 offcanvas -->
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="homeNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        ref="offcanvas"
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close btn-lg"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <!-- 抽屜頁Body -->
        <div class="offcanvas-body ms-lg-auto p-2">
          <ul class="navbar-nav justify-content-start pe-3 ms-1 offcanvas-list">
            <li class="nav-item">
              <router-link
                class=""
                to=""
                @click="routeToFn('all'), offcanvas.hide()"
              >
                <span class="nav-item-icon"
                  ><i class="fa-regular fa-face-smile"></i>
                </span>
                全部商品
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class=""
                to=""
                @click="
                  routeToFn('all', false, false, false, true), offcanvas.hide()
                "
              >
                <span class="nav-item-icon"
                  ><i class="fa-solid fa-arrow-trend-up"></i>
                </span>
                人氣熱門
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class=""
                to=""
                @click="
                  routeToFn('all', false, false, false, false, true),
                    offcanvas.hide()
                "
              >
                <span class="nav-item-icon"
                  ><i class="fa-solid fa-arrows-down-to-line"></i>
                </span>
                現在特價
              </router-link>
            </li>

            <li class="nav-item">
              <a
                class="nav-link dropdown-toggle"
                id="offcanvasNavbarDropdown2"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                aria-expanded="false"
              >
                <span class="nav-item-icon"
                  ><i class="fa-solid fa-book"></i
                ></span>
                漫畫分類
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="offcanvasNavbarDropdown2"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('comic'), offcanvas.hide()"
                    ><i class="fa-solid fa-angles-right"></i>
                    全部漫畫
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('comic', false, false, false, true),
                        offcanvas.hide()
                    "
                  >
                    <i class="fa-solid fa-angles-right"></i>
                    熱門漫畫
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('comic', false, false, false, false, true),
                        offcanvas.hide()
                    "
                    ><i class="fa-solid fa-angles-right"></i>
                    特價漫畫
                  </router-link>
                </li>
                <li>
                  <hr />
                </li>
                <li
                  v-for="(tag, i) in tagLists.comicTags"
                  :key="`comic_tag-${i}`"
                >
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('comic', tag), offcanvas.hide()"
                    ><i class="fa-solid fa-hashtag"></i> {{ tag }}</router-link
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <a
                class="nav-link dropdown-toggle"
                id="offcanvasNavbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                aria-expanded="false"
                ><span class="nav-item-icon"
                  ><i class="fa-solid fa-book-journal-whills"></i>
                </span>
                輕小說分類
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="offcanvasNavbarDropdown2"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('lightNovel'), offcanvas.hide()"
                    ><i class="fa-solid fa-angles-right"></i>
                    全部輕小說
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('lightNovel', false, false, false, true),
                        offcanvas.hide()
                    "
                  >
                    <i class="fa-solid fa-angles-right"></i>
                    熱門輕小說
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('lightNovel', false, false, false, false, true),
                        offcanvas.hide()
                    "
                    ><i class="fa-solid fa-angles-right"></i>
                    特價輕小說
                  </router-link>
                </li>
                <li>
                  <hr />
                </li>

                <li
                  v-for="(tag, i) in tagLists.lightNovelTags"
                  :key="`lightNovel_tag-${i}`"
                >
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('lightNovel', tag), offcanvas.hide()"
                    ><i class="fa-solid fa-hashtag"></i> {{ tag }}</router-link
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <a
                class="nav-link dropdown-toggle"
                id="offcanvasNavbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                aria-expanded="false"
                ><span class="nav-item-icon"
                  ><i class="fa-solid fa-book-bookmark"></i
                ></span>
                一般小說分類
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="offcanvasNavbarDropdown2"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('novel'), offcanvas.hide()"
                    ><i class="fa-solid fa-angles-right"></i>
                    全部一般小說
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('novel', false, false, false, true),
                        offcanvas.hide()
                    "
                  >
                    <i class="fa-solid fa-angles-right"></i>
                    熱門一般小說
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('novel', false, false, false, false, true),
                        offcanvas.hide()
                    "
                    ><i class="fa-solid fa-angles-right"></i>
                    特價一般小說
                  </router-link>
                </li>
                <li>
                  <hr />
                </li>

                <li
                  v-for="(tag, i) in tagLists.novelTags"
                  :key="`novel_tag-${i}`"
                >
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('novel', tag), offcanvas.hide()"
                    ><i class="fa-solid fa-hashtag"></i> {{ tag }}</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a
                class="nav-link dropdown-toggle"
                id="offcanvasNavbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
                aria-expanded="false"
                ><span class="nav-item-icon"
                  ><i class="fa-solid fa-book-atlas"></i
                ></span>
                實用書分類
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="offcanvasNavbarDropdown2"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('nonfiction'), offcanvas.hide()"
                    ><i class="fa-solid fa-angles-right"></i>
                    全部實用書
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('nonfiction', false, false, false, true),
                        offcanvas.hide()
                    "
                  >
                    <i class="fa-solid fa-angles-right"></i>
                    熱門實用書
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="
                      routeToFn('nonfiction', false, false, false, false, true),
                        offcanvas.hide()
                    "
                    ><i class="fa-solid fa-angles-right"></i>
                    特價實用書
                  </router-link>
                </li>
                <li>
                  <hr />
                </li>

                <li
                  v-for="(tag, i) in tagLists.nonfictionTags"
                  :key="`nonfiction_tag-${i}`"
                >
                  <router-link
                    class="dropdown-item"
                    to=""
                    @click="routeToFn('nonfiction', tag), offcanvas.hide()"
                    ><i class="fa-solid fa-hashtag"></i> {{ tag }}</router-link
                  >
                </li>
              </ul>
            </li>
            <hr class="bg-dark" />
            <li class="nav-item">
              <router-link class="" to="/favors" @click="offcanvas.hide()">
                <span class="nav-item-icon"
                  ><i class="fa-regular fa-heart"></i
                ></span>
                查看收藏
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class=""
                to=""
                @click="$router.push('/login'), offcanvas.hide()"
              >
                <span class="nav-item-icon">
                  <i class="fa-regular fa-circle-user"></i
                ></span>
                個人頁面
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Signika:700,300,600);

/* Navbar color setting */
.homeNbSet {
  box-shadow: 0 0 10px rgba(197, 197, 197, 0.938);
  position: sticky;
  top: 0;
  background-color: rgba(255, 252, 248, 0.973);
  z-index: 1030;
  .container-fluid {
    position: relative;
  }
}

/* sm navbar-list setting */
.navbarBtn,
.smCartBtn {
  font-size: 1.25rem;
  padding: 0.25rem 0.75rem;
  border: none;
  color: rgb(236, 124, 18);
  &:focus {
    box-shadow: none;
  }
}

@media (min-width: 992px) {
  .navbarBtn,
  .smCartBtn {
    display: none;
  }
}
@media (max-width: 992px) {
  .nbList {
    display: none;
  }
}

.nbList-ul {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin-bottom: 0;
}

/* logo setting */
#logo {
  font: bold 50px/20px 'Signika', sans-serif;
  user-select: none;
}

@media (max-width: 540px) {
  #homeNavbar {
    min-width: 70%;
  }
  #logo {
    font: bold 40px/30px 'Signika';
  }
}

@media (min-width: 541px) and (max-width: 992px) {
  #logo {
    font: bold 45px/30px 'Signika';
  }
  #homeNavbar {
    min-width: 40%;
  }
}

.logo span {
  display: inline-block;
  animation: float 0.8s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: none;
  }
  33% {
    transform: translateY(-1px) rotate(-2deg);
  }
  66% {
    transform: translateY(1px) rotate(2deg);
  }
}
nav:hover span {
  animation: bounce 0.87s;
}
@keyframes bounce {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: rotateX(20deg) translateY(2px) rotate(-3deg);
  }
  50% {
    transform: translateY(-20px) rotate(3deg) scale(1.1);
  }
}
.logo span:nth-child(4n) {
  color: hsl(42, 90%, 60%);
  text-shadow: 0.4px 0.4px hsl(42, 75%, 45%), 0.8px 0.8px hsl(42, 45%, 45%),
    1.2px 1.2px hsl(42, 45%, 45%), 1.6px 1.6px hsl(42, 75%, 45%);
}
.logo span:nth-child(4n-1) {
  color: hsl(46, 90%, 60%);
  text-shadow: 0.4px 0.4px hsl(46, 70%, 50%), 0.8px 0.8px hsl(46, 70%, 50%),
    1.2px 1.2px hsl(46, 70%, 50%), 1.6px 1.6px hsl(46, 70%, 50%);
}
.logo span:nth-child(4n-2) {
  color: hsl(52, 90%, 60%);
  text-shadow: 0.4px 0.4px hsl(52, 70%, 50%), 0.8px 0.8px hsl(52, 70%, 50%),
    1.2px 1.2px hsl(52, 70%, 50%), 1.6px 1.6px hsl(52, 70%, 50%);
}
.logo span:nth-child(4n-3) {
  color: hsl(28, 90%, 60%);
  text-shadow: 0.4px 0.4px hsl(28, 70%, 50%), 0.8px 0.8px hsl(28, 70%, 50%),
    1.2px 1.2px hsl(28, 70%, 50%), 1.6px 1.6px hsl(28, 70%, 50%);
}
.logo span:nth-child(2) {
  animation-delay: 0.05s;
}
.logo span:nth-child(3) {
  animation-delay: 0.1s;
}
.logo span:nth-child(4) {
  animation-delay: 0.15s;
}
.logo span:nth-child(5) {
  animation-delay: 0.2s;
}
.logo span:nth-child(6) {
  animation-delay: 0.25s;
}
.logo span:nth-child(7) {
  animation-delay: 0.3s;
}
.logo span:nth-child(8) {
  animation-delay: 0.35s;
}
.logo span:nth-child(9) {
  animation-delay: 1s;
}

/* search 欄 */
.search-input-group {
  display: flex;
  width: 500px;
  border-radius: 30px;
  border: 1px solid #ced4da;

  &:focus-within {
    border-color: hsl(28, 82%, 74%);
  }

  .search-input-select {
    width: 35%;
    border: none;
    font-size: 0.8rem;
    padding-left: 1rem;
    color: rgb(59, 59, 59);
    border-radius: 30px 0 0 30px;

    &:focus {
      box-shadow: none;
    }
  }

  .search-input-text {
    width: 100%;
    position: relative;
    display: flex;
    & > input {
      border-radius: 0 30px 30px 0;
      border: none;
      &:focus {
        box-shadow: none;
      }
    }
    .search-clear-btn {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      padding: 0;
      background-color: transparent;
    }

    .search-input-list {
      position: absolute;
      width: 95%;
      top: 2.5rem;
      background-color: rgb(255, 255, 255);
      list-style-type: none;
      padding: 0;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.281);

      & > li {
        line-height: 30px;
        padding-left: 5px;
        cursor: pointer;
        &:hover {
          background-color: rgb(235, 235, 235);
        }
      }
    }
  }
}
.bg-selected-item {
  background-color: rgb(235, 235, 235);
}

.search-input-btn {
  /* color: darkorange; */
  border-radius: 50%;
  border: 1px solid #ced4da;
  margin-left: 5px;
}
.search-input-btn:hover {
  background-color: hsl(28, 82%, 74%);
  border-color: hsl(28, 82%, 74%);
}
.search-input-btn:focus {
  box-shadow: none;
  background-color: hsl(28, 82%, 74%);
}

// navbar 選項
.nbList-li {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-in;
  margin: 0px 0.2rem;
  .nbList-li-btn {
    border: none;
  }
  &:hover {
    color: white;
    background-color: hsl(28, 82%, 74%);
  }
}

// 抽屜頁 offcavas
.offcanvas-list {
  .nav-item {
    padding: 0.25rem 0.5rem;
    a {
      padding: 0;
      text-decoration: none;
      color: rgb(54, 54, 54);
      font-size: large;
      font-weight: 600;
      i {
        // min-width: 1.5rem;
      }
    }
  }
  .dropdown-menu {
    border: none;
    margin-left: 2rem;
    &.show {
      animation: 0.2s ease 0s listShow;
    }
    li {
      &:nth-child(n + 5) {
        background-color: antiquewhite;
      }
      &:nth-child(2n + 5) {
        background-color: rgb(255, 200, 149);
      }
    }
  }
}
@keyframes listShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.carts-num {
  position: relative;
  &::after {
    content: attr(carts-length);
    position: absolute;
    top: 5%;
    right: 10%;
    height: 20px;
    line-height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: rgba(236, 40, 40, 0.842);
    color: white;
    z-index: 1;
    text-align: center;
    vertical-align: center;
    font-size: 12px;
    font-weight: 800;
  }
}
#search-bar {
  position: relative;
}
@media screen and (max-width: 992px) {
  .homeNbSet {
    margin-bottom: 55px !important;
  }

  #search-bar {
    position: absolute;
    background-color: rgba(255, 252, 248, 0.904);
    padding: 0.5rem 0;
    width: 100%;
    top: 100%;
    left: 0;
    z-index: -1;
    transition: 0.3s all ease-out;

    &.hide {
      transform: translate3d(0, -100%, 0);
    }
    .search-group {
      width: 80%;
    }
  }
  .cover_banner {
    position: absolute;
    background-color: rgb(255, 252, 248);
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import Dropdown from 'bootstrap/js/dist/dropdown';
import routeToFn from '@/methods/routeToFn';
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      offcanvas: {},
      searchCategory: 'all',
      tempProductsList: [],
      hideSearchBar: false,
      lastScrollPos: 0,
      search: '',
      searchArr: [],
      autoComplete: false,
      selectedIndex: -1,
      carts: {},
      updatedCart: false,
    };
  },
  props: {
    allProducts: {
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
  computed: {
    filterProducts() {
      let filterResult = [];
      const keyword = this.search;
      filterResult = this.tempProductsList.filter((item) =>
        item.title.includes(keyword),
      );
      // console.log('filterResult');
      if (filterResult && filterResult.length <= 10) {
        return filterResult;
      } else {
        return filterResult.splice(0, 10);
      }
    },
    cartsLength() {
      return this.carts.length || 0;
    },
  },
  watch: {
    search() {
      if (!this.search) {
        this.autoComplete = false;
      } else {
        this.autoComplete = true;
      }
    },
    searchCategory: {
      handler() {
        if (this.searchCategory === 'all') {
          this.tempProductsList = Array.from(this.allProducts);
        } else {
          this.tempProductsList = this.allProducts.filter(
            (item) => item.category === this.searchCategory,
          );
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 分類區連結fn
    routeToFn,

    keyboardEvent(e) {
      //按鍵向上
      if (e.keyCode === 38) {
        if (this.selectedIndex >= 0) {
          this.selectedIndex--;
        }
        //按鍵向下
      } else if (e.keyCode === 40) {
        const lastIndex = this.filterProducts.length - 1;
        if (this.selectedIndex < lastIndex) {
          this.selectedIndex++;
        }
        // enter
      } else if (e.keyCode === 13) {
        if ((this.search !== '') & (this.selectedIndex === -1)) {
          this.searchProduct();
        } else {
          this.filterProducts.forEach((item, i) => {
            if (this.selectedIndex === i) {
              this.search = item.title;
              this.selectedIndex = -1;
            }
          });
        }
        //ESC
      } else if (e.keyCode === 27) {
        this.search = '';
        this.selectedIndex = -1;
      }
    },
    searchProduct() {
      if (this.search !== '') {
        this.$router.push({
          path: '/search',
          query: {
            category: this.searchCategory,
            search: this.search,
          },
        });
        this.search = '';
      } else {
        console.warn('search 沒東西');
      }
    },
    getCarts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.carts = res.data.data.carts;
      });
    },
    hideSearch() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }

      this.hideSearchBar =
        !this.search && currentScrollPosition > this.lastScrollPos
          ? true
          : false;
      this.lastScrollPos = currentScrollPosition;
    },
  },
  created() {
    this.getCarts();
    this.$emitter.on('cartsUpdate', () => {
      this.getCarts();
    });
  },
  mounted() {
    // offcanvas 實體
    this.offcanvas = new Offcanvas(this.$refs.offcanvas);
    // dorpdown
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = [...dropdownElementList].map(
      (dropdownToggleEl) => new Dropdown(dropdownToggleEl),
    );
    window.addEventListener('scroll', this.hideSearch);
  },
  unmounted() {
    window.removeEventListener('scroll', this.hideSearch);
  },
};
</script>
