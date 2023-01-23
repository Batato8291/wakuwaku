<template>
  <div class="modal fade" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除 {{ itemTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            是否刪除
            <span class="fw-bold text-danger">{{ itemTitle }}</span
            >?
            <br />
            (刪除後將無法恢復)。
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('delete-item', itemId)"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
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
