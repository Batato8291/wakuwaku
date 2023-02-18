<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div class="container-fluid">
    <div class="col-6">
      <button
        class="btn btn-outline-secondary btn-lg me-4 col-2"
        :class="isActive === 'all' ? 'active' : ''"
        @click="filterByCategory(this.products), (isActive = 'all')"
      >
        # All
      </button>
      <button
        class="btn btn-outline-secondary btn-lg me-4 col-2"
        :class="isActive === 'comic' ? 'active' : ''"
        @click="filterByCategory(this.products, 'comic'), (isActive = 'comic')"
      >
        # Comic
      </button>
      <button
        class="btn btn-outline-secondary btn-lg me-4 col-2"
        :class="isActive === 'lightNovel' ? 'active' : ''"
        @click="
          filterByCategory(this.products, 'lightNovel'),
            (isActive = 'lightNovel')
        "
      >
        # LightNovel
      </button>
      <button
        class="btn btn-outline-secondary btn-lg me-4 col-2"
        :class="isActive === 'novel' ? 'active' : ''"
        @click="filterByCategory(this.products, 'novel'), (isActive = 'novel')"
      >
        # Novel
      </button>
      <button
        class="btn btn-outline-secondary btn-lg me-4 col-2"
        :class="isActive === 'nonfiction' ? 'active' : ''"
        @click="
          filterByCategory(this.products, 'nonfiction'),
            (isActive = 'nonfiction')
        "
      >
        # Nonfiction
      </button>
    </div>
    <div class="text-end">
      <button
        class="btn btn-warning me-5"
        @click="hurryCreate(true, lastProduct)"
      >
        微 ‧ 加快生產 o'_'o
      </button>
      <button class="btn btn-primary me-5" @click="openModal(true)">
        增加一個產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="col-1">類別</th>
          <th class="col-2">縮圖</th>
          <th class="col-2">系列名稱</th>
          <th class="col-2">產品名稱</th>
          <th class="col-1">原價</th>
          <th class="col-1">售價</th>
          <th class="col-1">是否啟用</th>
          <th class="col-2">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in nowPageData" :key="item.id">
          <td class="fw-bolder">{{ item.category }}</td>
          <td>
            <img
              v-if="item.images"
              style="max-height: 150px"
              :src="item.images[0]"
              alt=""
            />
            <img
              v-else
              style="max-height: 150px"
              src="@/assets/img/Nopicsign.png"
              alt=""
            />
          </td>
          <td>{{ item.series }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-right">{{ $filters.currency(item.price) }}</td>
          <td>
            <span class="text-success fw-bolder" v-if="item.is_enabled"
              >啟用</span
            >
            <span class="text-danger fw-bolder" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pageInfo" @change-pages="pagination"></Pagination>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <DelModal
    ref="delModal"
    :item-title="tempProduct.title"
    :item-id="tempProduct.id"
    @delete-item="deleteProduct"
  ></DelModal>
</template>
<style lang="sass"></style>
<script>
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/PaginationBar.vue';

export default {
  data() {
    return {
      // 全部資料
      products: [],
      // category 過濾後的資料
      filteredProducts: [],
      // 該頁顯示的資料
      nowPageData: [],
      // 頁碼資訊
      pageInfo: {
        perPage: 10,
        pageTotal: 0,
        currentPage: 1,
        hasPrev: false,
        hasNext: false,
      },

      tempCategory: '',
      tempProduct: {
        title: '',
        id: '',
      },
      isNew: false,
      isLoading: false,
      isActive: 'all',
      lastProduct: {},
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  inject: ['emitter'],
  methods: {
    getProducts(category = 'all', tempPage = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.products = res.data.products;
          this.filterByCategory(this.products, category, tempPage);
        }
      });
    },
    filterByCategory(list, category, tempPage = 1) {
      const newArr = Object.values(list).reverse();
      if (!category || category === 'all') {
        this.filteredProducts = newArr;
        this.isActive = 'all';
      } else {
        this.filteredProducts = newArr.filter(
          (item) => item.category === category,
        );
        this.isActive = category;
      }
      this.pagination(tempPage);
    },
    updateProduct(item) {
      this.tempProduct = item;

      this.lastProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }

      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        productComponent.hideModal();
        this.getProducts(item.category, this.pageInfo.currentPage);
        this.$httpMessageState(res, '更新產品');
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {
          description: '<p>請輸入文章內容</p>',
          author_des: '<p>請輸入作者簡介</p>',
          unit: 'unit',
          tags: [],
          is_enabled: false,
        };
      } else {
        this.tempProduct = { ...item };
        if (!this.tempProduct.tags) {
          this.tempProduct.tags = [];
        }
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },

    hurryCreate(isNew, lastItem) {
      this.tempProduct = { ...lastItem };
      this.tempProduct.images = [];
      this.tempProduct.description = '';
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },

    // 刪除 Modal
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    deleteProduct(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      const delComponent = this.$refs.delModal;
      this.isLoading = true;
      this.$http.delete(api).then((res) => {
        this.isLoading = false;
        delComponent.hideModal();
        this.getProducts();
        this.$httpMessageState(res, '刪除產品');
      });
    },

    // 頁碼條
    pagination(nowPage, nowData = this.filteredProducts) {
      // 當前頁數，對應現在當前頁數
      let currentPage = nowPage;
      const dataTotal = nowData.length;
      const perpage = this.pageInfo.perPage;
      // page總數
      const pageTotal = Math.ceil(dataTotal / perpage);
      // 因為要避免當前頁數比總頁數還要多，假設今天總頁數是 3 筆，就不可能是4 或 5
      if (currentPage > pageTotal) {
        currentPage = pageTotal;
      }
      // 計算每頁開始的那項資料及最後一項，ex 第一頁從第1筆資料~第10筆資料
      const minData = currentPage * perpage - perpage + 1;
      const maxData = currentPage * perpage;
      // 先建立新陣列 => 該頁要顯示的項目
      const data = [];
      nowData.forEach((item, index) => {
        // 獲取陣列索引，但因為索引是從 0 開始所以要 +1
        const num = index + 1;
        if (num >= minData && num <= maxData) {
          data.push(item);
        }
      });
      // 用物件方式來傳遞資料
      const pageInfo = {
        perPage: perpage,
        pageTotal,
        currentPage,
        hasPrev: currentPage > 1,
        hasNext: currentPage < pageTotal,
      };
      this.nowPageData = data;
      this.pageInfo = pageInfo;
    },
    changePriceType(item) {
      item.origin_price = parseInt(item.origin_price);
      item.price = parseInt(item.price);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
