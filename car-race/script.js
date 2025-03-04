const score = document.querySelector(".score");
const startBtn = document.querySelector(".start");
const gameArea = document.querySelector(".gameArea");
const pauseScreen = document.querySelector("#pauseScreen");
const pauseScore = document.querySelector("#pauseScore");

let player = {
  speed: 5,
  score: 0,
  isGamePaused: false,
};

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
  Space: false,
};

let lines = [];
let enemies = [];
let car;

startBtn.addEventListener("click", () => start(1));
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
  if (e.code === "Space") {
    player.isGamePaused = !player.isGamePaused;
    if (player.isGamePaused) {
      pauseScreen.classList.remove("hide");
      pauseScore.textContent = `Score: ${player.score}`;
    } else {
      pauseScreen.classList.add("hide");
      if (player.start) {
        window.requestAnimationFrame(playGame);
      }
    }
  }
}

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function moveLines() {
  lines.forEach(function (item) {
    if (item.y >= 1500) {
      item.y -= 1500;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveEnemy() {
  enemies.forEach(function (item) {
    if (isCollide(car, item)) {
      console.log("HIT");
      endGame();
    }
    if (item.y >= 1500) {
      item.y = -600;
      item.style.left = Math.floor(Math.random() * 350) + "px";
      item.style.backgroundColor = randomColor();
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function playGame() {
  if (player.isGamePaused) {
    return;
  }
  moveLines();
  moveEnemy();
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
    }

    car.style.left = `${player.x}px`;
    car.style.top = `${player.y}px`;

    player.score++;
    score.textContent = `Score: ${player.score}`;

    if (player.score % 1000 === 0) {
      player.speed += 1;
    }
  }

  window.requestAnimationFrame(playGame);
}

function endGame() {
  player.start = false;
  const highScore = localStorage.getItem("highScore");
  if (player.score > highScore) {
    localStorage.setItem("highScore", player.score);
    score.innerHTML = `New High Score! Score: ${player.score}`;
  } else {
    score.innerHTML = `Game Over<br>Score was ${player.score}`;
  }
  gameArea.classList.add("fadeOut"); // Add fade out animation
  startBtn.classList.remove("hide");
}

function start(level) {
  gameArea.classList.remove("fadeOut"); // Remove fade out animation
  startBtn.classList.add("hide");
  gameArea.innerHTML = "";

  player.start = true;
  player.speed = 5 + (level - 1) * 2;
  player.score = 0;

  for (let x = 0; x < 10; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.y = x * 150;
    div.style.top = `${div.y}px`;
    gameArea.appendChild(div);
    lines.push(div);
  }

  car = document.createElement("div");
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  const numEnemies = 3 + level;

  for (let x = 0; x < numEnemies; x++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.innerHTML = `<br>${x + 1}`;
    enemy.y = (x + 1) * 600 * -1;
    enemy.style.top = `${enemy.y}px`;
    enemy.style.left = `${Math.floor(Math.random() * 350)}px`;
    enemy.style.backgroundColor = randomColor();
    gameArea.appendChild(enemy);
    enemies.push(enemy);
  }

  window.requestAnimationFrame(playGame);
}

function randomColor() {
  let hex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + ("000000" + hex).slice(-6);
}
