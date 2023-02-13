/**
 * 다음 요구사항 : 장바구니의 금액 합계가 바뀔 때마다 세금을 다시 계산하기
 * 구매 합계가 20달러 이상이면 -> 무료배송
 * 합계가 20달러가 넘게 되는 제품에 아이콘을 붙이려 하는 상황
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

function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    if (item.price + shoppingCartTotal >= 20) btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}

function updateTaxDom() {
  setTaxDom(shoppingCartTotal * 10);
}

function getBuyBtnsDom() {
  //페이지에 있는 모든 구매 버튼을 가져오기
}

function calcCartTotal() {
  shoppingCartTotal = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    shoppingCartTotal += item.price;
  }
  setCartTotalDom();
  // 금액이 바뀔 때마다 모든 아이콘 업데이트
  updateShippingIcons();
  updateTaxDom();
}

function setCartTotalDom() {
  // 금액 합계를 반영하기 위한 DOM 업데이트
}
