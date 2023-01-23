<template>
  <div class="container">
    <div class="swiperBox">
      <!-- swiper-item -->
      <swiper-item
        ref="mySwiper"
        class="products-swiper"
        :breakpoints="swiperOptions.breakpoints"
        :navigation="swiperOptions.navigation"
        :pagenation="{ type: 'fraction' }"
        :loop="true"
        :modules="modules"
      >
        <swiper-slide
          class="card_box"
          v-for="(product, i) in productsList"
          :key="product.id"
        >
          <h5>第{{ i + 1 }}個</h5>
          <product-card
            class="product-cards change"
            :product-info="product"
          ></product-card>
        </swiper-slide>
      </swiper-item>

      <!--control Btn -->
      <button
        class="swiperBtn_prev order-first me-lg-3"
        :class="`${listboxName}_prevBtn`"
      >
        <i class="fa-solid fa-circle-arrow-left"></i>
      </button>
      <button class="swiperBtn_next ms-lg-3" :class="`${listboxName}_nextBtn`">
        <i class="fa-solid fa-circle-arrow-right"></i>
      </button>
    </div>
  </div>
</template>
<style lang="scss">
.swiperBox {
  display: flex;

  button:hover {
    color: rgb(241, 170, 38);
  }
}
button.swiperBtn_next,
button.swiperBtn_prev {
  display: block;
  font-size: 40px;
  color: rgb(180, 170, 158);
  top: 50%;
  border-style: none;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
}
button.swiperBtn_next {
  right: 0;
}
button.swiperBtn_prev {
  left: 0;
}
@media (max-width: 992px) {
  button.swiperBtn_next,
  button.swiperBtn_prev {
    display: none;
  }
}

.swiper-slide {
  margin: 20px;
}

// 翻牌動畫
.product-cards.change {
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
</style>
<script>
// import required modules
import { Pagination, Navigation } from 'swiper';
import ProductCard from './ProductCard.vue';

export default {
  components: { ProductCard },
  props: {
    listboxName: String,
    productsList: Array,
  },

  data() {
    return {
      modules: [Pagination, Navigation],
      swiperOptions: {
        navigation: {
          nextEl: `.swiperBtn_next.${this.listboxName}_nextBtn`,
          prevEl: `.swiperBtn_prev.${this.listboxName}_prevBtn`,
        },

        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          568: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 1,
          },
          992: {
            slidesPerView: 3.75,
            spaceBetween: 50,
            slidesPerGroup: 2,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 40,
            slidesPerGroup: 3,
            slidesPerGroupSkip: 2,
          },
        },
      },
      isChange: false,
    };
  },
  methods: {},
  mounted() {},
};
</script>
