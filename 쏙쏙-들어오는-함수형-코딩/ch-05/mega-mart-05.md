# 비즈니스 요구 사항과 설계를 맞추기

```js
function getsFreeShipping(price, cartTotal) {
  return price + cartTotal >= 20;
}
```

요구사항 : 장바구니에 담긴 제품을 주문할 때, 무료 배송인지 확인하는 것

현재 함수 : 장바구니로 무료 배송을 확인하지 않고 제품의 합계와 가격으로 확인하고 있다

또 다음 함수와 중복되는 코드가 있다

`total += item.price;`

```js
function calcTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
}
```

# 비즈니스 요구 사항과 함수를 맞추기

```js
// 장바구니 값을 인자로 받게 바꾼다.
// 장바구니는 entity 타입이기 떄문에 비즈니스 요구사항과 잘 맞는다
function getsFreeShipping(cartTotal) {
  return price + cartTotal >= 20;
}
```

함수 시그니처가 바뀌었기 때문에 사용하는 부분도 수정해야 한다

```js
// 이전
function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    if (getsFreeShipping(shoppingCartTotal, item.price))
      btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}
// 이후
function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    const newCart = addItem(shoppingCart, item.name, item.price);
    if (getsFreeShipping(newCart)) btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}
```

### 원칙 1: 암묵적 입력과 출력을 줄이기

암묵적 입출력을 명시적 입출력으로 바꿔 모듈화된 컴포넌트로 만들 수 있다.

암묵적 입출력이 있는 함수는 아무 때나 실행할 수 없기 때문에 테스트하기 어렵다.

모든 입력값을 설정하고 테스트를 돌린 후에 모든 출력값을 확인해야 한다.

전역변수 `shoppingCart`를 빼기

```js
function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    // shoppingCart
    const newCart = addItem(shoppingCart, item.name, item.price);
    if (getsFreeShipping(newCart)) btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}

// 명시적 인자로 바꾼 코드
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

// 호출하는 코드
function calcCartTotal() {
  shoppingCartTotal = calcTotal(shoppingCart);
  setCartTotalDom();
  updateShippingIcons(shoppingCart); // 인자 전달
  updateTaxDom();
}
```

# addItem() 분리해 더 좋은 설계 만들기

```js
function addItem(cart, name, price) {
  const newCart = cart.slice(); // 1. 배열 복사
  // 2.item 객체를 만들기
  newCart.push({ name, price }); // 3. 복사본에 item 추가하기
  return newCart; // 4.복사본을 리턴
}
```

item에 관한 코드를 별도의 함수로 분리해보자

```js
function makeCartItem(name, price) {
  return {
    name,
    price,
  };
}

// 호출하는 부분 수정
addItem(shoppingCart, makeCartItem("shoes", 3.45));

function addItem(cart, item) {
  const newCart = cart.slice(); // 1. 배열 복사
  newCart.push(item); // 2. 복사본에 item 추가하기
  return newCart; // 3.복사본을 리턴
}
```

분리를 통해 cart와 item을 독립적으로 확장할 수 있게 되었다
또 `addItem()`함수는 cart와 item에 특화된 함수가 아니게 되었다. 일반적인 배열과 항목을 넘겨도 잘 동작한다
따라서 이름을 동작에 맞게 수정해보자

```js
function addElementLast(array, elem) {
  const newArray = array.slice();
  newArray.push(elem);
  return newArray;
}

function addItem(cart, item) {
  return addElementLast(cart, item);
}
```

어느 곳에든 재사용할 수 있는 유틸리티 함수로 변경 되었다
