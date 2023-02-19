# 쓰기 + 읽기 동시에 하는 동작은?

```js
let a = [1, 2, 3, 4];
let b = a.shift();
console.log(b); // 1을 출력
console.log(a); // [2, 3, 4] 출력
```

`.shilft()` 메서드의 동작은 값을 읽고 변경하는 일을 동시에 한다.

이런 동작은 값을 변경하고 리턴한다.

1. 읽기와 쓰기 함수로 각각 분리한다

2. 또는 함수에서 값을 두 개 리턴한다.

가능하면 책임이 분리된 1번이 좋다.

# [1] 쓰면서 읽기도 하는 함수를 분리하기

```js
function firstElement(array) {
  return array[0];
}
```

`.shilft()` 메서드가 리턴하는 값은 배열의 첫 번째 항목이다. 따라서 이를 리턴해주는 계산 함수를 만든다.

이 함수는 읽기 동작만 할 뿐, 숨겨진 입출력이 없으므로 계산이다.

`.shilft()` 메서드의 쓰기 동작은 새로 만들 필요가 없다.

`.shilft()` 메서드를 감싸기만 하면된다. 대신 메서드의 리턴값을 사용하지 않는 다는 것을 강조하기 위해 리턴값을 무시 처리한다.

그 후 인자로 들어오는 값을 변경하기 때문에, 카피-온-라이트로 변경한다.

```js
function dropFirst(array) {
  const arrayCopy = array.slice();
  arrayCopy.shift();
  return arrayCopy;
}
```

# [2] 값을 두 개 리턴하는 함수로 만들기

```js
function shift(array) {
  const arrayCopy = array.slice();
  const first = arrayCopy.shift();
  return {
    first,
    array: arrayCopy,
  };
}
```
