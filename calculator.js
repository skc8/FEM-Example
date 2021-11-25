let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

document.querySelector(".calc-buttons").addEventListener("click", function(event) {
  buttonClick(event.target.innerText); // if you were reading from an input, it'd be 'value' instead of 'innerText'
})

function buttonClick(value) {
  if (isNaN(parseInt(value))) { // parseInt changes strings into integers or NaN
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender(); // this needs to be here so that it happens after every button click
}

function rerender() {
  screen.innerText = buffer;
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value; // QUESTION: Is this concatenation bc buffer is a string??
  }
}

function handleSymbol(value) {
  switch (value) {
    case 'C':
      buffer = "0";
      runningTotal = 0
      previousOperator = null;
      break;
    case '=':
      if (previousOperator === null) {
        return; // QUESTION: IS THE ELSE IMPLIED AFTER RETURN??
      } 
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal; //buffer is a string, and its good to keep things the same type
      runningTotal = 0
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length-1);
      }
      break;
    default: 
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer); // this is a representation of what is on the screen
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator ==="÷") {
    runningTotal /= intBuffer;
  } else {
    runningTotal *= intBuffer;
  }
}