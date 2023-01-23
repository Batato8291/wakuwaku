<!-- eslint-disable vuejs-accessibility/label-has-for  -->
<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="productModal"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
      <div class="modal-content border-2">
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="productModalLabel">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label"
                  >輸入圖片網址
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempImgUrl"
                /></label>
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="fileInput"
                    @change="uploadFile"
                /></label>
              </div>
              <img class="img-fluid" :src="tempImgUrl" alt="" />
              <div class="mt-2">
                <button
                  @click="newImg"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  :disabled="tempImgUrl == ''"
                >
                  新增圖片 (建議 4:3)
                </button>
              </div>
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProduct.images">
                <div
                  v-for="(image, key) in tempProduct.images"
                  :key="key"
                  class="mb-3 input-group input-group-sm"
                >
                  <img class="img-fluid w-100" :src="image" alt="" />
                  <input
                    type="url"
                    class="form-control"
                    v-model="tempProduct.images[key]"
                    placeholder="請輸入連結"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.images.splice(key, 1)"
                  >
                    移除
                  </button>
                </div>
              </div>
            </div>
            <!-- modal右側 -->
            <div class="col-sm-8">
              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="series" class="form-label w-100"
                    >系列
                    <input
                      type="text"
                      class="form-control"
                      id="series"
                      placeholder="請輸入系列名稱"
                      v-model="tempProduct.series"
                  /></label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="title" class="form-label w-100"
                    >書名
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      placeholder="請輸入書名"
                      v-model="tempProduct.title"
                  /></label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="subtitle" class="form-label w-100"
                    >副標題
                    <input
                      type="text"
                      class="form-control"
                      id="subtitle"
                      placeholder="請輸入副標題"
                      v-model="tempProduct.subtitle"
                  /></label>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="publisher" class="form-label w-100"
                    >出版社<input
                      type="text"
                      class="form-control"
                      id="publisher"
                      placeholder="請輸入出版社"
                      v-model="tempProduct.publisher"
                  /></label>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-3">
                  <label for="author" class="form-label w-100"
                    >作者 (多位用","隔開)
                    <input
                      type="text"
                      class="form-control"
                      id="author"
                      placeholder="請輸入作者"
                      v-model="tempProduct.author"
                  /></label>
                </div>
                <div class="mb-3 col-md-3">
                  <label for="original_author" class="form-label w-100"
                    >原作
                    <input
                      type="text"
                      class="form-control"
                      id="original_author"
                      placeholder="請輸入原作者"
                      v-model="tempProduct.original_author"
                  /></label>
                </div>
                <div class="mb-3 col-md-3">
                  <label for="illustrator" class="form-label w-100"
                    >繪師
                    <input
                      type="text"
                      class="form-control"
                      id="illustrator"
                      placeholder="請輸入繪師"
                      v-model="tempProduct.illustrator"
                  /></label>
                </div>
                <div class="mb-3 col-md-3">
                  <label for="translator" class="form-label w-100"
                    >譯者
                    <input
                      type="text"
                      class="form-control"
                      id="translator"
                      placeholder="請輸入譯者"
                      v-model="tempProduct.translator"
                  /></label>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-3">
                  <label class="form-label w-100" for="category"
                    >分類
                    <select
                      class="form-select"
                      v-model="tempProduct.category"
                      id="category"
                    >
                      <option value="undefined" selected disabled hidden>
                        請選擇分類
                      </option>
                      <option value="comic">漫畫</option>
                      <option value="lightNovel">輕小說</option>
                      <option value="novel">文學小說</option>
                      <option value="nonfiction">一般書、其他</option>
                    </select>
                  </label>
                </div>
                <div class="mb-3 col-md-3">
                  <label for="pub_date" class="form-label w-100"
                    >出版日期
                    <input
                      type="date"
                      class="form-control"
                      id="pub_date"
                      v-model="pub_date"
                  /></label>
                </div>
                <div class="mb-3 col-md-2">
                  <label for="pages_num" class="form-label w-100"
                    >頁數
                    <input
                      type="number"
                      min="1"
                      class="form-control"
                      id="pages_num"
                      placeholder="頁數"
                      v-model="tempProduct.pages_num"
                  /></label>
                </div>
                <div class="mb-3 col-md-2">
                  <label class="form-label w-100" for="origin_price"
                    >原價
                    <input
                      type="number"
                      min="0"
                      class="form-control"
                      id="origin_price"
                      placeholder="原價"
                      v-model="tempProduct.origin_price"
                  /></label>
                </div>
                <div class="mb-3 col-md-2">
                  <label class="form-label w-100" for="price"
                    >售價
                    <input
                      type="number"
                      min="0"
                      class="form-control"
                      id="price"
                      placeholder="售價"
                      v-model="tempProduct.price"
                  /></label>
                </div>
              </div>

              <div class="mb-3" v-if="tempProduct.category">
                <label for="product_tags" class="form-label d-block"
                  >作品標籤</label
                >
                <div
                  class="form-check form-check-inline"
                  v-for="(tag, key) in tempTags"
                  :key="key"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="'Tag' + key"
                    :value="tag"
                    v-model="tempProduct.tags"
                  />
                  <label class="form-check-label" :for="'Tag' + key">{{
                    tag
                  }}</label>
                </div>
              </div>
              <hr />
              <!-- 簡介 -->
              <div class="mb-3 pe-3">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label for="des_short" class="form-label w-100"
                  >簡介 (50字內)
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  ref="testTx"
                  id="short_des"
                  placeholder="請輸入簡介"
                  style="min-height: 110px; overflow: hidden; resize: none"
                  v-model="tempProduct.des_short"
                  @input="txAutogrow"
                  @focus="txAutogrow"
                ></textarea>
              </div>
              <div class="mb-3 pe-3">
                <p>內容介紹</p>
                <ck-editor
                  @editor-content="editorDescription"
                  :content="tempProduct.description"
                ></ck-editor>
              </div>
              <div class="mb-3 pe-3">
                <p>作者簡介</p>
                <ck-editor
                  @editor-content="editorAuthorDes"
                  :content="tempProduct.author_des"
                ></ck-editor>
              </div>
              <div class="mb-3 d-flex">
                <div class="form-check">
                  <label class="form-check-label" for="is_enabled"
                    ><input
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                    />
                    是否啟用
                  </label>
                </div>
                <div class="form-check ms-5">
                  <label class="form-check-label" for="is_popular"
                    ><input
                      class="form-check-input"
                      type="checkbox"
                      id="is_popular"
                      v-model="tempProduct.is_popular"
                    />
                    是否熱門 (因為沒有實際銷售,以此模擬)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="splitAuthor(), $emit('update-product', tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from 'bootstrap/js/dist/modal';
import CkEditor from './CkEditorComponent.vue';

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  components: { CkEditor },
  watch: {
    product() {
      this.tempProduct = this.product;
      // 將時間格式改為 YYYY-MM-DD
      if (Object.prototype.hasOwnProperty.call(this.tempProduct, 'pub_date')) {
        const dateAndTime = new Date(this.tempProduct.pub_date * 1000)
          .toISOString()
          .split('T');
        // 依照T分成兩部份 解構賦予值
        [this.pub_date] = dateAndTime;
      }
      // 多圖範例
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
    pub_date() {
      this.tempProduct.pub_date = Math.floor(new Date(this.pub_date) / 1000);
    },
    'tempProduct.category': function (newValue) {
      if (newValue === 'comic') {
        this.tempTags = this.comicTags;
      } else if (newValue === 'lightNovel') {
        this.tempTags = this.lightNovelTags;
      } else if (newValue === 'novel') {
        this.tempTags = this.novelTags;
      } else if (newValue === 'nonfiction') {
        this.tempTags = this.nonfictionTags;
      }
    },
  },

  data() {
    return {
      modal: {},
      tempProduct: {
        category: undefined,
      },
      tempDes: '',
      pub_date: '',
      tempImgUrl: '',
      tempTags: [],
      comicTags: [
        '校園',
        '戀愛',
        '喜劇',
        '溫馨',
        '家庭',
        '職場',
        '百合',
        '友情',
        '科幻、奇幻',
        '穿越',
        '轉生',
        '冒險',
        '熱血',
        '搞笑',
        '懸疑',
        '推理',
        '音樂',
        '恐怖',
        '後宮',
        '私心推薦',
      ],
      lightNovelTags: [
        '校園',
        '青春',
        '戀愛',
        '喜劇',
        '溫馨',
        '家庭',
        '百合',
        '冒險',
        '奇幻',
        '科幻',
        '懸疑推理',
        '文學',
        '歷史',
        '武俠',
        '恐怖',
        '私心推薦',
      ],
      novelTags: [
        '文學',
        '科幻',
        '懸疑推理',
        '愛情',
        '歷史',
        '武俠',
        '恐怖',
        '私心推薦',
      ],
      nonfictionTags: [
        '社會人文',
        '哲學',
        '心靈勵志',
        '溝通',
        '商業理財',
        '個人規劃',
        '投資學',
        '經濟/趨勢',
        '人物傳記',
        '親子關係',
        '自然科學',
        '醫療常識',
        '語言學習',
        '私心推薦',
      ],
    };
  },
  methods: {
    showModal() {
      this.modal.show();
      this.tempImgUrl = '';
    },
    hideModal() {
      this.modal.hide();
    },
    txAutogrow() {
      const tx = document.querySelectorAll('textarea');
      const txArr = [...tx];
      txArr.forEach((item) => {
        if (item.value === '') {
          // eslint-disable-next-line no-param-reassign
          item.style.height = '110px';
        } else {
          // eslint-disable-next-line no-param-reassign
          item.style.height = `${item.scrollHeight}px`;
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      console.dir(formData);
      this.$http.post(url, formData).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.tempImgUrl = res.data.imageUrl;
        }
      });
    },
    newImg() {
      this.tempProduct.images.push(this.tempImgUrl);
      this.tempImgUrl = '';
    },
    splitAuthor() {
      if (typeof this.tempProduct.author === 'string') {
        const authorArr = this.tempProduct.author.split(',');
        this.tempProduct.author = authorArr;
      }
      if (typeof this.tempProduct.original_author === 'string') {
        const oriAuthorArr = this.tempProduct.original_author.split(',');
        this.tempProduct.original_author = oriAuthorArr;
      }
      if (typeof this.tempProduct.illustrator === 'string') {
        const illustratorArr = this.tempProduct.illustrator.split(',');
        this.tempProduct.illustrator = illustratorArr;
      }
      if (typeof this.tempProduct.translator === 'string') {
        const translatorArr = this.tempProduct.translator.split(',');
        this.tempProduct.translator = translatorArr;
      }
    },
    // 編輯器emit出的內容
    editorDescription(description) {
      this.tempProduct.description = description;
    },
    editorAuthorDes(des) {
      this.tempProduct.author_des = des;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
