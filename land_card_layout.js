document.body.innerHTML = `<body>
<style>
    body {
        margin: 0;
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        min-height: 100vh;
        background-image: url('https://static.evm.ink/eip155:137/content/0x7b42000889372f1f76256338cf6c04e11f2a2d42c8841567a7ed78091a51a90a:0');
        background-size: cover;
        background-position: center
    }

    .cardFlip {
        width: calc(100vw - 32px);
        max-width: 285px;
        aspect-ratio: 0.7308;
        overflow: visible;
        position: relative;
        transform-style: preserve-3d;
        transition: 2s;
        margin: auto;
    }

    #back {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        backface-visibility: hidden;
        transform: rotateY(180deg);
    }

    #front {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        backface-visibility: hidden;
    }

    .landImg {
        display: block;
        width: 100%;
        aspect-ratio: 1;
    }

    .bottom {
        overflow: hidden;
        width: 100%;
        margin: auto;
        padding: 8px 6px;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        display: flex;
        flex-direction: column;
        row-gap: 11px;
        color: #e5ecf4;
        box-sizing: border-box;
    }

    #back-bottom {
        background-color: #000000;
    }

    .line {
        display: flex;
        align-items: center;
        column-gap: 5px;
    }

    .text {
        transform: scale(0.85);
        transform-origin: left;
    }

    .tip {
        margin-top: 0px;
        width: 200%;
        font-size: 10px;
        transform: scale(0.75);
        transform-origin: left;
    }
</style>
<div class="cardFlip" style="transform:rotateY(0deg)">
    <div id="back">
        <img src="https://static.evm.ink/eip155:137/content/0x8857baa41a23c8d301ee5b91d73a87f23bbc7d2edb3a16f08b03936bcf0b0a4f:0"
            id="back-landImg" class="landImg" />
        <div class='bottom' id="back-bottom">
            <div class="line">
                <img class="chainLogo"
                    src="https://static.evm.ink/eip155:137/content/0x8857baa41a23c8d301ee5b91d73a87f23bbc7d2edb3a16f08b03936bcf0b0a4f:0"
                    width="18" />
                <span class="text owner"></span>
            </div>
            <div class="line">
                <img class="clockLogo"
                    src="https://static.evm.ink/eip155:137/content/0x8857baa41a23c8d301ee5b91d73a87f23bbc7d2edb3a16f08b03936bcf0b0a4f:0"
                    width="17" />
                <span class="text date"></span>
            </div>
            <span class="tip">
                This is a souvenir from Matrix World, not a certificate of
                ownership.
            </span>
        </div>
    </div>
    <div id="front">
        <img src="https://static.evm.ink/eip155:137/content/0x8857baa41a23c8d301ee5b91d73a87f23bbc7d2edb3a16f08b03936bcf0b0a4f:0"
            id="front-landImg" class="landImg" onerror="this.style.display='none';" />
        <div class='bottom' id="front-bottom">
            <div class="line">
                <img class="chainLogo"
                    src="https://static.evm.ink/eip155:137/content/0x8857baa41a23c8d301ee5b91d73a87f23bbc7d2edb3a16f08b03936bcf0b0a4f:0"
                    width="18" />
                <span class="text owner"></span>
            </div>
            <div class="line">
                <img class="clockLogo"
                    src="https://static.evm.ink/eip155:137/content/0x8857baa41a23c8d301ee5b91d73a87f23bbc7d2edb3a16f08b03936bcf0b0a4f:0"
                    width="17" />
                <span class="text date"></span>
            </div>
            <span class="tip">
                This is a souvenir from Matrix World, not a certificate of
                ownership.
            </span>
        </div>
    </div>
</div>
</body>
`
const isEth = window.chainType === "ethereum"
const frontLandImgEle = getEleById('front-landImg')
const frontBottomEle = getEleById('front-bottom')
let frontLandImg = ''
let frontBottomBg = ''

const backLandImgEle = getEleById('back-landImg')
let backLandImg = ''
switch (window.size) {
    case 1:
        frontLandImg = getEvmAssetsLinkByTxHash("0x30048c6e10b4e29dca3c258ec36b87b8ed966ca9b910abeb60a6e93f7dc70fea")
        frontBottomBg = "#117F64"
        backLandImg = getEvmAssetsLinkByTxHash(isEth ? "0xe8c333412e3d2e3fd78f333445a2c7754fcb8e1ec9e0a1e91484acd838d59675" : "0x2dc4278607fa5af8a7d0ef23f4929ccb079f9790f00b6ed141efbd0583d9ef09")
        break;
    case 2:
        frontLandImg = getEvmAssetsLinkByTxHash("0xe6f5f40ca89618ea931a2a125ebe5daabedcd7cf605e80d5dc0ab7daf1768d77")
        frontBottomBg = "#207CD2"
        backLandImg = getEvmAssetsLinkByTxHash(isEth ? "0x35c7c25a17f0d3c09d4d69de396209900a29e562e7eb085d82dcf1ce64898cb1" : "0x954b17c8dfde9e63c2eff0d9ebd722c87522cd6995286716f49b294797283f5a")
        break;
    case 3:
        frontLandImg = getEvmAssetsLinkByTxHash("0xcdacf4a5ed64391e995108849d1c7893e9789978aff8fee8bc53e57651b14884")
        frontBottomBg = "#494BA8"
        backLandImg = getEvmAssetsLinkByTxHash(isEth ? "0x3d4f88d2d9203128803f62ddd92d3d8649370687f9e8d4011cd6380bf546f720" : "0x8118d983bb6357357ebccf6188cedb13e330a6d41ebebe8dcc9443178c1fbd84")
        break;
    case 6:
        frontLandImg = getEvmAssetsLinkByTxHash("0xbdc62ec44ecd14c23112952f4eeddc42adf3b0cc081569afea428b0988c5ff57")
        frontBottomBg = "#CE8836"
        backLandImg = getEvmAssetsLinkByTxHash(isEth ? "0x5b0b7b30035a5561f9170af88398e48e808062b5f42ec889377e5bbc128f8499" : "0x45b8d9bd2be6089aa64e9a5e53897138c901fc3c096dfbb19a18bdcf8b1e27c8")
        break;
    default:
        break;
}
frontLandImgEle.src = frontLandImg;
frontBottomEle.style.backgroundColor = frontBottomBg;
backLandImgEle.src = backLandImg;

const chainLogoEles = getElesByCls('chainLogo')
const clockLogoEles = getElesByCls('clockLogo')
const ownerEles = getElesByCls('owner')
const dateEles = getElesByCls('date')
let chainLogo = ''
let clockLogo = ''
if (isEth) {
    chainLogo = getEvmAssetsLinkByTxHash('0xe03e2b118314d2da485e4bb7befffa6ae5564b588127580b0960cf7e58b45036')
    clockLogo = getEvmAssetsLinkByTxHash('0x1214e01e0ddcf6a5b5a8522c08f5b03b4e2a270c1a3ce2728e32091c64157c86')
} else {
    chainLogo = getEvmAssetsLinkByTxHash('0xc951aed44a91d8ad01be063b4ddaa9e5e9cca92773308ff6171d121b65c07a8f')
    clockLogo = getEvmAssetsLinkByTxHash('0x62bd4957eba0694575ad28fd10924800d250458e860bef9b236b131627601d19')
}
for (let i = 0; i < 2; i++) {
    chainLogoEles[i].src = chainLogo;
    clockLogoEles[i].src = clockLogo;
    ownerEles[i].innerHTML = window.owner;
    dateEles[i].innerHTML = window.date
}

setTimeout(() => {
    getElesByCls('cardFlip')[0].style = "transform:rotateY(180deg)"
}, 1000);

function getEleById(id) {
    return document.getElementById(id)
}

function getElesByCls(cls) {
    return document.getElementsByClassName(cls)
}

function getEvmAssetsLinkByTxHash(tx) {
    return "https://static.evm.ink/eip155:137/content/" + tx + ":0"
}