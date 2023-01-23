<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="articleModal"
    data-bs-backdrop="static"
    data-bs-focus="false"
    tabindex="-1"
    role="dialog"
    aria-labelledby="articleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="articleModalLabel">編輯文章</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- 左側 -->
            <div class="col-md-3 col-12">
              <div class="mb-1">
                <p class="mb-1 p-0">文章種類</p>
                <div class="d-flex justify-content-around">
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="article_type_1"
                      name="article_type"
                      value="event"
                      v-model="tempArticle.article_type"
                    />
                    <label for="article_type_1" class="form-check-label"
                      >活動 Event</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="article_type_2"
                      name="article_type"
                      value="guide"
                      v-model="tempArticle.article_type"
                    />
                    <label for="article_type_2" class="form-check-label"
                      >導購 Guide</label
                    >
                  </div>
                </div>
              </div>
              <div class="mb-1" v-if="tempArticle.article_type !== 'event'">
                <label for="campaign_url" class="form-label w-100"
                  >導購網址
                  <input
                    type="text"
                    class="form-control"
                    id="campaign_url"
                    placeholder="請輸入導購Url"
                    v-model="tempArticle.campaignUrl"
                    :disabled="tempArticle.article_type === 'event'"
                /></label>
              </div>
              <div class="mb-1">
                <label for="title" class="form-label w-100"
                  >名稱
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入文章名稱"
                    v-model="tempArticle.title"
                /></label>
              </div>
              <div class="mb-1">
                <label for="author" class="form-label w-100"
                  >作者
                  <input
                    type="text"
                    class="form-control"
                    id="author"
                    placeholder="請輸入作者"
                    v-model="tempArticle.author"
                /></label>
              </div>
              <div class="mb-1">
                <label for="cover_img" class="form-label w-100"
                  >封面圖片 (1300x400)
                  <div class="input-group">
                    <input
                      type="url"
                      class="form-control"
                      id="cover_img"
                      placeholder="圖片網址"
                      v-model="tempArticle.coverImg"
                    />
                    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
                    <input
                      type="file"
                      id="coverImgFile"
                      ref="coverImgFile"
                      style="display: none"
                      @change="uploadImg()"
                    />
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="this.$refs.coverImgFile.click()"
                    >
                      <i class="bi bi-file-earmark-arrow-up"></i>
                    </button></div
                ></label>
              </div>
              <div class="form-check ms-1 fs-5 fw-bold">
                <label class="form-check-label" for="is_public"
                  ><input
                    class="form-check-input"
                    type="checkbox"
                    id="is_public"
                    v-model="tempArticle.isPublic"
                  />
                  是否公開
                </label>
              </div>
            </div>

            <!-- 右側 -->
            <div class="col-md-9 col-12">
              <div class="d-flex justify-content-center">
                <img
                  :src="tempArticle.coverImg"
                  alt="請上傳圖片"
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <hr />
          <!-- 下方內容 -->
          <div class="col-md-12 mt-2">
            <p>文章內容 (導購不會顯示)</p>
            <ck-editor
              @editor-content="editorContent"
              :content="tempArticle.content"
            ></ck-editor>
            <p>預覽文章內容</p>
            <p>{{ tempArticle.content }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="emitArticle">
            更新文章
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
import CkEditor from '@/components/CkEditorComponent.vue';

export default {
  name: 'articleModal',
  mixins: [modalMixin],
  props: {
    is_new: Boolean,
    article: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['update_article'],
  data() {
    return {
      modal: {},
      tempArticle: {
        article_type: 'event',
        title: '',
        create_at: 0,
        author: '',
        isPublic: false,
        content: '',
        coverImg: '',
        campaignUrl: '',
      },
    };
  },

  components: { CkEditor },
  watch: {
    article() {
      this.tempArticle = this.article;
    },
    'tempArticle.article_type'() {
      if (this.tempArticle.article_type === 'event') {
        this.tempArticle.campaignUrl = '';
      }
    },
  },

  methods: {
    // 送出文章
    emitArticle() {
      if (this.is_new === true) {
        this.tempArticle.create_at = Math.floor(new Date().getTime() / 1000);
      }
      this.$emit('update_article', this.tempArticle);
      this.tempArticle = {
        article_type: '',
        title: '',
        create_at: 0,
        author: '',
        isPublic: false,
        content: '',
        coverImg: '',
        campaignUrl: '',
      };
      this.due_date = '';
    },
    uploadImg() {
      const uploadedFile = this.$refs.coverImgFile.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData).then((res) => {
        if (res.data.success) {
          console.log(res);
          this.tempArticle.coverImg = res.data.imageUrl;
        }
      });
    },
    //  編輯器emit出的內容
    editorContent(content) {
      this.tempArticle.content = content;
    },
  },
  // mounted() {
  //   console.log(this);
  // },
};
</script>

});
