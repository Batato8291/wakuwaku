<template>
  <div class="container">
    <div class="row carousel-container">
      <!-- 左側選單 -->
      <div class="col-lg-3 px-3 carousel-left-menu">
        <div class="list-group carousel-list">
          <!-- ---- -->
          <div
            class="list-group-item carousel-list-item"
            @mouseenter="addShow"
            @mouseleave="removeShow"
          >
            <ul class="dropdown-list-cus">
              <li class="col-4" @click="routeToFn('comic')">
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=comic"
                  >全部</router-link
                >
              </li>
              <li
                class="col-4"
                @click="routeToFn('comic', false, false, false, true)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=comic&isPopular=true"
                  >熱門</router-link
                >
              </li>
              <li
                class="col-4"
                @click="routeToFn('comic', false, false, false, false, true)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=comic&isOnSale=true"
                  >特價</router-link
                >
              </li>
              <li
                class="col-4"
                v-for="(tag, i) in tagsList.comicTags"
                :key="i"
                @click="routeToFn('comic', tag)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  :to="`/search?search=&category=comic&tag=${tag}`"
                  >{{ tag }}</router-link
                >
              </li>
            </ul>
            <a class="carousel-list-title text-break"
              >漫畫 | Comic<span><i class="fa-solid fa-angles-right"></i></span>
            </a>
          </div>

          <div
            class="list-group-item carousel-list-item"
            @mouseenter="addShow"
            @mouseleave="removeShow"
          >
            <a class="carousel-list-title text-break"
              >輕小說 | LightNovel<span
                ><i class="fa-solid fa-angles-right"></i></span
            ></a>
            <ul class="dropdown-list-cus">
              <li class="col-4" @click="routeToFn('lightNovel')">
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=lightNovel"
                  >全部</router-link
                >
              </li>
              <li
                class="col-4"
                @click="routeToFn('lightNovel', false, false, false, true)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=lightNovel&isPopular=true"
                  >熱門</router-link
                >
              </li>
              <li
                class="col-4"
                @click="
                  routeToFn('lightNovel', false, false, false, false, true)
                "
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=lightNovel&isOnSale=true"
                  >特價</router-link
                >
              </li>

              <li
                class="col-4"
                v-for="(tag, i) in tagsList.lightNovelTags"
                :key="i"
                @click="routeToFn('lightNovel', tag)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  :to="`/search?search=&category=lightNovel&tag=${tag}`"
                  >{{ tag }}</router-link
                >
              </li>
            </ul>
          </div>

          <div
            class="list-group-item carousel-list-item"
            @mouseenter="addShow"
            @mouseleave="removeShow"
          >
            <a class="carousel-list-title text-break"
              >一般小說 | Novel<span
                ><i class="fa-solid fa-angles-right"></i></span
            ></a>
            <ul class="dropdown-list-cus">
              <li class="col-4" @click="routeToFn('novel')">
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=novel"
                  >全部</router-link
                >
              </li>
              <li
                class="col-4"
                @click="routeToFn('novel', false, false, false, true)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=novel&isPopular=true"
                  >熱門</router-link
                >
              </li>
              <li
                class="col-4"
                @click="routeToFn('novel', false, false, false, false, true)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=novel&isOnSale=true"
                  >特價</router-link
                >
              </li>

              <li
                class="col-4"
                v-for="(tag, i) in tagsList.novelTags"
                :key="i"
                @click="routeToFn('novel', tag)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  :to="`/search?search=&category=novel&tag=${tag}`"
                  >{{ tag }}</router-link
                >
              </li>
            </ul>
          </div>

          <div
            class="list-group-item carousel-list-item"
            @mouseenter="addShow"
            @mouseleave="removeShow"
          >
            <a class="carousel-list-title text-break"
              >實用中文書 | Nonfiction<span
                ><i class="fa-solid fa-angles-right"></i></span
            ></a>
            <ul class="dropdown-list-cus">
              <li class="col-4" @click="routeToFn('nonfiction')">
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=nonfiction"
                  >全部</router-link
                >
              </li>
              <li
                class="col-4"
                @click="routeToFn('nonfiction', false, false, false, true)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=nonfiction&isPopular=true"
                  >熱門</router-link
                >
              </li>
              <li
                class="col-4"
                @click="
                  routeToFn('nonfiction', false, false, false, false, true)
                "
              >
                <router-link
                  class="dropdown-list-item-cus"
                  to="/search?search=&category=nonfiction&isOnSale=true"
                  >特價</router-link
                >
              </li>

              <li
                class="col-4"
                v-for="(tag, i) in tagsList.nonfictionTags"
                :key="i"
                @click="routeToFn('nonfiction', tag)"
              >
                <router-link
                  class="dropdown-list-item-cus"
                  :to="`/search?search=&category=nonfiction&tag=${tag}`"
                  >{{ tag }}</router-link
                >
              </li>
            </ul>
          </div>
          <!-- 左側小圖 -->
          <router-link
            to="/search?search=&category=all"
            class="overflow-hidden mt-3 d-none d-xxl-inline text-center"
            style="max-height: 150px"
          >
            <img class="w-75" src="@/assets/img/home_side_img.png" alt="" />
          </router-link>
        </div>
      </div>
      <!-- 右側圖片 -->
      <div class="col-12 col-lg-8 px-2 mx-auto ms-lg-0">
        <div
          id="carouselExampleDark"
          class="carousel carousel-dark slide carousel-box"
          data-bs-ride="carousel"
          data-bs-touch="true"
          ref="carousel"
        >
          <!-- 底部按鈕 -->
          <div class="carousel-indicators">
            <button
              v-for="(article, i) in allArticles"
              :key="article.id"
              type="button"
              data-bs-target="#carouselExampleDark"
              :data-bs-slide-to="i"
              :aria-label="`Slide ${i}`"
              aria-current="true"
              class="indicator-btn"
              :class="{ active: i == 0 }"
              @click="changeSlide"
            ></button>
          </div>

          <!-- 內容圖片 -->
          <div class="carousel-inner">
            <div
              v-for="(article, index) in allArticles"
              :key="article.id"
              class="carousel-item"
              :class="{ active: index == 0 }"
              data-bs-interval="5000"
            >
              <router-link
                class="w-100"
                :to="
                  article.article_type === 'event'
                    ? `/article/${article.id}`
                    : article.campaignUrl
                "
              >
                <img :src="article.coverImg" class="w-100" alt="error" />
              </router-link>
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>

          <!-- 左右按鍵 -->
          <button
            class="carousel-control-prev invisible-btn"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next invisible-btn"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.invisible-btn {
  opacity: 0;
  transition: all 0.3s ease-in;
  &:hover {
    opacity: 1;
  }
}
.carousel-container {
  border-radius: 2px;
}
.carousel-indicators .indicator-btn {
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
.carousel-indicators .indicator-btn.active {
  background-color: rgb(245, 248, 248);
}

.carousel-list {
  border-radius: 0px;
  .carousel-list-item {
    display: inline-flex;
    position: relative;
    background-color: rgb(247, 197, 36);
    box-sizing: border-box;
    border: 5px solid white;
    transition: 0.05s linear;
    cursor: pointer;

    &:nth-child(2n) {
      background-color: rgb(247, 172, 87);
    }

    .carousel-list-title {
      text-decoration: none;
      font-weight: 600;
      font-size: 1.25rem;
      flex: 1 1 auto;
      color: rgb(255, 255, 255);
      span:last-child {
        float: right;
      }
    }
    .dropdown-list-cus {
      visibility: hidden;
      // max-height: 0px;
      transition: all 0.2s ease-in 0.2s;
      position: absolute;
      inset: 0 auto auto 100%;
      z-index: 1000;
      list-style: none;
      padding-left: 0;
      transform: translate(10px);
      opacity: 0;

      li {
        transition: all 0.1s linear;
        padding: 0.5rem 1rem;
        font-size: normal;
        font-weight: 600;
        width: 8rem;
        background-color: rgb(189, 189, 189);
        a {
          text-decoration: none;
          color: rgb(255, 255, 255);
        }
        &:hover {
          background-color: rgb(218, 218, 218);
          a {
            color: rgb(63, 63, 63);
          }
        }
      }
    }
  }

  .carousel-list-item.show {
    background-color: rgb(189, 189, 189);

    .dropdown-list-cus {
      display: block;
      visibility: visible;
      overflow: visible;
      height: auto;
      transform: translate(5px, 0);
      opacity: 1;
      box-shadow: -2px 2px 5px 0px rgba(107, 107, 107, 0.63);
    }
  }
}
@media screen and (max-width: 992px) {
  .carousel-left-menu {
    display: none;
  }
}

.carousel-box {
  min-height: 250px;
  max-height: 350px;
  overflow-y: hidden;
  height: 80vw;
}
@media screen and (min-width: 992px) {
  .carousel-box {
    max-height: 390px;
  }
}
</style>
<script>
import Carousel from 'bootstrap/js/dist/carousel';
import Dropdown from 'bootstrap/js/dist/dropdown';
import routeToFn from '@/methods/routeToFn';

export default {
  props: {
    tagsList: Object,
  },
  data() {
    return {
      carousel: {},
      carouselPics: [{ imgUrl: require('../assets/img/carouselImg1.jpg') }],
      imgUrl1: require('../assets/img/carouselImg2.jpg'),
      allArticles: [],
    };
  },
  methods: {
    changeSlide(event) {
      const slideNum = Number(
        event.target.attributes['data-bs-slide-to'].value,
      );
      this.carousel.to(slideNum);
    },
    addShow(event) {
      setTimeout(() => (event.target.className += ' show'), 0);
    },
    removeShow(event) {
      event.target.classList.remove('show');
    },
    routeToFn,

    async getAllArticles() {
      let articlesData = [];
      let next_page = true;
      let page = 1;
      while (next_page) {
        const res = await this.$http.get(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`,
        );
        articlesData = articlesData.concat(res.data.articles);
        next_page = res.data.pagination.has_next;
        page++;
      }
      this.allArticles = articlesData;
      console.log('all', this.allArticles);
    },
  },
  created() {
    this.getAllArticles();
  },
  mounted() {
    // carousel
    this.carousel = new Carousel(this.$refs.carousel);
    // dropdown
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = [...dropdownElementList].map((dropdownToggleEl) => {
      new Dropdown(dropdownToggleEl);
    });
  },
};
</script>
