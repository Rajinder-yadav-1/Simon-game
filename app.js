




let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "red", "purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;

  h3.innerText = ` Level ${level}`;

  //choosing random color
  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);

  btnflash(randomBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over!  Your Score was<b> ${level} <b> <br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor="#1a1a1a";
    }, 150);

    reset();
  }
}

function btnPress() {
  if (started) {
    console.log(this);
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkAns(userSeq.length - 1);
  }
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  if (level > highestScore) {
    highestScore = level;
    updateHighestScore();
  }

  userSeq = [];
  gameSeq = [];
  level = 0;
  started = false;

  document.querySelector("body").style.backgroundColor.remove = "red";

  // Additional reset logic if needed
}

function updateHighestScore() {
  let highestScoreDisplay = document.querySelector("#highest-score");
  highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;
}

