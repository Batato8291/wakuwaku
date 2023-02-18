// 分類區連結fn
export default function (
  category,
  tag,
  author,
  publisher,
  isPopular,
  isOnSale,
) {
  const dataMsg = {
    search: '',
    category,
  };

  // 判斷式

  if (tag !== false) {
    dataMsg.tag = tag;
  }
  if (author !== false) {
    dataMsg.author = author;
  }
  if (publisher !== false) {
    dataMsg.publisher = publisher;
  }
  if (isPopular === true) {
    dataMsg.isPopular = true;
  }
  if (isOnSale === true) {
    dataMsg.isOnSale = true;
  }

  this.$router.push({
    path: '/search',
    query: dataMsg,
  });
}

// add to favor
export function addToFavor(id) {
  this.favorArr = JSON.parse(localStorage.getItem('favor')) || [];
  const index = this.favorArr.indexOf(id);
  if (index === -1) {
    this.favorArr.push(id);
    const res = { data: { success: true } };
    this.$httpMessageState(res, '加入收藏');
  } else {
    this.favorArr.splice(index, 1);
    const res = { data: { success: false, message: 'favor' } };
    this.$httpMessageState(res, '取消收藏');
  }
  localStorage.setItem('favor', JSON.stringify(this.favorArr));
}

// add to cart
export function addToCart(id) {
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
  this.status.loadingItem = id;
  const cart = {
    product_id: id,
    qty: 1,
  };

  this.$http.post(url, { data: cart }).then((res) => {
    this.status.loadingItem = '';
    this.$httpMessageState(res, '加入購物車');
  });

  // e.stopPropagation();
}
