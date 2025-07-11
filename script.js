let display = document.getElementById("display");
let clickSound = document.getElementById("clickSound");

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function isOperator(char) {
  return ['+', '-', '*', '/', '^'].includes(char);
}

function press(val) {
  playClickSound();
  let current = display.value;
  let lastChar = current.slice(-1);

  if (isOperator(val)) {
    if (current === "" || isOperator(lastChar)) {
      display.value = current.slice(0, -1) + val;
      return;
    }
  }

  if (val === "%") {
    display.value += "/100";
    return;
  }

  if (val === "^") {
    display.value += "**";
    return;
  }

  display.value += val;
}

function clearDisplay() {
  playClickSound();
  display.value = "";
}

function backspace() {
  playClickSound();
  display.value = display.value.slice(0, -1);
}

function calculate() {
  playClickSound();
  try {
    let result = eval(display.value);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (/[\d+\-*/().^]/.test(key)) {
    if (key === "^") press("^");
    else press(key);
  }
  if (key === "Enter") calculate();
  if (key === "Escape" || key.toLowerCase() === "c") clearDisplay();
  if (key === "Backspace") backspace();
});
