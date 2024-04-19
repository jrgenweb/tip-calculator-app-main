const billEl = document.getElementById("bill-text");
const numberOfPeopleEl = document.getElementById("number-people-text");
const btnReset = document.querySelector('button[type="reset"]');

let tip = 0;
let bill = 0;
let numberOfPeople = 0;

btnReset.addEventListener("click", resetCalculator);
const tipPerPersonEl = document.querySelector(".calculator__amount-value");
const totalPerPersonEl = document.querySelector(".calculator__total-value");

/**
 *
 * create Tip Selection Form control
 * predefined ​​and unique value selection *
 *
 */

const values = [5, 10, 15, 25, 50];
const tipSelectionEl = document.getElementById("tip__selection");

function createTipSelectionControl() {
  for (val of values) {
    const tipSelectEl = document.createElement("div");
    tipSelectEl.classList.add("tip-select", "tip-select--radio");
    const tipSelectLabelEl = document.createElement("label");
    tipSelectLabelEl.setAttribute("for", "checkbox_" + val);
    tipSelectLabelEl.innerText = val + "%";

    const tipSelectInputEl = document.createElement("input");
    tipSelectInputEl.type = "radio";
    tipSelectInputEl.name = "tip[]";
    tipSelectInputEl.id = "checkbox_" + val;
    tipSelectInputEl.value = val;
    tipSelectEl.appendChild(tipSelectLabelEl);
    tipSelectEl.appendChild(tipSelectInputEl);

    tipSelectionEl.appendChild(tipSelectEl);
  }

  /**
   * create text input for custom tip value
   */
  const tipSelectCustomEl = document.createElement("input");
  tipSelectCustomEl.classList.add("tip-select");
  tipSelectCustomEl.name = "custom-text";
  tipSelectCustomEl.id = "custom-text";
  tipSelectCustomEl.type = "number";
  tipSelectCustomEl.placeholder = "Custom";

  tipSelectionEl.appendChild(tipSelectCustomEl);

  const tipSelects = document.querySelectorAll(".tip-select");

  tipSelects.forEach((tipEl) => {
    if (tipEl.type === "number") {
      tipEl.addEventListener("keyup", handleTipSelect);
    } else {
      tipEl.addEventListener("change", handleTipSelect);
    }
  });
}

/**
 *
 * if custom value, then remove checked status from radio buttons
 * if select from radios, then delete the custom value
 * and set the tip variable
 */
function handleTipSelect(event) {
  if (event.target.type === "number") {
    const checked = document.querySelector(
      '.tip-select--radio input[type="radio"]:checked'
    );
    if (checked != null) checked.checked = false;
  } else {
    const customEl = document.querySelector('input[type="number"].tip-select');
    customEl.value = "";
  }
  tip = event.target.value;
  console.log(event.target.value);
}

/**
 *
 * remove checked status and custom field, tip variable set to null
 *
 */
function resetTipSelect() {
  const checked = document.querySelector(
    '.tip-select--radio input[type="radio"]:checked'
  );
  if (checked != null) checked.checked = false;
  const customEl = document.querySelector('input[type="number"].tip-select');
  customEl.value = "";
  tip = "";
}

createTipSelectionControl();

function resetCalculator() {
  tip, bill, (numberOfPeople = 0);
  tipPerPersonEl.innerText = formatCurrency(0);
  totalPerPersonEl.innerText = formatCurrency(0);
  billEl.value = "";
  numberOfPeopleEl.value = "";
  resetTipSelect();

  btnReset.setAttribute("disabled", "true");
}

/**
 *
 *   calculate and display
 *
 *
 */
function calculate() {
  console.log("Calculating");

  bill = billEl.value;
  numberOfPeople = numberOfPeopleEl.value;

  tip = bill * (tip / 100);

  let tipPerPerson = tip / numberOfPeople;
  let totalPerPerson = tip / numberOfPeople + bill / numberOfPeople;

  tipPerPersonEl.innerText = formatCurrency(tipPerPerson);
  totalPerPersonEl.innerText = formatCurrency(totalPerPerson);
}

function formatCurrency(num) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

/**
 *
 * when change form value
 * validate data isnumber, not null
 * calculate
 *
 */

const formEl = document.querySelector("form");

formEl.addEventListener("change", formOnChange);
function formOnChange() {
  let validation = true;

  if (!validate(billEl)) {
    validation = false;
  }
  if (!validate(numberOfPeopleEl)) {
    validation = false;
  }

  if (validation) {
    //enable button

    btnReset.removeAttribute("disabled");
    calculate();
  } else {
    //disable button
    btnReset.setAttribute("disabled", true);
  }
}

/**
 *
 * if null then show error message, for equal form control
 *
 */
function validate(el) {
  //path for error message
  const errMessageEl = el.parentNode.parentNode.childNodes[3];
  console.log(el, el.value);

  if (el.value != null && el.value != undefined && el.value != 0) {
    el.classList.remove("err");
    errMessageEl.innerText = "";
    return true;
  } else {
    el.classList.add("err");
    errMessageEl.innerText = `Can't be zero.`;
    return false;
  }
}
