/**
function updateTaxDom() {
  setTaxDom(hoppingCartTotal * 0.1);
}
 */

function updateTaxDom() {
  const tax = calcTax(hoppingCartTotal);
  setTaxDom(tax);
}

function calcTax(ammount) {
  return ammount * 0.1;
}

/**
function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    if (item.price + shoppingCartTotal >= 20) btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}
 */

function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    if (getsFreeShipping(item.price, shoppingCartTotal))
      btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}

function getsFreeShipping(price, cartTotal) {
  return price + cartTotal >= 20;
}
