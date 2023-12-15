const fs = require("fs");
const path = require("path");
function generate() {
  const total = 9998;
  const attrCountLimitMap = {
    A: 1600,
    B: 1600,
    C: 1600,
    D: 1200,
    E: 1200,
    F: 1200,
    G: 395,
    H: 395,
    I: 395,
    J: 395,
    K: 9,
    L: 9,
  };
  function checkResults(result) {
    console.log("result", result);
    const attributes = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
    ];

    //分析第一个属性里面的取值分布
    const chessBgCountMap = {};
    const tileBgCountMap = {};
    const fontCountMap = {};
    const frameCountMap = {};
    for (const attr of attributes) {
      chessBgCountMap[attr] =
        result.filter((item) => item[0] === attr)?.length || 0;
      tileBgCountMap[attr] =
        result.filter((item) => item[1] === attr)?.length || 0;
      fontCountMap[attr] =
        result.filter((item) => item[2] === attr)?.length || 0;
      frameCountMap[attr] =
        result.filter((item) => item[3] === attr)?.length || 0;
    }
    console.log("chessBgCountMap", chessBgCountMap);
    console.log("tileBgCountMap", tileBgCountMap);
    console.log("fontCountMap", fontCountMap);
    console.log("frameCountMap", frameCountMap);
  }
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function getAttrValue(num) {
    let value = "";
    if (num <= 1600) {
      value = "A";
    } else if (num <= 1600 * 2) {
      value = "B";
    } else if (num <= 1600 * 3) {
      value = "C";
    } else if (num <= 1600 * 3 + 1200) {
      value = "D";
    } else if (num <= 1600 * 3 + 1200 * 2) {
      value = "E";
    } else if (num <= 1600 * 3 + 1200 * 3) {
      value = "F";
    } else if (num <= 1600 * 3 + 1200 * 3 + 395) {
      value = "G";
    } else if (num <= 1600 * 3 + 1200 * 3 + 395 * 2) {
      value = "H";
    } else if (num <= 1600 * 3 + 1200 * 3 + 395 * 3) {
      value = "I";
    } else if (num <= 1600 * 3 + 1200 * 3 + 395 * 4) {
      value = "J";
    } else if (num <= 1600 * 3 + 1200 * 3 + 395 * 4 + 9) {
      value = "K";
    } else if (num <= 1600 * 3 + 1200 * 3 + 395 * 4 + 9 * 2) {
      value = "L";
    }
    return value;
  }

  const chessBgArray = [];
  const tileBgArray = [];
  const fontArray = [];
  const frameArray = [];
  for (let i = 1; i <= total; i++) {
    const value = getAttrValue(i);
    chessBgArray.push(value);
    tileBgArray.push(value);
    fontArray.push(value);
    frameArray.push(value);
  }
  const randomChessBgArray = shuffle(chessBgArray);
  const randomTileBgArray = shuffle(tileBgArray);
  const randomFontArray = shuffle(fontArray);
  const randomFrameArray = shuffle(frameArray);
  const combinations = [];
  for (let i = 0; i < total; i++) {
    const combination =
      randomChessBgArray[i] +
      randomTileBgArray[i] +
      randomFontArray[i] +
      randomFrameArray[i];
    combinations.push(combination);
  }
  const uniqueCombinations = Array.from(new Set(combinations));

  if (
    uniqueCombinations.length === combinations &&
    !uniqueCombinations.includes("KKKK") &&
    !uniqueCombinations.includes("LLLL")
  ) {
    //代表生成结果符合要求，执行检查
    console.log("符合要求", uniqueCombinations);
    fs.writeFileSync(
      path.resolve(__dirname, "result.js"),
      JSON.stringify(uniqueCombinations)
    );
    checkResults(uniqueCombinations);
    return true;
  } else {
    console.log("不符合要求", uniqueCombinations.length);
    return false;
  }
}
// generate();
let i = 0;
while (!generate()) {
  i++;
  console.log(i);
}
