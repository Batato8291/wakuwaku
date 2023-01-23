<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="mx-3">
    <!-- <Loading :active="isLoading"></Loading> -->
    <div class="text-end">
      <button
        class="btn btn-primary col-1 me-5"
        @click="openArticleModal(true)"
      >
        <i class="fa-solid fa-plus"></i> 新增文章
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 300px">封面圖片</th>
          <th>文章種類</th>
          <th>名稱</th>
          <th>作者</th>
          <th>ID</th>
          <th>是否公開</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>
            <img
              v-if="item.coverImg"
              style="max-height: 100px"
              :src="item.coverImg"
              alt=""
            />
            <img
              v-else
              style="max-height: 100px"
              src="@/assets/img/Nopicsign.png"
              alt=""
            />
          </td>
          <td class="fw-bold fs-5">
            <span class="text-primary" v-if="item.article_type === 'event'"
              >活動</span
            >
            <span style="color: #18b16a" v-if="item.article_type === 'guide'"
              >導購</span
            >
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.id }}</td>
          <td>
            <span class="text-success fw-bolder" v-if="item.isPublic === true"
              >公開</span
            >
            <span class="text-muted fw-bolder" v-else>未公開</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openArticleModal(false, item.id)"
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
  <ArticleModal
    ref="articleModal"
    :is_new="isNew"
    :article="tempArticle"
    @update_article="updateArticle"
  ></ArticleModal>
  <DelModal
    ref="delModal"
    :item-title="tempArticle.title"
    :item-id="tempArticle.id"
    @delete-item="deleteArticle"
  ></DelModal>
</template>
<script>
import ArticleModal from '@/components/ArticleModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      articles: [],
      pageInfo: {},
      tempArticle: {
        title: 'No anything',
        id: 'No anything',
      },
      isNew: false,
      isLoading: false,
    };
  },
  components: { ArticleModal, DelModal },
  inject: ['emitter'],
  methods: {
    getArticles(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http.get(url).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.articles = res.data.articles;
          const { pagination } = res.data;
          this.pageInfo = {
            pageTotal: pagination.total_pages,
            currentPage: pagination.current_page,
            hasPrev: pagination.has_pre,
            hasNext: pagination.has_next,
          };
        }
      });
    },
    openArticleModal(isNew, id) {
      const articleComponent = this.$refs.articleModal;
      if (isNew) {
        this.isNew = isNew;
        this.tempArticle = {
          article_type: 'event',
          isPublic: false,
          content: '<p>請輸入文章內容</p>',
        };
        articleComponent.showModal();
      } else {
        this.isNew = isNew;
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
        this.$http.get(url).then((res) => {
          console.log(res);
          if (res.data.success) {
            const resArticle = res.data.article;
            this.tempArticle = { ...resArticle };
            articleComponent.showModal();
          }
        });
      }
    },
    // 更新文章
    updateArticle(item) {
      this.tempArticle = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        httpMethod = 'put';
      }
      const articleComponent = this.$refs.articleModal;
      this.$http[httpMethod](api, { data: this.tempArticle }).then((res) => {
        console.log(res);
        articleComponent.hideModal();
        this.getArticles();
        this.$httpMessageState(res, '更新文章');
      });
    },
    // 刪除
    openDelModal(item) {
      this.tempArticle = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    // 刪除
    deleteArticle(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      const delComponent = this.$refs.delModal;
      this.isLoading = true;
      this.$http.delete(api).then((res) => {
        this.isLoading = false;
        console.log(res);
        delComponent.hideModal();
        this.getArticles();
        this.$httpMessageState(res, '刪除文章');
      });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
