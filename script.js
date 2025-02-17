let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name") || "李宝玉"; // 默认给她的名字

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username.substring(0, maxLength);

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
  "宝玉，你不喜欢我吗？",
  "再考虑一下嘛，亲爱的~",
  "不要这么残忍啊...",
  "我会伤心的，宝玉…",
  "不行啦:(，不可以拒绝我~",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 Yes 变大，每次放大 2 倍
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
  if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
  if (clickCount === 3) mainImage.src = "images/angry.png"; // 生气
  if (clickCount === 4) mainImage.src = "images/crying.png"; // 哭
  if (clickCount >= 5) mainImage.src = "images/crying.png"; // 之后一直是哭
});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `!!!喜欢你!!!`;
const loveTest1 = `( >᎑<)♡︎ᐝ${safeUsername}  ♡︎ᐝ(>᎑< )`

yesButton.addEventListener("click", function () {
  // 创建音频元素并播放音频
  let audio = new Audio('./music/M500002CFq9C28OuHD.mp3');  // 路径根据实际情况设置
  audio.play();  // 播放音频

  // 先创建基础 HTML 结构
  document.body.innerHTML = `
    <div class="yes-screen">
        <h1 class="yes-text">${loveTest}</h1>
        <h1 class="yes-text">${loveTest1}</h1>
        <img src="images/hug.png" alt="拥抱" class="yes-image">
    </div>
  `;
  document.body.style.overflow = "hidden";
});
