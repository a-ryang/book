/**
 * 급여 계산을 위해 외부 라이브러리를 사용하고 있다.
 * payrollCalc() 함수에 배열 형태로 넘기면 급여가 배열로 리턴된다.
 * 신뢰할수 없는 코드에 방어적 복사를 적용하기
 */

function payrollCalc(employees) {
  // ...
  return payrollChecks;
}

function payrollCalcSave(employees) {
  const employeesCopy = deepCopy(employees);
  const payrollChecks = payrollCalc(employeesCopy);
  return deepCopy(payrollChecks);
}

/*

// 콜백 함수를 넘긴다
userChanges.subscribe(
  // user에 대한 정보를 바꾸면 사용자 데이터와 함께 함수를 불러준다
  // user 데이터는 바뀔 수 있다.
  function (user) {



  processUser(user); // 이 함수는 안전지대에 있는 함수
});

*/

userChanges.subscribe(function (user) {
  const copy = deepCopy(user);
  processUser(copy);
});
