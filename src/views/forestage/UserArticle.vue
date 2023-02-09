<template>
  <div class="container">
    <h1 class="article_title">{{ article.title }}</h1>
    <p class="text-secondary mb-2" style="font-size: small">
      {{
        new Date(article.create_at * 1000).toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }}&emsp; 文：{{ article.author }}
    </p>

    <!-- <div class="campaign-img d-flex justify-content-center">
      <img
        :src="article.coverImg"
        style="max-height: 300px"
        alt="event picture"
      />
    </div> -->

    <div class="w-100">
      <div class="campaign-content ck-content" v-html="article.content"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$--ck-image-style-spacing: 1.5em;
$--ck-inline-image-style-spacing: $--ck-image-style-spacing / 2;

// ck-editor css setting
.ck-content:deep {
  & .image {
    display: table;
    clear: both;
    text-align: center;
    margin: 0.9em auto;
    min-width: 50px;
    & img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      min-width: 100%;
    }
  }
  & .image-inline {
    display: inline-flex;
    max-width: 100%;
    align-items: flex-start;
    & picture {
      display: flex;
    }
    & picture,
    & img {
      flex-grow: 1;
      flex-shrink: 1;
      max-width: 100%;
    }
  }
  & .image.image_resized {
    max-width: 100%;
    display: block;
    box-sizing: border-box;
    & img {
      width: 100%;
    }
    & > figcaption {
      display: block;
    }
  }

  & .image-style-block-align-left,
  & .image-style-block-align-right {
    max-width: calc(100% - $--ck-image-style-spacing);
  }
  &.image-style-align-left,
  & .image-style-align-right {
    clear: none;
  }
  & .image-style-side {
    float: right;
    margin-left: $--ck-image-style-spacing;
    max-width: 50%;
  }
  & .image-style-align-left {
    float: left;
    margin-right: $--ck-image-style-spacing;
  }
  & .image-style-align-center {
    margin-left: auto;
    margin-right: auto;
  }
  & .image-style-align-right {
    float: right;
    margin-left: $--ck-image-style-spacing;
  }
  & .image-style-block-align-right {
    margin-right: 0;
    margin-left: auto;
  }
  & .image-style-block-align-left {
    margin-left: 0;
    margin-right: auto;
  }
  & p + .image-style-align-left,
  & p + .image-style-align-right,
  & p + .image-style-side {
    margin-top: 0;
  }
  & .image-inline {
    &.image-style-align-left,
    &.image-style-align-right {
      margin-top: $--ck-inline-image-style-spacing;
      margin-bottom: $--ck-inline-image-style-spacing;
    }
    &.image-style-align-left {
      margin-right: $--ck-inline-image-style-spacing;
    }
    &.image-style-align-right {
      margin-left: $--ck-inline-image-style-spacing;
    }
  }

  .table {
    margin: 0.9em auto;
    display: table;

    & table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      height: 100%;
      border: 1px double hsl(0, 0%, 70%);

      & td,
      & th {
        min-width: 2em;
        padding: 0.4em;
        border: 1px solid hsl(0, 0%, 75%);
      }

      & th {
        font-weight: bold;
        background: hsla(0, 0%, 0%, 5%);
      }
    }
  }
}

.article_title {
  font-weight: 600;
  color: rgb(255, 169, 83);
}
.campaign-img img {
  max-width: 80vw;
  object-fit: cover;
}
.campaign-content {
  padding: 1rem 0.5rem;
  overflow: hidden;
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
    this.getArticle(this.id);
  },
};
</script>
