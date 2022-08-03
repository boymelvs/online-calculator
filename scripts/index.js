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
let period;

/* all variables return to default value */
const reset = (value) => {
   num1 = "";
   num2 = "";
   operator = "";
   display = "";
   period = "";

   if (value == "AC" || value == "=") {
      getDisplay().innerText = 0;
   }
};

reset();

/* if all values are given calculate and display the result */
const calculate = (num1, num2, operator) => {
   getDisplay().innerText = "";

   switch (operator) {
      case "+":
         const sum = parseFloat(num1) + parseFloat(num2);
         const sumResult = sum.toString().length > 8 ? sum.toExponential(2) : sum.toLocaleString("en-US");

         getDisplay().innerText = sumResult;
         return reset();
         break;

      case "-":
         const difference = parseFloat(num1) - parseFloat(num2);
         const differenceResult = difference.toString().length > 8 ? difference.toExponential(2) : difference.toLocaleString("en-US");

         getDisplay().innerText = differenceResult;
         return reset();
         break;

      case "x":
         const product = parseFloat(num1) * parseFloat(num2);
         const productResult = product.toString().length > 8 ? product.toExponential(2) : product.toLocaleString("en-US");

         getDisplay().innerText = productResult;
         return reset();
         break;

      case "÷":
         const quotient = parseFloat(num1) / parseFloat(num2);
         const quotientResult = quotient.toString().length > 8 ? quotient.toExponential(2) : quotient.toLocaleString("en-US");

         getDisplay().innerText = quotientResult;
         return reset();
         break;

      default:
         return (getDisplay().innerText = "ERROR");
   }
};

/* display all value in the screen */
const displayResult = (result, value = "") => {
   console.log("test");
   getDisplay().innerText = value == "C" ? result : (display += result);
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
            operator = value;
            displayResult(operator);
            return;
            break;

         // case ".":
         //    if (!period && !num1) {
         //       period = value;
         //       display += period;
         //       displayResult(display);
         //    }
         //    return;
         //    break;

         case "AC":
            reset(value);
            return;
            break;

         case "C":
            let removeLast = display.split("");
            removeLast.length >= 2 ? removeLast.pop() : reset(value);
            display = removeLast.join("");

            displayResult(display, value);
            return;
            break;

         case "=":
            if (operator) {
               num1 = getDisplay().innerText.split(operator).shift();
               num2 = getDisplay().innerText.split(operator).pop();

               calculate(num1, num2, operator);
            }
            return;
            break;

         default:
            displayResult(value);

            return;
            break;
      }
   });
});
