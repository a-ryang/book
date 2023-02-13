/**
 * 쇼핑 중 장바구니에 담겨 있는 제품의 금액 합계를 볼 수 있는 기능
 */

const shoppingCart = []; // 장바구니 제품
let shoppingCartTotal = 0; // 금액 합계

function addItemToCart(name, price) {
  shoppingCart.push({
    name,
    price,
  });
  calcCartTotal(); // 담기 후 금액 합계 업데이트
}

function calcCartTotal() {
  shoppingCartTotal = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    shoppingCartTotal += item.price;
  }
  setCartTotalDom();
}

function setCartTotalDom() {
  // 금액 합계를 반영하기 위한 DOM 업데이트
}
