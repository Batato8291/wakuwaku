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
  console.log('add or remove favorites', id);
  this.favorArr = JSON.parse(localStorage.getItem('favor')) || [];
  const index = this.favorArr.indexOf(id);
  if (index === -1) {
    this.favorArr.push(id);
  } else {
    this.favorArr.splice(index, 1);
  }
  localStorage.setItem('favor', JSON.stringify(this.favorArr));
}

// add to cart
export function addToCart(id) {
  console.log('add to cart', id);
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
  this.status.loadingItem = id;
  const cart = {
    product_id: id,
    qty: 1,
  };
  // console.log(url, cart);
  this.$http.post(url, { data: cart }).then((res) => {
    this.status.loadingItem = '';
    this.$emitter.emit('cartsUpdate', {});
    console.log(res);
  });

  // e.stopPropagation();
}
