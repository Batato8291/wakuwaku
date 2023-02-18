<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info sticky-top mb-3">
    <div class="container-fluid">
      <router-link
        class="navbar-brand fs-3 fw-bolder text-light d-flex text-decoration-none me-4"
        to="/home"
      >
        <h2>༼ つ◕_◕ ༽つ<small class="fs-5">BackStage</small></h2>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="articles"
              active-class="active"
              to="/adminboard/articles"
              >活動文章</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="products"
              active-class="active"
              to="/adminboard/products"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="coupons"
              active-class="active"
              to="/adminboard/coupons"
              >優惠券</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              aria-current="orders"
              to="/adminboard/orders"
              >訂單</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logOut">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <ToastMessages class="pe-3 mt-3 top-0 end-0"></ToastMessages>
  <router-view />
</template>
<script>
import emitter from '@/methods/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    ToastMessages,
  },

  provide() {
    return {
      emitter,
    };
  },
  methods: {
    logOut() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/adminboard/login');
        }
      });
    },
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      if (!res.data.success) {
        this.$router.push('/adminboard/login');
      }
    });
  },
};
</script>
