<template>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <p>
            是否從購物車移除
            <span class="fw-bold text-danger">{{ itemTitle }}</span> ?
            <br />
            (移除後將無法恢復)
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button "
            class="btn esc-btn col-5 text-center"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button "
            class="btn del-btn col-5 text-center"
            @click="$emit('delete-item', itemId)"
          >
            移除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    display: flex;
    justify-content: center;
  }
}
.esc-btn {
  background-color: gray;
  color: white;
}
.del-btn {
  background-color: #f8a43e;
  color: white;
}
</style>
<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    itemTitle: {
      type: String,
      default() {
        return {};
      },
    },
    itemId: {
      type: String,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: '',
    };
  },
  mixins: [modalMixin],
};
</script>
