document.body.innerHTML = `<body>
<style>
    html {
        scroll-behavior: smooth;
        overscroll-behavior: none;
    }

    body {
        font-family: 'Baloo 2', sans-serif;
        margin: 0px;
        padding: 16px;
        background: url('https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/bg.png') #b7effe no-repeat top center/cover;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        color: white;
        min-height: 100vh;
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

    .titleImg {
        width: 386px;
        margin-top: 44px;
    }

    .scoreContainer {
        margin: 40px auto;
        position: relative;
        width: 100%;
        max-width: 533px;
        height: 68px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #236f81;
        border-radius: 20px;
        overflow: hidden;
    }

    .scoreContainer img {
        position: absolute;
        left: 1px;
        top: 50%;
        transform: translateY(-50%);
        width: 27%;
        min-width: 144px;
    }

    #score {
        font-size: 40px;
    }

    #gameContainer {
        width: 100%;
        max-width: 533px;
        position: relative;
    }

    #chessBoardBg {
        position: absolute;
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
        background-size: contain;
        width: 100%;
    }

    #frame {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: contain;
    }

    #game {
        position: absolute;
        display: grid;
        aspect-ratio: 1;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        column-gap: 1.17%;
        row-gap: 0.98%;
        overflow: hidden;
        border-radius: 8px;
        padding: 3.32%;
        box-sizing: border-box;
    }

    .description {
        font-size: 1rem;
        margin: 5vmin;
    }

    .tile {
        display: flex;
        aspect-ratio: 1;
        width: 100%;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
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

    #doneContainer {
        display: flex;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #02070BA8;
        justify-content: center;
        align-items: center;
    }

    #done {
        width: 100%;
        max-width: 533px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: none;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 10;
    }

    #done #tryAgain {
        cursor: pointer;
        z-index: 100;
    }

    .doneBg {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        animation-name: spin;
        animation-duration: 40000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .doneText {
        height: 11.37%;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 100;
    }

    .winOrLoseImgContainer {
        width: 100%;
        aspect-ratio: 0.97;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .win .doneBg {
        background-image: url('https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/win_bg.webp');
    }

    .win .doneText {
        background-image: url('https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/win_text.svg');
        width: 46.37%;
    }

    .lose .doneBg {
        background-image: url('https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/lose_bg.webp');
    }

    .lose .doneText {
        background-image: url('https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/lose_text.svg');
        width: 59.45%;
    }

    @media (max-width: 648px) {
        .titleImg {
            max-width: 300px;
            width: calc(100% - 32px);
            margin-top: 44px;
        }

        #score {
            font-size: 30px;
            margin-left: 40px;
        }
    }
</style>
<img class="titleImg" src="https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/logo.svg" />
<div class="scoreContainer">
    <img src="https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/score.png" />
    <span id="score"></span>
</div>
<div id="gameContainer">
    <!-- 背景图层 -->
    <div id="chessBoardBg"></div>
    <div id="frame"></div>
    <div id="game">

        <div id="done" class="">
            <div id="doneContainer">
            </div>
            <div class="winOrLoseImgContainer">
                <div class="doneBg"></div>
                <div class="doneText"></div>
            </div>
            <img src="https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/assets/try_again.png"
                alt="try again" id="tryAgain" width="232" onclick="tryAgain()" />
        </div>
    </div>

</div>
</body>`;

const baseUrl =
  "https://inscription-2048-frontend.s3.ap-northeast-1.amazonaws.com/";
const assetFolder = baseUrl + "assets/";
const gameConfig = getGameConfig(window.seedId);
const chessBgUrl = baseUrl + gameConfig[0] + "_Chessboard_BG.png";
const frameUrl = baseUrl + gameConfig[3] + "_Frame.png";
let board;
let score = 0;
let rows = 4;
let columns = 4;
window.onload = function () {
  updateStyleInDiffFrame(gameConfig[3]);
  setGame();
  prefetchAssets(gameConfig);
  if (window.self !== window.top) {
    if (window.self !== window.top) {
      const titleImgEle = document.getElementsByClassName("titleImg")[0];
      const scoreEle = document.getElementsByClassName("scoreContainer")[0];
      if (titleImgEle) {
          titleImgEle.style.display = 'none'
      }
      if (scoreEle) {
          scoreEle.style.display = 'none'
      }
  }
  }
};

function preloadImages(imageArray) {
  for (let i = 0; i < imageArray.length; i++) {
    const img = new Image();
    img.src = imageArray[i];
  }
}

function prefetchAssets(gameConfig) {
  const nums = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
  const tileBgs = nums.map((num) => {
    return baseUrl + gameConfig[1] + "_Tile_BG_" + num + ".png";
  });
  const fonts = nums.map((num) => {
    return baseUrl + gameConfig[2] + "_Font_" + num + ".png";
  });
  const otherAssets = [
    "win_bg.webp",
    "win_text.svg",
    "lose_bg.webp",
    "lose_text.svg",
    "try_again.png",
  ].map((item) => assetFolder + item);
  preloadImages([...tileBgs, ...fonts, ...otherAssets]);
}

function getGameConfig(seedId) {
  const gameConfig = window.allSeeds[seedId];
  return gameConfig;
}

function updateStyleInDiffFrame(frame) {
  let contentAreaWidth = "";
  let contentAreaLeftOffset = "";
  let contentAreaTopOffset = "";
  let frameAspectRadio = "";
  if (frame === "A" || frame === "C" || frame === "D" || frame === "K") {
    contentAreaWidth = "97.34%";
    contentAreaLeftOffset = "1.33%";
    contentAreaTopOffset = "1.33%";
    frameAspectRadio = "1";
  } else if (frame === "B") {
    contentAreaLeftOffset = "4.63%";
    contentAreaWidth = "91.27%";
    contentAreaTopOffset = "6.55%";
    frameAspectRadio = "0.9672";
  } else if (frame === "E") {
    contentAreaLeftOffset = "6.31%";
    contentAreaWidth = "87.37%";
    contentAreaTopOffset = "12.92%";
    frameAspectRadio = "0.9832";
  } else if (frame === "F") {
    contentAreaLeftOffset = "7.57%";
    contentAreaWidth = "84.21%";
    contentAreaTopOffset = "9.42%";
    frameAspectRadio = "1.0611";
  } else if (frame === "G") {
    contentAreaWidth = "97.34%";
    contentAreaLeftOffset = "1.33%";
    contentAreaTopOffset = "4.77%";
    frameAspectRadio = "0.9651";
  } else if (frame === "H") {
    contentAreaWidth = "86.78%";
    contentAreaLeftOffset = "11.53%";
    contentAreaTopOffset = "9.74%";
    frameAspectRadio = "1.0261";
  } else if (frame === "I") {
    contentAreaWidth = "93.6%";
    contentAreaLeftOffset = "3.11%";
    contentAreaTopOffset = "3.1%";
    frameAspectRadio = "0.9982";
  } else if (frame === "J") {
    contentAreaWidth = "97.34%";
    contentAreaLeftOffset = "1.33%";
    contentAreaTopOffset = "12.92%";
    frameAspectRadio = "0.8826";
  } else if (frame === "L") {
    contentAreaWidth = "82.71%";
    contentAreaLeftOffset = "8.72%";
    contentAreaTopOffset = "8.66%";
    frameAspectRadio = "1.0509";
  }
  const gameContainerElement = document.getElementById("gameContainer");
  gameContainerElement.style.aspectRatio = frameAspectRadio;
  if (frame === "H") {
    gameContainerElement.style.marginLeft = "-40px";
  }

  const chessBoardBgElement = document.getElementById("chessBoardBg");
  chessBoardBgElement.style.backgroundImage = "url('" + chessBgUrl + "')";
  chessBoardBgElement.style.left = contentAreaLeftOffset;
  chessBoardBgElement.style.top = contentAreaTopOffset;
  chessBoardBgElement.style.width = contentAreaWidth;

  const frameElement = document.getElementById("frame");
  frameElement.style.backgroundImage = "url('" + frameUrl + "')";

  const gameElement = document.getElementById("game");
  gameElement.style.left = contentAreaLeftOffset;
  gameElement.style.top = contentAreaTopOffset;
  gameElement.style.width = contentAreaWidth;
}

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  document.getElementById("score").innerHTML = score;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("game").append(tile);
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
      updateTile(tile, 2);
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
    tile.innerHTML =
      "<img src='" +
      baseUrl +
      gameConfig[2] +
      "_Font_" +
      num +
      ".png' style='height:23.5%' />";
    tile.style.backgroundImage =
      "url('" + baseUrl + gameConfig[1] + "_Tile_BG_" + num + ".png'";
    if (num <= 1024) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x2048");
    }
  } else {
    tile.style.backgroundImage =
      "url('" + baseUrl + gameConfig[0] + "_Tile_BG_Default.png'";
  }
}

// animation for tile and gameover function conditionals
function slideTile(tile, r, c) {
  setTimeout(() => {
    tile.style.transform = "translate(0, 0)";
    if (gameOver()) {
      gameOver();
      document.getElementById("done").style.display = "flex";
    }
  }, 10);
}

// swipe event listener
const swipeElement = document.getElementById("game");
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
  if (document.getElementById("done").style.display == "flex") {
    return;
  }
  if (
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
document.getElementById("game").addEventListener(
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
      document.getElementById("score").innerHTML = score;
    } else if (row[i] == 2048) {
      const doneEle = document.getElementById("done");
      doneEle.style.display = "flex";
      doneEle.className = "win";
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
  document.getElementById("done").style.display = "none";
  score = 0;
  document.querySelectorAll(".tile").forEach((e) => e.remove());
  setGame();
}

function gameOver() {
  // Check if the player has achieved the 2048 tile
  if (board.some((row) => row.includes(2048))) {
    document.getElementById("done").className = "win";
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
  document.getElementById("done").className = "lose";
  return true;
}