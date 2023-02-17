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
