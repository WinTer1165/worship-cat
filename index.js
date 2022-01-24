const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const catDimensions = { width: 353 * 1.2, height: 325 * 1.2 };

const levels = {
  5: "Farmer",
  10: "True Essence",
  15: "JR Priest",
  35: "SR Priest",
  65: "Cauldron Strength",
  105: "Cardinal",
  150: "Grandmaster",
  250: "Bishop",
  450: "Half-Saint",
  650: "Pope",
  1000: "Nascent Saint",
  1500: "Great Sage",
  2500: "Great Philosopher",
  3500: "King",
  4500: "Pseudo Immortal",
  10500: "High Immortal",
  20500: "God",
};

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "cat.png";

const loopingCats = 40; //
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200;

const mouseOffset = {
  x: 0,
  y: 0,
};

const movementOffset = {
  x: 0,
  y: 0,
};

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener("mousemove", onMouseMove);

function draw(offset, loopCount) {
  let currentPercentage = (loopingCats - loopCount) / loopingCats;
  context.drawImage(
    image,
    -catDimensions.width / 2 -
      offset / 2 +
      movementOffset.x * currentPercentage,
    -catDimensions.height / 2 -
      offset / 2 +
      movementOffset.y * currentPercentage,
    catDimensions.width + offset,
    catDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x =
    ((e.clientX - window.innerWidth / 2) / window.innerWidth / 2) *
    movementRange;
  mouseOffset.y =
    ((e.clientY - window.innerHeight / 2) / window.innerHeight / 2) *
    movementRange;
}

function lerp(start, end, amount) {
  return start * (1 - amount) + end * amount;
}

function loopDraw() {
  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05);
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05);

  for (let i = loopingCats; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  secondsCount.innerText = newTime;

  if (levels[newTime]) {
    level.innerText = levels[newTime];
  }

  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}
