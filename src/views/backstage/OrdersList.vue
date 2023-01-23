<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <button class="btn btn-primary" @click="deleteAllOrders">deleteAll</button>
  <div class="container-fluid">
    <table class="table mt-4 ps-4">
      <thead>
        <tr>
          <th class="ps-3">建立時間</th>
          <th>訂單ID</th>
          <th>E-mail</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="ps-3">
            {{ new Date(order.create_at * 1000).toLocaleDateString() }}
          </td>
          <td>{{ order.id }}</td>
          <td>{{ order.user.email }}</td>
          <td>$ {{ Math.round(order.total + order.user.deliveryFee) }}</td>
          <td>
            <div class="form-check form-switch">
              <label class="form-check-label" for="paid">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="paid"
                  v-model="order.is_paid"
                  @change="updateOrder(order)"
                />
                <span class="text-success" v-if="order.is_paid">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openOrderModal(order)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelOrder(order)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <OrderModal ref="orderModal" :order="tempOrder"></OrderModal>
  <DelModal
    ref="delModal"
    :item-title="tempOrder.id"
    :item-id="tempOrder.id"
    @delete-item="deleteOrder"
  ></DelModal>
  <Pagination
    class="mt-5"
    :pages="pagination"
    @change-pages="changePages"
  ></Pagination>
</template>
<script>
import DelModal from '@/components/DelModal.vue';
import OrderModal from '@/components/OrderModal.vue';
import Pagination from '@/components/PaginationBar.vue';

export default {
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {
        currentPage: '',
        pageTotal: '',
      },
      isLoading: false,
    };
  },
  components: { DelModal, OrderModal, Pagination },
  inject: ['emitter'],
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      //   this.isLoading = true;
      this.$http.get(api).then((res) => {
        // this.isLoading = false;

        if (res.data.success) {
          console.log(res.data);
          this.orders = res.data.orders;
          if (res.data.pagination) {
            this.pagination.currentPage = res.data.pagination.current_page;
            this.pagination.pageTotal = res.data.pagination.total_pages;
            console.log(this.pagination);
          }
        }
      });
    },
    openOrderModal() {
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    openDelOrder(item) {
      this.tempOrder = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    // 刪除訂單
    deleteOrder(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      const delComponent = this.$refs.delModal;
      //   this.isLoading = true;
      this.$http.delete(api).then((res) => {
        // this.isLoading = false;
        console.log(res);
        delComponent.hideModal();
        this.getOrders();
        // this.$httpMessageState(res, '刪除訂單');
      });
    },
    deleteAllOrders() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      this.$http.delete(api).then((res) => {
        console.log(res);
      });
    },
    updateOrder(order) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
      this.$http.put(api, { data: order }).then((res) => {
        console.log(res);
      });
    },
    openOrderModal(item) {
      this.tempOrder = { ...item };
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    changePages(page) {
      this.getOrders(page.currentPage);
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
