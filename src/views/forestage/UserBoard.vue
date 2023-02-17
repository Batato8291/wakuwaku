<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>

  <Navbar :all-products="this.products" :tag-lists="this.tags"></Navbar>

  <router-view
    :filtered-list="this.filteredList"
    :tag-lists="this.tags"
    @temp-selection="changeSelection"
  />
  <!-- footer -->
  <footer>
    <div class="container-fluid homeFooter">
      <div class="justify-content-center d-flex">
        <router-link class="icon mt-4 bkStageBtn" to="/adminboard/login">
          <span class="tooltip">BackStage</span>
          <span><i class="fa-solid fa-warehouse text-white"></i></span>
        </router-link>
      </div>
      <p class="text-white text-center mt-0 mt-md-1">
        本網站僅供個人作品使用，不提供商業用途
      </p>
    </div>
  </footer>
  <ToastMessages class="end-0" style="top: 50px"></ToastMessages>
</template>
<style lang="scss" scoped>
.homeFooter {
  height: 120px;
  background-color: #f7b463;
  margin-top: 10rem;
}
//footer icon
.icon {
  border-style: none;
  position: relative;
  background: rgba(255, 255, 255, 0);
  border-radius: 50%;
  padding: 15px;
  margin: 10px;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  background: #ffffff;
  color: #ffffff;
  padding: 5px 8px;
  border-radius: 5px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.tooltip::before {
  position: absolute;
  content: '';
  height: 8px;
  width: 8px;
  background: #ffffff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
.icon:hover span,
.icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}
.bkStageBtn:hover,
.bkStageBtn:hover .tooltip,
.bkStageBtn:hover .tooltip::before {
  background: #e77c19;
  color: #ffffff;
}
</style>
<script>
import Navbar from '@/components/NavbarComponent.vue';
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
  },

  data() {
    return {
      products: {},
      tags: {},
      productsByDate: [],
      filteredProducts: [],
      tempSelection: 'comic',
    };
  },
  emits: ['temp-selection'],

  computed: {
    filteredList() {
      let tempList = this.filterByCategory(this.products, this.tempSelection);
      let latestProducts, popularProducts, onSaleProducts;
      latestProducts = tempList.slice(0, 11);
      popularProducts = tempList
        .filter((item) => item.is_popular === true)
        .slice(0, 11);
      onSaleProducts = tempList
        .filter((item) => item.origin_price - item.price > 0)
        .slice(0, 11);
      return {
        latestProducts: latestProducts,
        popularProducts: popularProducts,
        onSaleProducts: onSaleProducts,
      };
    },
  },

  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          const productsArr = Object.values(res.data.products);
          this.products = this.sortByDate(productsArr);
          // console.log('time', this.products);

          // tag 提取
          this.tags.comicTags = this.listTags(this.products, 'comic');
          this.tags.lightNovelTags = this.listTags(this.products, 'lightNovel');
          this.tags.novelTags = this.listTags(this.products, 'novel');
          this.tags.nonfictionTags = this.listTags(this.products, 'nonfiction');
        }
      });
    },
    sortByDate(Arr) {
      const tempArr = [...Arr];
      tempArr.sort((a, b) => {
        if (a.pub_date > b.pub_date) return -1;
        if (a.pub_date < b.pub_date) return 1;
        return 0;
      });
      return tempArr;
    },
    // list tags
    listTags(productArr, tempCategory) {
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
    filterByCategory(listArr, category) {
      const tempArr = Array.from(listArr);
      // all products of this category
      if (category === 'all') {
        return tempArr;
      } else {
        return tempArr.filter((item) => item.category === category);
      }
    },
    changeSelection(selected) {
      console.log('emit select', selected);
      this.tempSelection = selected;
    },
  },

  created() {
    this.getProducts();
  },
  mounted() {
    console.log(this.filteredList);
  },
};
</script>
