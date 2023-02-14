const shoppingCart = []; // A

// A 전역변수 사용
function addItemToCart(name, price) {
  const item = makeCartItem(name, price);
  shoppingCart = addItem(shoppingCart, item);
  const total = calcTotal(shoppingCart);
  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
}

// C
function makeCartItem(name, price) {
  return {
    name,
    price,
  };
}

// C
function addItem(cart, item) {
  return addElementLast(cart, item);
}

// C
function addElementLast(array, elem) {
  const newArray = array.slice();
  newArray.push(elem);
  return newArray;
}

// C
function calcTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
}

// A, DOM 수정
function updateShippingIcons(cart) {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    const newCart = addItem(cart, item.name, item.price);
    if (getsFreeShipping(newCart)) btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}

// C
function getsFreeShipping(cart) {
  return calcTotal(cart) >= 20;
}

// A, DOM 수정
function updateTaxDom(total) {
  setTaxDom(calcTax(total));
}

// C
function calcTax(amount) {
  return amount * 0.1;
}
