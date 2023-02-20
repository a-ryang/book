// const mailingList = [];

// function addContact(email) {
//   mailingList.push(email);
// }

// function submitFormHandler(event) {
//   const form = event.target;
//   const email = form.elements["email"].value;
//   addContact(email);
// }

// 힌트 1: addContact()가 전역변수에 접근하면 안됨
// 힌트 2: addContact() 리턴 값을 전역변수에 할당

const mailingList = [];

function addContact(list, email) {
  const copyList = list.slice();
  copyList.push(email);
  return copyList;
}

function submitFormHandler(event) {
  const form = event.target;
  const email = form.elements["email"].value;
  mailingList = addContact(list, email);
}

// .pop 메서드를 분리하기

//const a = [1, 2, 3, 4];
//const b = a.pop();
//console.log(b); // 4를 출력
//console.log(a); //[1, 2, 3]을 출력

// 1. 읽기 함수와 쓰기 함수로 분리하기
function dropLast(array) {
  return array[array.length - 1];
}

function pop(array) {
  const arrayCopy = array.slice();
  arrayCopy.pop();
  return arrayCopy;
}

// 2. 값 두 개를 리턴하는 함수로 만들기
function pop(array) {
  const arrayCopy = array.slice();
  const last = arrayCopy[arrayCopy.length - 1];
  arrayCopy.pop();

  return {
    last,
    array: arrayCopy,
  };
}

// .push() 메서드를 카피-온-라이트 버전으로 만들기
function push(array, elem) {
  const arrayCopy = array.slice();
  arrayCopy.push(elem);
  return arrayCopy;
}

// push()를 사용해 addContact() 리팩토링하기
function oldAddContact(malingList, email) {
  const listCopy = malingList.slice();
  listCopy.push(email);
  return listCopy;
}

function addContact(malingList, email) {
  return push(malingList, email);
}

// a[15] = 2;
// arraySet() 함수를 만들기
function arraySet(array, value, idx) {
  const arrayCopy = array.slice();
  arrayCopy[idx] = value;
  return arrayCopy;
}

// objectSet() 구현
function objectSet(obj, key, value) {
  const copy = obj.assign({}, obj);
  copy[key] = value;
  return copy;
}

// 제품 가격을 설정하는 setPrice() 리팩토링
function setPrice(item, newPrice) {
  return objectSet(item, "price", newPrice);
}

// 제품 개수를 설정하는 setQuantity() 리팩토링
function setQuantity(item, newQuantity) {
  return objectSet(item, "quantity", newQuantity);
}

// 객체의 키로 키/값 쌍을 지우는 delete 연산 카피-온-라이트 버전으로 만들기
function objectDelete(obj, key) {
  const copy = obj.assign({}, obj);
  delete copy[key];
  return copy;
}
