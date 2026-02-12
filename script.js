const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 15;
let snake = [{ x: 150, y: 150 }];
let direction = "right";
let gameStarted = false;

let apple = randomApple();
let eatCount = 0;

function randomApple() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function changeDirection(dir) {
  if (
    (dir === "left" && direction !== "right") ||
    (dir === "right" && direction !== "left") ||
    (dir === "up" && direction !== "down") ||
    (dir === "down" && direction !== "up")
  ) {
    direction = dir;
    gameStarted = true;
  }
}

function draw() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apple
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, box, box);

  // Snake
  ctx.fillStyle = "lime";
  snake.forEach(p => ctx.fillRect(p.x, p.y, box, box));

  let head = { ...snake[0] };

  if (direction === "right") head.x += box;
  if (direction === "left") head.x -= box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  // Duvara çarpma
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height
  ) {
    alert("Oyun Bitti 💀");
    location.reload();
    return;
  }

  // Elma yeme
  if (head.x === apple.x && head.y === apple.y) {
    eatCount++;
    apple = randomApple();

    if (eatCount === 2) {
      window.location.href = "image.jpg"; // senin foto
      return;
    }
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

setInterval(draw, 200);
