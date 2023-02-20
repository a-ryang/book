# 레거시 코드와 불변성

블랙 프라이데이 세일 비즈니스 로직 추가하기

> 고객이 장바구니에 담을 때 행사 가격이 적용되도록

```js
function addItemToCart(name, price) {
  const item = makeCartItem(name, price);
  shoppingCart = addItem(shoppingCart, item);
  const total = calcTotal(shoppingCart);
  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
  blackFridayPromotion(shoppingCart); // 추가된 레거시 코드
}
```

추가된 함수를 호출하면 카피-온-라이트 원칙을 지킬 수 없다. 또 `blackFridayPromotion()`함수를 고칠 수도 없다.

카피-온-라이트 원칙을 지키며 안전하게 함수를 사용할 수 있는 ** 방어적 복사 ** 를 사용해보자.

# 방어적 복사는 원본이 바뀌는 것을 막아 준다.

바뀔 수도 있는 데이터가 신뢰할 수 없는 코드에서 안전지대로 들어온다.

들어온 데이터로 깊은 복사본을 만들고 변경 가능한 원본은 버린다. 따라서 들어오는 데이터를 보호할 수 있다.

마찬가지로 나가는 데이터도 바뀌면 안되기 때문에, 나가는 데이터도 깊은 복사본을 만들어 내보낸다.

```js
function addItemToCart(name, price) {
  const item = makeCartItem(name, price);
  shoppingCart = addItem(shoppingCart, item);
  const total = calcTotal(shoppingCart);
  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
  const cartCopy = deepCopy(shoppingCart); // 넘기기 전 복사
  blackFridayPromotion(cartCopy);
  shoppingCart = deepCopy(cartCopy); // 들어오는 데이터를 위한 복사
}
```

# 신뢰할 수 없는 코드 감싸기

- 나중에 addItemToCart를 봤을 때, 복사본을 만드는 이유에 대해 모를 수 있다
- blackFridayPromotion 코드가 다시 필요할 수 있다.
  → 방어적 복사 코드를 분리해 새로운 함수로 만들자

```js
function addItemToCart(name, price) {
  const item = makeCartItem(name, price);
  shoppingCart = addItem(shoppingCart, item);
  const total = calcTotal(shoppingCart);
  setCartTotalDom(total);
  updateShippingIcons(shoppingCart);
  updateTaxDom(total);
  shoppingCart = blackFridayPromotionSave(shoppingCart);
}

function blackFridayPromotionSave(cart) {
  const cartCopy = deepCopy(shoppingCart);
  blackFridayPromotion(cartCopy);
  return deepCopy(cartCopy);
}
```

# 카피-온-라이트 vs 방어적 복사

|           | 카피-온-라이트                                                           | 방어적 복사                                                                                             |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| 언제?     | 통제할 수 있는 데이터를 바꿀 때                                          | 신뢰할 수 없는 코드와 데이터를 주고 받을 때                                                             |
| 어디서?   | 안전지대 어디서나. 사실 카피-온-라이트가 불변성을 가진 안전지대를 만든다 | 안전지대의 경계에서 데이터가 오고갈 때                                                                  |
| 복사 방식 | 얕은 복사(상대적으로 비용이 덜듬)                                        | 깊은 복사(상대적으로 비용이 많이 듬)                                                                    |
| 규칙      | 1. 바꿀 데이터의 얕은 복사본을 만든다 2. 복사본을 변경 3. 복사본을 리턴  | 1. 안전지대로 들어오는 데이터에 깊은 복사본 만들기 2. 안전지대에서 나가는 데이터에 깊은 복사본을 만들기 |

# js에서 깊은 복사 구현 한계

JS에서 깊은 복사는 Lodash 라이브러리의 `.cloneDeep()` 사용해볼 것

많은 타입에 대해 실패하지만, 깊은 복사에 대한 예시는 다음과 같다

```js
function deepCopy(thing) {
  // 배열일 때만 동작
  if (Array.isArray(thing)) {
    const copy = [];
    for (const i = 0; i < thing.length; i++) {
      copy.push(deepCopy(thing[i])); // 재귀 복사
    }
    return copy;
  }
}
```

# 요점

- 방어적 복사는 불변성을 구현하는 원칙
- 방어적 복사는 깊은 복사를 하기 때문에 카피-온-라이트 보다 비용이 더 든다
- 방어적 복사는 불변성 원칙을 구현하지 않는 코드로부터 데이터를 보호해준다
- 신뢰할 수 없는 코드와 함께 사용할 때만 방어적 복사를 사용한다
