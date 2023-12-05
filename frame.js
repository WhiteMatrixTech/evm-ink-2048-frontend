document.body.innerHTML = `<body>
        <style>
        /* pc  */
        html {
            scroll-behavior: smooth;
            overscroll-behavior: none;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0px;
            padding: 0px;
            /* background: linear-gradient(to bottom left, #B2EBF2, #0D47A1); */
            /* background: linear-gradient(to bottom left, #E1BEE7, #4A148C); */
            /* background: linear-gradient(to bottom left, #C8E6C9, #1B5E20); */
            /* background: linear-gradient(to bottom left, #F8BBD0, #4bccdd, #4A148C); */
            background: linear-gradient(45deg, #ff66cc, #66ccff, #9933ff) no-repeat center center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            /* height: 100%; */
            width: 100%;
            color: white;
        }

        body::-webkit-scrollbar {
            width: 7px;
        }

        body::-webkit-scrollbar-track {
            background: transparent;
        }

        body::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: rgb(170, 170, 168);
        }

        #board {
            height: 30rem;
            width: 30rem;
            background-color: #EAEAEA;
            top: 5vmin;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-wrap: wrap;
            margin: 0px auto;
        }

        #name {
            width: 200px;
            margin-top: 20px;
            font-weight: bold;
            font-family: 'Times New Roman', Times, serif;
            font-size: 4rem;
        }

        #score {
            border-top: 2px solid white;
            padding-top: 10px;
            width: 400px;
            margin: 10px;
            font-size: 1.5rem;
        }

        .description {
            font-size: 1rem;
            margin: 5vmin;
        }

        .tile {
            color: #ffffff;
            background-color: #7c7c7c;
            width: 7rem;
            height: 7rem;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 2.5rem;
        }

        @keyframes newTileAnimation {
            0% {
                transform: scale(0);
            }

            100% {
                transform: scale(1);
            }
        }

        @keyframes movementAnimation {
            0% {
                transform: translate(0, 0);
            }

            100% {
                transform: translate(var(--x-translation), var(--y-translation));
            }
        }

        #text {
            position: relative;
            margin-top: 50px;
            text-align: left;
        }

        #list {
            margin: 30px;
            text-align: left;
        }

        .x2 {
            background-color: #d9a2c9;
            color: #ffffff;
        }

        .x4 {
            background-color: #a2c9d9;
            color: #ffffff;
        }

        .x8 {
            background-color: #c9d9a2;
            color: #ffffff;
        }

        .x16 {
            background-color: #c9d9a2;
            color: #ffffff;
        }

        .x32 {
            background-color: #d9a2a2;
            color: #ffffff;
        }

        .x64 {
            background-color: #c9d9a2;
            color: #ffffff;
        }

        .x128 {
            background-color: #a2c9d9;
            color: #ffffff;
        }

        .x256 {
            background-color: #d9a2c9;
            color: #ffffff;
        }

        .x512 {
            background-color: #c9d9a2;
            color: #ffffff;
        }

        .x1024 {
            background-color: #c9d9a2;
            color: #ffffff;
        }

        .x2048 {
            background-color: #d9a2a2;
            color: #ffffff;
        }

        #over {
            background: rgba(0, 0, 0, 0.4);
            width: 30rem;
            height: 30rem;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            position: absolute;
            z-index: 2;
            margin: auto auto;
            font-size: 2rem;
            top: 0vw;
        }

        #over-text {
            top: 5px;
            display: inline-block;
            position: absolute;
        }

        #btns {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            top: 21vw;
            position: absolute;
        }

        .btn {
            font-size: 1.5rem;
            width: 8rem;
            height: 4rem;
            margin: 2rem;
            color: white;
            background-color: grey;
            border: 2px solid white;
            border-radius: 1rem;
        }


        /* mobile  */
        @media only screen and (max-width: 1081px) {
            body {
                width: auto;
            }

            #name {
                font-size: 4rem;
            }

            .description {
                width: 60vw;
            }

            #list {
                width: 60vw;
            }

            #text {
                margin-top: 20vw;
            }

            #score {
                font-size: 3rem;
            }

            #board {
                width: 70vw;
                height: 70vw;
                top: 10vw;
            }

            #over {
                font-size: 1.5rem;
                width: 70vw;
                height: 70vw;
            }

            .tile {
                width: 16.5vw;
                height: 16.5vw;
                font-size: 2rem;
            }

            #btns {
                top: 40vw;
            }

            .btn {
                font-size: 1.4rem;
                width: 22vw;
                height: 10vw;
            }
        }
    </style>
<span id="name">2048</span>
<p id="score"></p>
<div id="board">
    <div id="over">
        <h1 id="over-text">Game Over!</h1>
        <div id="btns">
            <button class="btn" onclick="tryAgain()">Try Again</button>
            <button class="btn" onclick="share()">Share</button>
        </div>
    </div>
</div>
<div id="text">
    <h1 style="margin-left: 30px;">Rules to Play the Game:</h1>
    <ol type="number" id="list">
        <li>The game is played on a 4x4 grid, totaling 16 squares.</li>
        <li>Each square can hold a tile with a number, initially starting with two tiles randomly populated with the
            numbers 2 or 4.</li>
        <li>The objective of the game is to reach the 2048 tile by combining tiles with the same numbers</li>
        <li>You can move the tiles in four directions: up, down, left, or right. This can be done using arrow keys
            on a keyboard or swipe gestures on a touchscreen device.</li>
        <li>When you make a move, all the tiles on the grid will slide as far as possible in the chosen direction.
        </li>
        <li>If two tiles with the same number collide as a result of a move, they will merge into a new tile with
            the sum of their values.</li>
        <li>After each move, a new tile (either 2 or 4) will appear randomly on an empty square of the grid.</li>
        <li>The game ends if the entire grid is filled with tiles and there are no more valid moves available.</li>
        <li>Your score is based on the sum of all merged tiles during the game.</li>
        <li>The highest possible tile is 2048, but you can continue playing after reaching it to achieve even higher
            numbers and aim for a higher score.</li>
        Remember, strategic planning and careful consideration of each move are crucial to success in 2048. Good
        luck and enjoy the game!
    </ol>
    <h1 style="margin-left: 30px;">About</h1>
    <p class="description">
        2048 is an addictive and challenging puzzle game that will put your strategic thinking and numerical skills
        to the test. The game takes place on a 4x4 grid, where your objective is to combine tiles with the same
        numbers to reach the elusive tile numbered 2048.
    </p>
    <p class="description">
        At the beginning of the game, you are presented with two tiles randomly populated with the numbers 2 or 4.
        Using arrow keys or swipe gestures, you can move all the tiles on the grid in four directions: up, down,
        left, or right. As you make a move, all tiles slide as far as possible in the chosen direction, merging with
        any adjacent tile of the same number.
    </p>
    <p class="description">
        The true challenge lies in the limited space available on the grid, as well as the strategic decision-making
        involved in every move. You must carefully plan your moves to avoid filling up the grid without creating
        opportunities for merging tiles. Each move adds a new tile to the grid, further complicating your task.
    </p>
    <p class="description">
        Your goal is to reach the tile numbered 2048 by merging smaller tiles. However, the game doesn't end there.
        If you manage to reach 2048, you can continue playing to achieve even higher numbers and strive for the
        highest possible score.
    </p>
    <p class="description">
        2048 offers a simple and intuitive interface, with visually appealing and distinctively colored tiles
        representing different numbers. The game provides a stimulating experience that combines logic, strategy,
        and patience, making it suitable for players of all ages and skill levels.
    </p>
    <p class="description">
        With its addictive gameplay, 2048 provides endless hours of entertainment and brain-teasing challenges. Can
        you navigate the grid, make the right moves, and conquer the ultimate numerical goal of 2048?
    </p>
</div>
</body>`;
var board;
var score = 0;
var rows = 4;
var columns = 4;
console.log('seed',window.seedId);
window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    // [2, 4, 8, 16],
    // [32, 64, 128, 256],
    // [512, 1024, 2, 32],
    // [4, 2, 16, 8]
  ];

  document.getElementById("score").innerHTML = "Score: " + score;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<div></div>
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
}
function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }
  let found = false;
  while (!found) {
    //random r, c
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      tile.style.animation = "newTileAnimation 0.3s";
      tile.addEventListener("animationend", () => {
        tile.style.animation = "";
      });
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; // clear the classList
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    if (num <= 1024) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x2048");
    }
  }
}

// animation for tile and gameover function conditionals
function slideTile(tile, r, c) {
  const tileElement = document.getElementById(
    r.toString() + "-" + c.toString()
  );
  const initialX = tileElement.offsetLeft;
  const initialY = tileElement.offsetTop;
  const finalX = c * 120;
  const finalY = r * 120;
  const deltaX = finalX - initialX;
  const deltaY = finalY - initialY;

  tile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  tile.style.transition = "transform 0.3s";
  tile.addEventListener("transitionend", () => {
    tile.style.transform = "";
    tile.style.transition = "";
  });
  setTimeout(() => {
    tile.style.transform = "translate(0, 0)";
    if (gameOver()) {
      gameOver();
      document.getElementById("over").style.display = "flex";
    }
  }, 10);
}

// swipe event listener
const swipeElement = document.getElementById("board");
let startX, startY;
swipeElement.addEventListener("touchstart", touchStart, false);
swipeElement.addEventListener("touchend", touchEnd, false);
function touchStart(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}
function touchEnd(event) {
  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      console.log("Right swipe detected");
      slideRight();
    } else {
      console.log("Left swipe detected");
      slideLeft();
    }
  } else {
    if (deltaY > 0) {
      console.log("Down swipe detected");
      slideDown();
    } else {
      console.log("Up swipe detected");
      slideUp();
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (document.getElementById("over").style.display == "flex") {
    return;
  } else if (
    e.code == "ArrowLeft" ||
    e.code == "ArrowRight" ||
    e.code == "ArrowUp" ||
    e.code == "ArrowDown"
  ) {
    e.preventDefault(); // Disable default arrow key behavior (scrolling)
  }

  if (e.code == "ArrowLeft") {
    slideLeft();
  } else if (e.code == "ArrowRight") {
    slideRight();
  } else if (e.code == "ArrowUp") {
    slideUp();
  } else if (e.code == "ArrowDown") {
    slideDown();
  }
});

// Disable scroll on swipe
document.getElementById("board").addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  //[0,2,2,2]
  row = filterZero(row); // get rid of zeroes [2,2,2]
  // slide
  for (let i = 0; i < row.length; i++) {
    // check every 2
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      document.getElementById("score").innerHTML = "Score: " + score;
    } else if (row[i] == 2048) {
      document.getElementById("over-text").innerHTML = "You Won!";
      document.getElementById("over").style.display = "flex";
    } // [2, 2, 2] --> [4, 0, 2]
  }

  row = filterZero(row); // [4,2]

  while (row.length < columns) {
    row.push(0);
  } // [4,2,0,0]

  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      tile.style.transform = "translateY(tile.offsetLeft)";
      updateTile(tile, num);
      slideTile(tile, r, c);
    }
  }
  setTwo();
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
      slideTile(tile, r, c);
    }
  }
  setTwo();
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    board[0][c] = row[0];
    board[1][c] = row[1];
    board[2][c] = row[2];
    board[3][c] = row[3];

    for (let r = 0; r < columns; r++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
      slideTile(tile, r, c);
    }
  }
  setTwo();
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    board[0][c] = row[3];
    board[1][c] = row[2];
    board[2][c] = row[1];
    board[3][c] = row[0];

    for (let r = 0; r < columns; r++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
      slideTile(tile, r, c);
    }
  }
  setTwo();
}
function tryAgain() {
  document.getElementById("over").style.display = "none";
  score = 0;
  document.querySelectorAll(".tile").forEach((e) => e.remove());
  setGame();
}
function share() {
  const shareData = {
    title: "2048",
    text: "🎮 Check out this addictive web game, 2048! 🧩🔢 Merge numbered tiles, strategize, and aim for the elusive 2048 tile. Challenge your mind and test your skills in this captivating puzzle adventure. Can you conquer the board and achieve the highest score? Play now and see if you have what it takes to become a 2048 champion! 💪💯 #2048 #puzzlegame #addictivefun #brainteaser",
    url: "http://blaisepascal287.github.io/game/2048.html",
  };
  navigator.share(shareData);
}
function gameOver() {
  // Check if the player has achieved the 2048 tile
  if (board.some((row) => row.includes(2048))) {
    document.getElementById("over-text").innerHTML = "You Won!";
    return true;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const currentTile = board[r][c];
      if (currentTile == 0) {
        return false; // There is an empty tile, game is not over
      }
      if (
        (r > 0 && board[r - 1][c] == currentTile) ||
        (r < rows - 1 && board[r + 1][c] == currentTile) ||
        (c > 0 && board[r][c - 1] == currentTile) ||
        (c < columns - 1 && board[r][c + 1] == currentTile)
      ) {
        return false; // There is a possible merge, game is not over
      }
    }
  }
  document.getElementById("over-text").innerHTML = "Game Over!";
  return true;
}
