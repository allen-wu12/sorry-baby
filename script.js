/* =========================================================
   ✏️ 設定區：只要改這一塊，網站內容就會跟著變
   ========================================================= */
const CONFIG = {
  // 你怎麼叫她
  nickname: "寶寶",

  // 信的署名
  signature: "愛你的小寶",

  // 在一起的日期（格式：年-月-日）
  startDate: "2026-05-15",

  // 道歉信內容：一個字串就是一段
  letter: [
    "寶寶，對不起。",
    "我知道你跟我說話的時候，我沒有認真聽；你傳訊息給我，我也拖了好久才回，甚至忘記回。",
    "你一定覺得自己被忽略了，覺得我不在乎你。其實不是這樣的，是我太粗心，沒想到這會讓你那麼難過。",
    "你說的每一句話都很重要，我以後會好好聽、好好回，不會再讓你等我等到失望。",
    "你是我最重要的人，我真的很珍惜你，也很珍惜我們。",
    "可以再給我一次機會嗎？🥺",
  ],

  // 照片：把照片放進 images/ 資料夾，檔名要跟這裡一模一樣
  photos: [
    { src: "images/photo1.jpg", caption: "捧著花的你，笑得好甜 💐" },
    { src: "images/photo2.jpg", caption: "你比花還好看 🌸" },
    { src: "images/photo3.jpg", caption: "海邊咖啡廳，連橘子麵包都沒你可愛 🍊" },
    { src: "images/photo4.jpg", caption: "最喜歡你比 YA 的樣子 ✌️" },
    { src: "images/photo5.jpg", caption: "一起坐小火車看海 🚃" },
  ],

  // 隨機甜言蜜語／笑話，想加幾句就加幾句
  sweetWords: [
    "你知道你和星星的差別嗎？星星在天上，你在我心上 ✨",
    "我最近有點怪怪的⋯⋯好像得了一種沒有你就會死的病 🤒",
    "全世界我最怕兩件事：一是你生氣，二是你生我的氣 😣",
    "你生氣的樣子也好可愛，但我還是比較想看你笑 😊",
    "我的手機掉了，你可以打給我一下嗎？順便打進我心裡 📱",
    "以後你的訊息，我要設成最高優先通知，比鬧鐘還大聲 🔔",
    "我已經把『已讀不回』這個功能從我身上永久刪除了 🗑️",
    "如果可愛要罰錢，你大概已經破產了 💸",
    "我不是在道歉，我是在追我的寶寶第二次 🏃",
    "你是我的優樂美，我想把你捧在手心 🧋",
    "地球是圓的，但我對你的愛是直線，沒有轉彎 ➡️",
    "今天的我，比昨天更愛你一點點；明天會再多一點點 📈",
  ],

  // 按「不要」時，按鈕上會輪流出現的文字
  noTexts: ["不要", "真的不要嗎？", "再想一下嘛", "拜託拜託 🥺", "按錯了吧？", "我會哭喔 😭", "抓不到我～"],

  // 原諒之後送出的兌換券內容
  coupon: "可兌換：一次全身按摩 💆 ＋ 一次專屬吹髮服務 💇",
};

/* =========================================================
   以下是程式邏輯，不熟悉的話可以先不用動
   ========================================================= */

// 填入稱呼、署名、信件、兌換券
document.querySelectorAll(".nickname").forEach((el) => (el.textContent = CONFIG.nickname));
document.getElementById("signature").textContent = CONFIG.signature;
document.getElementById("coupon-text").textContent = CONFIG.coupon;
document.getElementById("letter-body").innerHTML = CONFIG.letter.map((p) => `<p>${p}</p>`).join("");

// ---------- 背景飄落的愛心 ----------
const heartEmojis = ["💗", "💕", "💖", "🌸", "💓"];
function dropHeart() {
  const heart = document.createElement("span");
  heart.className = "falling-heart";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 20 + "px";
  heart.style.animationDuration = 6 + Math.random() * 6 + "s";
  document.getElementById("hearts-bg").appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}
setInterval(dropHeart, 600);

// ---------- 捲動到區塊時淡入 ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });
document.querySelectorAll(".section").forEach((s) => observer.observe(s));

// ---------- 在一起天數計時器 ----------
function updateCounter() {
  const start = new Date(CONFIG.startDate + "T00:00:00");
  const diff = Math.max(0, Date.now() - start.getTime());
  document.getElementById("days").textContent = Math.floor(diff / 86400000);
  document.getElementById("hours").textContent = Math.floor(diff / 3600000) % 24;
  document.getElementById("minutes").textContent = Math.floor(diff / 60000) % 60;
  document.getElementById("seconds").textContent = Math.floor(diff / 1000) % 60;
}
updateCounter();
setInterval(updateCounter, 1000);

// ---------- 照片相簿 ----------
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");

CONFIG.photos.forEach((photo) => {
  const item = document.createElement("div");
  item.className = "photo";

  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.caption;
  // 照片還沒放進資料夾時，顯示粉色方塊代替
  img.onerror = () => {
    const ph = document.createElement("div");
    ph.className = "placeholder";
    ph.textContent = "📷";
    img.replaceWith(ph);
    item.dataset.missing = "true";
  };

  const caption = document.createElement("p");
  caption.textContent = photo.caption;

  item.append(img, caption);
  item.addEventListener("click", () => {
    if (item.dataset.missing) return;
    document.getElementById("lightbox-img").src = photo.src;
    document.getElementById("lightbox-caption").textContent = photo.caption;
    lightbox.classList.remove("hidden");
  });
  gallery.appendChild(item);
});
lightbox.addEventListener("click", () => lightbox.classList.add("hidden"));

// ---------- 隨機甜言蜜語 ----------
const sweetText = document.getElementById("sweet-text");
let lastIndex = -1;
document.getElementById("sweet-btn").addEventListener("click", () => {
  let i;
  do {
    i = Math.floor(Math.random() * CONFIG.sweetWords.length);
  } while (i === lastIndex && CONFIG.sweetWords.length > 1); // 避免連續兩次一樣
  lastIndex = i;
  sweetText.textContent = CONFIG.sweetWords[i];
  sweetText.classList.remove("pop");
  void sweetText.offsetWidth; // 讓動畫可以重新播放
  sweetText.classList.add("pop");
});

// ---------- 逃跑的「不要」按鈕 ----------
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
let noCount = 0;

function runAway(e) {
  e.preventDefault();
  noCount++;
  noBtn.textContent = CONFIG.noTexts[noCount % CONFIG.noTexts.length];
  // 把按鈕搬到最後一區底下，讓它只在這一區裡亂跑
  const area = document.getElementById("final");
  if (!noBtn.classList.contains("running")) {
    area.appendChild(noBtn);
    noBtn.classList.add("running");
  }

  // 移到這一區的隨機位置（留邊距，不會跑出去）
  const maxX = area.clientWidth - noBtn.offsetWidth - 16;
  const maxY = area.clientHeight - noBtn.offsetHeight - 16;
  noBtn.style.left = 16 + Math.random() * (maxX - 16) + "px";
  noBtn.style.top = 16 + Math.random() * (maxY - 16) + "px";

  // 每逃一次，「原諒」按鈕就變大一點
  yesBtn.style.transform = `scale(${Math.min(1 + noCount * 0.12, 2.2)})`;
}
noBtn.addEventListener("mouseenter", runAway); // 電腦：滑鼠靠近就跑
noBtn.addEventListener("touchstart", runAway); // 手機：手指碰到就跑
noBtn.addEventListener("click", runAway);

// ---------- 按下「原諒」 ----------
yesBtn.addEventListener("click", () => {
  document.getElementById("choice-area").classList.add("hidden");
  noBtn.classList.add("hidden");
  document.getElementById("reward").classList.remove("hidden");
  // 愛心大爆發
  for (let i = 0; i < 60; i++) setTimeout(dropHeart, i * 40);
});
