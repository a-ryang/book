# 문제점

비즈니스 규칙을 테스트하기 어렵다.
코드가 바뀔 때마다 아래와 같은 테스트를 만들어야 한다.

1. 브라우저 설정
2. 페이지 로드
3. 장바구니에 제품 담기 클릭
4. DOM 업데이트 기다리기
5. DOM 값 가져오기
6. 가져온 문자열 값 -> 숫자 값
7. 예상 값과 비교하기

따라서
DOM 업데이트와 비즈니스 규칙을 분리 + 전역변수를 없앤다

# 재사용하기 쉽게 만들기

```js
function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom();
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    // 전역변수 shoppingCartTotal가 있어야 실행가능함
    if (item.price + shoppingCartTotal >= 20)
      btn.showFreeShippingIcon(); // DOM이 있어야 실행 가능함
    else btn.hideFreeShippingIcon(); // DOM이 있어야 실행 가능함
  }
}
```

- 전역변수 의존을 제거하기
- DOM을 사용할 수 있는 곳에서 실행된다고 가정하지 않기
- 함수가 결괏값을 리턴하기

# 액션, 계산, 데이터를 구분하기

```js
// 전역변수는 변경 가능하기 때문에 액션
const shoppingCart = []; // A
let shoppingCartTotal = 0; // A

function addItemToCart(name, price) {
  // 전역 변수를 바꾸는 것 -> 액션
  shoppingCart.push({
    name,
    price,
  });
  calcCartTotal();
}

function updateShippingIcons() {
  // A
  const buyBtns = getBuyBtnsDom(); // DOM을 읽는 것 -> 액션
  for (let i = 0; i < buyBtns.length; i++) {
    const btn = buyBtns[i];
    const item = btn.item;
    // DOM을 바꾸는 것 -> 액션
    if (item.price + shoppingCartTotal >= 20) btn.showFreeShippingIcon();
    else btn.hideFreeShippingIcon();
  }
}

function updateTaxDom() {
  // A
  // DOM을 바꾸는것 -> 액션
  setTaxDom(shoppingCartTotal * 10);
}

function getBuyBtnsDom() {
  //페이지에 있는 모든 구매 버튼을 가져오기
}

function calcCartTotal() {
  // A
  shoppingCartTotal = 0; // 전역 변수를 바꾸는 것 -> 액션
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    shoppingCartTotal += item.price;
  }
  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}

function setCartTotalDom() {}
```

# 액션에서 계산 빼내기

### 리팩토링 : 서브루틴 추출하기(extract subroutine)

수정 전

```js
function calcCartTotal() {
  shoppingCartTotal = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    shoppingCartTotal += item.price;
  }
  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}
```

수정 후

```js
function calcCartTotal() {
  calcTotal();
  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}

function calcTotal() {
  shoppingCartTotal = 0; // 전역변수 암묵적 출력
  // shoppingCart.length 전역변수 사용 -> 암묵적 입력
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    shoppingCartTotal += item.price; // 암묵적 출력
  }
}
```

`calcTotal()`를 명시적 입출력으로 바꾸어 액션에서 계산으로 바꾸기

1. 암묵적 출력 없애기

```js
function calcCartTotal() {
  shoppingCartTotal = calcTotal(); // 리턴 값을 받아 전역변수에 할당
  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}

function calcTotal() {
  let total = 0; // 전역변수를 지역변수로
  for (let i = 0; i < shoppingCart.length; i++) {
    const item = shoppingCart[i];
    total += item.price;
  }
  return total; // 지역변수를 리턴
}
```

2. 암묵적 입력 없애기

```js
function calcCartTotal() {
  shoppingCartTotal = calcTotal(shoppingCart);
  setCartTotalDom();
  updateShippingIcons();
  updateTaxDom();
}

// 전역변수 대신 인자를 사용
function calcTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += item.price;
  }
  return total;
}
```

이제...

- DOM 업데이트와 비즈니스 규칙 분리 완료
- 전역변수 사용 x
- DOM을 업데이트 x
- 함수가 결괏값 리턴

# 액션에서 또 다른 계산 빼내기

`addItemToCart()`에서 계산을 빼내보자
수정전

```js
function addItemToCart(name, price) {
  shoppingCart.push({
    name,
    price,
  });
  calcCartTotal();
}
```

수정후
`함수 추출하기` 리팩토링.

```js
function addItemToCart(name, price) {
  addItem(name, price);
  calcCartTotal();
}

function addItem(name, price) {
  shoppingCart.push({
    name,
    price,
  });
}
```

아직 전역변수 `shoppingCart`를 바꾸기 때문에 계산으로 바꾸는 작업이 필요하다

```js
function addItem(name, price) {
  // 전역변수 shoppingCart를 읽고있다
  shoppingCart.push({
    // push()로 배열을 바꾸고 있다
    name,
    price,
  });
}
```

> 전역변수를 읽으면 함수 안으로 데이터가 들어오기 때문에 입력,
> 전역 배열을 바꾸면 함수 밖으로 데이터가 나가기 때문에 출력

```js
// 암묵적 입력 -> 명시적 입력
function addItemToCart(name, price) {
  addItem(shoppingCart, name, price);
  calcCartTotal();
}

function addItem(cart, name, price) {
  cart.push({
    name,
    price,
  });
}
```

```js
// 암묵적 출력 -> 명시적 출력
function addItemToCart(name, price) {
  shoppingCart = addItem(shoppingCart, name, price);
  calcCartTotal();
}

function addItem(cart, name, price) {
  // 복사본을 만들어 지역변수에 할당
  const newCart = cart.slice();
  newCart.push({
    name,
    price,
  });
  // 복사본 변경 후 리턴
  return newCart;
}
```

`copy-on-write` : 어떤 값을 바꿀 때, 그 값을 복사해서 바꾸는 방법
js에서 배열을 복사하는 방법이 없어 `.splice()` 사용
