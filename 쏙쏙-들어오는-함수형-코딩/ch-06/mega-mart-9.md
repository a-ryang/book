# 객체에 대한 카피-온-라이트

```js
const copy = Object.assign({}, object);
```

### objectSet() 구현

```js
function objectSet(obj, key, value) {
  const copy = obj.assign({}, obj);
  copy[key] = value;
  return copy;
}
```

# 중첩된 쓰기를 읽기로 바꾸기

```js
// before
function setPriceByName(cart, name, price) {
  for (const i = 0; i < cart.length; i++) {
    if (cart[i].name === name) cart[i].price = price;
  }
}

// after
function setPriceByName(cart, name, price) {
  const cartCopy = cart.slice();
  for (const i = 0; i < cartCopy.length; i++) {
    if (cartCopy[i].name === name) setPrice(cartCopy[i], price);
  }
  return cartCopy;
}
```
