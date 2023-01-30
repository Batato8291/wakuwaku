<template>
  <div class="container">
    <div v-if="article.article_type != 'guide'" class="jumping">
      Jumping off the page....
    </div>
    <h1>{{ article.title }}</h1>
    <p class="text-secondary mb-2" style="font-size: small">
      {{
        new Date(article.create_at * 1000).toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }}&emsp; 文：{{ article.author }}
    </p>

    <div class="campaign-img">
      <img :src="article.coverImg" alt="event picture" />
    </div>
    <div class="campaign-content" v-html="article.content"></div>
  </div>
</template>
<style lang="scss" scoped>
.jumping {
  text-align: center;
  font-size: 3rem;
  font-weight: 1000;
  width: 80%;
  height: 500px;
  background-color: aliceblue;
  color: orange;
}
.campaign-img {
  img {
    max-width: 80vw;
    object-fit: cover;
  }
}
.campaign-content {
  padding: 1rem 0.5rem;
}
</style>
<script>
export default {
  data() {
    return {
      id: '',
      article: {},
    };
  },
  methods: {
    getArticle(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.article = res.data.article;
          console.log(this.article);

          // if (res.data.article.article_type === 'guide') {
          //   win(this.article.campaignUrl);
          // }
        }
      });
    },
    getArticles(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http
        .get(api)
        .then((res) => {
          console.log('article', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
  },
  created() {
    this.id = this.$route.params.articleId;
    // this.getArticle(this.id);
  },
};
</script>
