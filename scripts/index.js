"use strict";
const getKeypad = document.querySelector(".keypad");

const calc = ["AC", "C", "x", "÷", 7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "=", ".", 0];

/* create buttons */
let keyButton = [];
// const keyPad = createElement("div");

calc.forEach((num, i) => {
   let btn = "=" === num ? "equal" : 0 === num ? "zero" : "btn";

   keyButton.push(`<div class="num_pad ${btn}" >${num}</div>`);
   getKeypad.innerHTML += keyButton[i];
});

/* display the result */
const getDisplay = () => document.querySelector(".display_screen");
const getAllBtns = document.querySelectorAll(".num_pad");
let num1;
let num2;
let operator;
let display;

const reset = (value) => {
   num1 = "";
   num2 = "";
   operator = "";
   display = "";

   if (value == "AC") {
      getDisplay().textContent = 0;
   }
};

reset();

const calculate = (num1, num2, operator) => {
   getDisplay().textContent = "";

   switch (operator) {
      case "+":
         const sum = parseFloat(num1) + parseFloat(num2);
         getDisplay().innerText = sum.toLocaleString("en-US");
         return reset();
         break;

      case "-":
         const difference = parseFloat(num1) - parseFloat(num2);
         getDisplay().innerText = difference.toLocaleString("en-US");
         return reset();
         break;

      case "x":
         const product = parseFloat(num1) * parseFloat(num2);
         getDisplay().innerText = product.toLocaleString("en-US");
         return reset();
         break;

      case "÷":
         const quotient = parseFloat(num1) / parseFloat(num2);
         getDisplay().innerText = quotient.toLocaleString("en-US");
         return reset();
         break;

      default:
         return (getDisplay().innerText = "ERROR");
   }
};

const displayResult = (result) => {
   getDisplay().textContent = result;
};

getAllBtns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      e.preventDefault();

      let value = e.target.textContent;

      if (value === "x" || value === "÷" || value === "-" || value === "+") {
         operator = value;
      } else if (operator) {
         num2 += value;
      } else {
         num1 += value;
      }

      if (value == "AC" || value == "C") {
         if (value == "AC") {
            reset(value);
         } else {
            let removeLast = getDisplay().textContent.split("");
            removeLast.length >= 2 ? removeLast.pop() : reset();

            console.log(removeLast.join(""));
            displayResult(removeLast.join(""));
         }
         return;
      }

      display += value;
      displayResult(display);

      if (value === "=") {
         num1 === "" || num2 === "" || operator === "" ? 0 : calculate(num1, num2, operator);
      }
   });
});
