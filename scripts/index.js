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

const calculate = (num1, num2, operator) => {
   getDisplay().textContent = "";

   switch (operator) {
      case "+":
         const sum = parseFloat(num1) + parseFloat(num2);
         return getDisplay().append(sum.toLocaleString("en-US"));
         break;

      case "-":
         const difference = parseFloat(num1) - parseFloat(num2);
         return getDisplay().append(difference.toLocaleString("en-US"));
         break;

      case "x":
         const product = parseFloat(num1) * parseFloat(num2);
         return getDisplay().append(product.toLocaleString("en-US"));
         break;

      case "÷":
         const quotient = parseFloat(num1) / parseFloat(num2);
         return getDisplay().append(quotient.toLocaleString("en-US"));
         break;

      default:
         return getDisplay().append("ERROR");
   }
};

let num1 = "";
let num2 = "";
let operator = "";
let display;

const reset = () => {
   num1 = "";
   num2 = "";
   operator = "";
   getDisplay().textContent = 0;
};

getAllBtns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
      e.preventDefault();

      let value = e.target.textContent;
      display = num1 + operator + num2;

      if (value == "AC" || value == "C") {
         if (value == "AC") {
            reset();
         } else {
            let test = display.slice(0, display.length - 1);
            console.log(test);
         }

         return;
      }

      if (value === "x" || value === "÷" || value === "-" || value === "+") {
         operator = value;
      } else if (operator) {
         num2 += value;
      } else {
         num1 += value;
         console.log(num1, "num1");
      }

      console.log(display, "display");
      //   getDisplay().append(display);

      if (value === "=") {
         calculate(num1, num2, operator);
      }
   });
});
