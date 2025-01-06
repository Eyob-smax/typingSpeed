const arr = [10, 12, 13, 14, 17, 19, 9, 20, 10, 12, 14, 15, 8];
let randomIndex = Math.floor(Math.random() * arr.length);

function getRandomQuete() {
  return fetch(`http://localhost:5000`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

const quoteDisplay = document.querySelector(".quote");
const inputValue = document.querySelector(".quote-input");
const timer = document.querySelector(".timer");
const resetBtn = document.querySelector("#reset-btn");
const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const transition = document.querySelector("#transtion-page");
transition.classList.add("hidden");
const wordNumber = document.querySelector(".word-no");

async function renderQutes() {
  const quotes = await getRandomQuete();

  const quotesBody = quotes.quote.body;

  wordNumber.innerHTML = quotesBody.split(" ").length;

  const character = quotesBody.split("");
  character.forEach((element) => {
    const createElement = document.createElement("span");
    createElement.textContent = element;
    quoteDisplay.appendChild(createElement);
    timerSetUp();
    transition.classList.add("hidden");
  });
}

async function generateNewQuote() {
  return await renderQutes();
}

let allCorrect = false;

inputValue.addEventListener("input", (e) => {
  const arrayInput = inputValue.value.split("");
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  arrayQuote.forEach((span, index) => {
    if (arrayInput[index] === undefined || arrayInput[index] === undefined) {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
      allCorrect = false;
    } else if (span.textContent !== arrayInput[index]) {
      span.classList.add("incorrect");
      allCorrect = false;
      return;
    } else {
      span.classList.add("correct");
      allCorrect = true;
    }
    if (span.classList.contains("incorrect")) {
      allCorrect = false;
      return;
    }
  });
  if (allCorrect && arrayInput.length === arrayQuote.length) {
    timer.innerHTML = 0;

    setTimeout(() => {
      inputValue.value = "";
      quoteDisplay.innerHTML = "";
      transition.classList.remove("hidden");
      generateNewQuote();
    }, 500);
  }
});

let startTime;

function timerSetUp() {
  startTime = new Date();
  setInterval(() => {
    timer.innerHTML = getNewTime();
  }, 1000);
}

function getNewTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

resetBtn.addEventListener("click", () => {
  setTimeout(() => {
    inputValue.value = "";
    quoteDisplay.innerHTML = "";
    generateNewQuote();
  }, 800);
});
let started = false;
startBtn.addEventListener("click", () => {
  document.addEventListener("DOMContentLoaded", renderQutes());
  quoteDisplay.innerHTML = "";
  startBtn.innerHTML = "STOP";
  started = true;
  stopBtn.classList.remove("hidden");
  startBtn.classList.add("hidden");
});
stopBtn.addEventListener("click", () => {
  stopBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
  location.reload();
});

transition.classList.add("hidden");
