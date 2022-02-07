const apiUrl = 'http://localhost:3000/';
let clearNextTime = false;
let firstCalc = true;
let operand1 = null;
let operand2 = null;
let operator = null;

$(".inputNumber").click(function (event) {
  if (clearNextTime) {
    $("#screen").val("");
    clearNextTime = false;
  }
  $("#screen").val(function (i, orig) {
    return orig + event.target.value;
  });
})

$(".operator").click(function (event) {
  operator = event.target.value;
  $("#screenOperation").val(event.target.value);
  operand1 = $("#screen").val();
  firstCalc = true;
  clearNextTime = true;
})

$(".result").click(function () {
  if (firstCalc) {
    operand2 = $("#screen").val();
    $("#screen").val(getResult());
    firstCalc = false;
    clearNextTime = true;
  } else {
    operand1 = $("#screen").val();
    $("#screen").val(getResult());
  }
})

$(".reset").click(function () {
  $("#screen").val("");
  $("#screenOperation").val("");
  firstCalc = true;
})

$(".toggleSignal").click(function () {
  $("#screen").val((-1) * Number($("#screen").val()));
})

$(".erase").click(function () {
  $("#screen").val($("#screen").val().slice(0, -1));
})
function getResult() {
  if (operator == "/") operator = "%2F";
  fetch(apiUrl + "calculate/" + Number(operand1) + "&" + Number(operand2) + "&" + operator)
    .then((resp) => resp.text())
    .then((resp) => {
      console.log(resp);
      $("#screen").val(resp);
    })
}