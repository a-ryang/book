# 동작을 읽기, 쓰기 또는 둘 다로 분류하기

### 읽기

데이터를 바꾸지 않고 정보를 꺼내는 것

### 쓰기

쓰기 동작은 어떻게든 데이터를 바꾼다
바뀌는 값은 어디서 사용될지 모르기 때문에 바뀌지 않도록 주의가 필요함

> 장바구니 동작

1. 제품 개수 가져오기 (읽기)
2. 제품 이름으로 제품 가져오기 (읽기)
3. 제품 추가하기 (쓰기)
4. 제품 이름으로 제품 빼기 (쓰기)
5. 제품 이름으로 제품 구매 수량바꾸기 (쓰기)

> 제품에 대한 동작

1. 가격 설정하기 (쓰기)
2. 가격 가져오기 (읽기)
3. 이름 가져오기 (읽기)

# 카피-온-라이트는 쓰기를 읽기로 바꾼다

```js
function addElementLast(array, elem) {
  const newArray = array.slice(); // 복사
  newArray.push(name); // 복사본 바꾸기
  return newArray; // 복사본 리턴
}
```

### 규칙

1. 복사본 만들기
2. 복사본 원하는만큼 변경하기
3. 복사본 리턴하기

값을 바꾸던 원래 버전

```js
// cart를 수정하고 있음
function removeItemByName(cart, name) {
  let idx = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = 1;
  }
  if (idx !== null) {
    cart.splice(idx, 1);
  }
}

function deleteHandler(name) {
  removeItemByName(shoppingCart, name);
  const total = calcTotal(shoppingCart);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
}
```

카피-온-라이트를 적용한 버전

```js
function removeItemByName(cart, name) {
  const newCart = cart.slice();
  let idx = null;
  for (let i = 0; i < newCart.length; i++) {
    if (newCart[i].name === name) idx = 1;
  }
  if (idx !== null) {
    newCart.splice(idx, 1);
  }
  return newCart;
}

function deleteHandler(name) {
  shoppingCart = removeItemByName(shoppingCart, name);
  const total = calcTotal(shoppingCart);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
}
```

배열에 .splice() 메서드를 일반화하기

```js
function removeItem(array, idx, count) {
  const copy = array.splice();
  copy.splice(idx, count);
  return copy;
}

function removeItemByName(cart, name) {
  let idx = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) idx = 1;
  }
  if (idx !== null) {
    return removeItem(cart, idx, 1);
  }
  return cart; // 값을 바꾸지 않으면 복사 안해도 됨
}
```
