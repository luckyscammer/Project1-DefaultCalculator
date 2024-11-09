import History from "./History.js";
import getOperation from "./getOperation.js";
import getExpression from "./getExpression.js";
import { operationSqrt, operationSquare, operationChange } from "./operationHandlers.js"

let results = History.getResults();
let currentNumber = "";
let operation = "";
let historyText = "";
let numberPressed = false;
let floatPointPressed = false;
let lastPressedButton = "";

const calculatorInput = document.querySelector(".calculator--input input");
const calculatorHistory = document.querySelector(".calculator--history");
const historyInputText = document.querySelector(".history--text");
const calculatorButtons = document.querySelector(".calculator--buttons");
const historyContainer = calculatorHistory.querySelector(".calculator--history ul");

calculatorButtons.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    const classList = Array.from(target.classList);
    const operationCheck = ["+", "-", "*", "/", "%"].some(op => historyText.endsWith(op));
    const operationIncludes = ["+", "-", "*", "/", "%"].some(op => historyText.includes(op));

    if (!target) return;

    if (target.classList.contains("operation")) {
        numberPressed = false;
        floatPointPressed = false;
        const specificClass = classList.find(cls => cls.startsWith("button--"));
        operation = getOperation(specificClass);

        if (["+", "-", "*", "/", "%"].includes(operation)) {
            if (currentNumber.endsWith(".")) {
                currentNumber = currentNumber.slice(0, -1);
                updateInput();
            }

            if (
                (historyText === "" && currentNumber !== "") ||
                operationCheck
            ) {
                historyText = `${currentNumber} ${operation}`
            }

            updateHistoryText()

        } else if (["^", "sqrt", "+-", "."].includes(operation)) {
            if (operation !== "." && currentNumber.endsWith(".")) {
                currentNumber = currentNumber.slice(0, -1);
                updateInput();
            }

            if (operation === "+-") {
                currentNumber = operationChange(Number.parseFloat(currentNumber)).toString()
                updateInput();

            } else if (operation === "^") {
                historyText += `${currentNumber} ^ 2`;
                currentNumber = operationSquare(currentNumber).toString();
                addHistory(historyText, currentNumber);

                updateHistoryText();
                historyText = "";
                updateInput();

            } else if (operation === "sqrt") {
                historyText += `sqrt(${currentNumber})`;
                currentNumber = operationSqrt(currentNumber).toString();
                addHistory(historyText, currentNumber);

                updateHistoryText();
                historyText = "";
                updateInput();

            } else if (operation === "." && !floatPointPressed) {
                floatPointPressed = true;
                numberPressed = true;
                if (currentNumber === "") {
                    currentNumber = "0.";
                } else if (!currentNumber.includes(".")) {
                    currentNumber += ".";
                }
                updateInput();
            }

        } else if (operation === "bin") {
            historyText = "";
            currentNumber = "";

            updateInput();
            updateHistoryText();

            if (lastPressedButton === "bin") {
                clearHistory();
            }

            lastPressedButton = "bin";
            return;

        } else if (operation === "del") {
            if (currentNumber.length > 0) {
                if (currentNumber.slice(-1) === '.') {
                    floatPointPressed = false;
                }
                currentNumber = currentNumber.slice(0, -1)
                updateInput()
            }

        } else if (operation === "=") {
            if (currentNumber.endsWith(".")) {
                currentNumber = currentNumber.slice(0, -1);
                updateInput();
            }
            
            if (operationIncludes) {
                historyText += ` ${currentNumber}`;
                const result = getExpression(historyText);
                addHistory(historyText, result.toString());

                currentNumber = result.toString();
                updateHistoryText();
                historyText = "";
                updateInput();
            }
        }

    } else if (target.classList.contains("number")) {
        const pressedNumber = target.innerText;

        if (numberPressed) {
            currentNumber += pressedNumber;
        } else if (!numberPressed) {
            numberPressed = true;
            currentNumber = pressedNumber;
        }

        updateInput()
    }

    if (!target.classList.contains("bin")) {
        lastPressedButton = target.classList.contains("operation") ? operation : "";
    }
});

calculatorHistory.addEventListener("click", (event) => {
    const removeTarget = event.target.closest(".remove");

    if (removeTarget) {
        const index = parseInt(removeTarget.getAttribute("data-index"), 10);

        if (!isNaN(index)) {
            removeHistory(index);
        }
    }

    const resultTarget = event.target.closest(".result");

    if (resultTarget) {
        const index = parseInt(resultTarget.closest("li").querySelector(".remove").getAttribute("data-index"), 10);

        if (!isNaN(index)) {
            const resultItem = results[index];

            if (resultItem) {
                currentNumber = resultItem.result;
                historyText = "";
                updateInput();
                updateHistoryText();
            }
        }
    }
});


function updateInput() {
    calculatorInput.value = currentNumber;
}

function updateHistoryText() {
    historyInputText.innerText = historyText;
}

function updateHistory() {
    results = History.getResults();
    historyContainer.innerHTML = "";

    results.forEach((item, index) => {
        const li = document.createElement("li")
        li.className = `history--element-${index + 1}`;
        li.innerHTML = `
            <button class="remove" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
            <div class="history--number--container">
                <p>${item.operation}</p>
                <button class="result">${item.result}</button>
            </div>
        `;
        historyContainer.prepend(li);
    });
}

function addHistory(operation, result) {
    History.add(operation, result);
    updateHistory();
}

function removeHistory(index) {
    History.remove(index);
    updateHistory();
}

function clearHistory() {
    History.clear();
    updateHistory();
}

updateHistory();
