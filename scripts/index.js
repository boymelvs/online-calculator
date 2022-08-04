"use strict";

const getKeypad = () => document.querySelector(".keypad");

const keyPadItems = ["AC", "C", "x", "÷", 7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "=", ".", 0];

/* create buttons */
for (let item of keyPadItems) {
   const keyPadBtn = document.createElement("div");
   let btn = "=" === item ? "equal" : 0 === item ? "zero" : "btn";

   keyPadBtn.setAttribute("class", `num_pad ${btn}`);
   keyPadBtn.append(`${item}`);
   getKeypad().append(keyPadBtn);
}

/* display the result */
const getDisplay = () => document.querySelector(".display_result");
const getDisplayValue = () => document.querySelector(".display_value");
const getAllBtns = document.querySelectorAll(".num_pad");

let num1;
let num2;
let operator;
let operatorCount;
let display;
let period;
let periodCount;

/* all variables return to default value */
const reset = (value) => {
   num1 = "";
   num2 = "";
   operator = "";
   operatorCount = 0;
   display = "";
   period = "";
   periodCount = 0;

   if (value == "AC" || value == "C") {
      getDisplay().innerText = 0;
      getDisplayValue().innerText = "";
      return 0;
   }
};

reset("AC");

/* if all values are given calculate and display the result */
const calculate = (num1, num2, operator) => {
   getDisplayValue().innerText = `${num1} ${operator} ${num2}`;

   switch (operator) {
      case "+":
         const sum = parseFloat(num1) + parseFloat(num2);
         const sumResult = sum.toString().length > 16 ? sum.toExponential(2) : sum.toLocaleString("en-US");

         getDisplay().innerText = sumResult;
         reset();
         break;

      case "-":
         const difference = parseFloat(num1) - parseFloat(num2);
         const differenceResult = difference.toString().length > 16 ? difference.toExponential(2) : difference.toLocaleString("en-US");

         getDisplay().innerText = differenceResult;
         reset();
         break;

      case "x":
         const product = parseFloat(num1) * parseFloat(num2);
         const productResult = product.toString().length > 16 ? product.toExponential(2) : product.toLocaleString("en-US");

         getDisplay().innerText = productResult;
         reset();
         break;

      case "÷":
         const quotient = parseFloat(num1) / parseFloat(num2);
         const quotientResult = quotient.toString().length > 16 ? quotient.toExponential(2) : quotient.toLocaleString("en-US");

         getDisplay().innerText = quotientResult;
         reset();
         break;

      default:
         return (getDisplay().innerText = "ERROR");
   }
};

/* display all value in the screen */
const displayResult = (result, value = "") => {
   if (getDisplay().innerText.length > 16) {
      display = display.slice(0, -1);
   }

   getDisplay().innerText = value === "C" ? result : (display += result);
};

/* get all buttons */
getAllBtns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      e.preventDefault();

      let value = e.target.innerText;

      switch (value) {
         case "+":
         case "-":
         case "x":
         case "÷":
            if (operatorCount == 0) {
               operator = value;
               getDisplayValue().innerText = getDisplay().innerText;
               displayResult(operator);
               operatorCount = 1;
               periodCount = 1;
            }

            break;

         case ".":
            if (period == 0 || (periodCount == 1 && operatorCount == 1)) {
               period = value;
               displayResult(period);
            }

            periodCount += 1;
            break;

         case "AC":
            reset(value);

            break;

         case "C":
            display = display === 0 ? reset(value) : display.slice(0, -1);
            operatorCount = 0;
            periodCount = 0;
            displayResult(display, value);

            break;

         case "=":
            num1 = getDisplayValue().innerText.split(operator).shift();
            num2 = getDisplay().innerText.split(operator).pop();

            if (operator && num1 != "." && num2 != ".") {
               calculate(num1, num2, operator);
            }

            break;

         default:
            displayResult(value);
            return;
      }
   });
});
