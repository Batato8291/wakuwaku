<template>
  <div class="container">
    <!-- progress bar -->
    <div>
      <p class="fs-1 fw-bold text-center" style="color: #faa11f">完成訂單</p>
      <div class="col-12 col-lg-10 mx-lg-auto">
        <ul class="multi-steps">
          <li class="active" id="progressbar_cart"><span>購物車</span></li>
          <li class="active" id="progressbar_order"><span>訂單資料</span></li>
          <li class="active" id="progressbar_check"><span>確認訂單</span></li>
          <li class="active" id="progressbar_done"><span>完成訂單</span></li>
        </ul>
      </div>
    </div>
    <!-- message -->
    <div>
      <div
        class="mb-1"
        style="min-height: 0.5rem; background-color: rgba(255, 173, 59, 0.856)"
      ></div>

      <div class="d-flex justify-content-center">
        <img src="@/assets/img/icon.png" alt="" />
      </div>
      <div class="px-3">
        <p class="fs-2 text-center">完成付款 !</p>
        <p class="fs-2 text-center">
          商品將於3日內寄出(不含假日)， 感謝您的購買。
        </p>
      </div>
      <div class="mt-4 d-flex justify-content-center done-btn-group">
        <router-link class="btn btn-warning me-3" to="/home"
          >返回首頁</router-link
        >
        <router-link
          class="btn ms-3 btn-outline-warning"
          to="/search?search=&category=all"
          >繼續購物</router-link
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.done-btn-group {
  a {
    border-radius: 3px;

    &:first-child {
      color: white;
      background-color: rgba(255, 173, 59, 0.856);
      &:hover {
        color: rgba(255, 173, 59, 0.856);
        background-color: white;
      }
      &:focus {
        color: rgba(255, 173, 59, 0.856);
        background-color: white;
        box-shadow: 0 0 0 0.25rem rgba(255, 173, 59, 0.856);
      }
    }
    &:last-child {
      color: rgba(255, 173, 59, 0.856);
      border-color: rgba(255, 173, 59, 0.856);
      &:hover {
        color: white;
        background-color: rgba(255, 173, 59, 0.856);
      }
      &:focus {
        color: white;
        background-color: rgba(255, 173, 59, 0.856);
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      id: '',
    };
  },
  methods: {
    getOrder(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http.get(api).then((res) => {
        if (
          res.data.success == false ||
          res.data.order == null ||
          res.data.order.is_paid === false
        ) {
          console.log('訂單錯物');
          this.$router.push(`/checkout/${id}`);
        } else {
          this.order = res.data.order;
          console.log(this.order);
        }
      });
    },
  },
  created() {
    // 取得 ID
    this.id = this.$route.params.orderId;
    // console.log(this.id);
    this.getOrder(this.id);
    // this.getAllOrder(1);
  },
};
</script>
