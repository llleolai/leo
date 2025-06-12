// 隨機顯示一句勵志名言
function showQuote() {
  const quotes = [
    "努力是成功的唯一捷徑。",
    "勇敢追夢，永不放棄。",
    "挫折是通往成功的必經之路。"
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length); // 隨機取索引
  document.getElementById('quote').textContent = quotes[randomIndex]; // 顯示到畫面上
}

// 取得返回頂部按鈕元素 
const backToTopBtn = document.getElementById('backToTop');

// 滾動頁面時控制返回頂部按鈕是否顯示
window.onscroll = function() {
  if (document.documentElement.scrollTop > 100) {
    backToTopBtn.style.display = 'block'; // 顯示按鈕
  } else {
    backToTopBtn.style.display = 'none'; // 隱藏按鈕
  }
};

// 點擊返回頂部按鈕時平滑回頂部
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 音樂小知識資料陣列
const facts = [
  "🎵 貝多芬在完全失聰後寫下了傳奇的《第九號交響曲》。",
  "🎻 莫札特5歲就開始作曲，被譽為音樂神童。",
  "🎼 巴哈的《G弦之歌》是許多婚禮、告別式常用的曲目。",
  "🎹 蕭邦專門寫鋼琴曲，被稱為『鋼琴詩人』。",
  "🎶 海頓被稱為『交響曲之父』，創作了104首交響曲。",
  "🎻 小提琴協奏曲是古典音樂中最受歡迎的演奏形式之一。"
];

// 點擊按鈕時顯示隨機音樂小知識
document.getElementById("factBtn").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  document.getElementById("factText").textContent = facts[randomIndex];
});

// 作曲家資料：包含姓名、出生年份、簡介與照片網址
const composers = [
  {
    name: "巴哈",
    year: 1685,
    desc: "德國巴洛克時期作曲家，代表作：《G弦之歌》、《馬太受難曲》",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg"
  },
  {
    name: "莫札特",
    year: 1756,
    desc: "奧地利古典時期作曲家，代表作：《魔笛》、《小夜曲第13號》",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg"
  },
  {
    name: "貝多芬",
    year: 1770,
    desc: "德國古典/浪漫過渡期作曲家，代表作：《第九號交響曲》、《月光奏鳴曲》",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg"
  },
  {
    name: "蕭邦",
    year: 1810,
    desc: "波蘭浪漫時期作曲家，鋼琴詩人，代表作：《夜曲》、《英雄波蘭舞曲》",
    img: "https://d1j71ui15yt4f9.cloudfront.net/wp-content/uploads/2023/02/13183944/%E3%80%8A%E8%95%AD%E9%82%A6%E8%82%96%E5%83%8F%E3%80%8B%EF%BC%8C1847%E5%B9%B4%EF%BC%8C%E6%B2%B9%E7%95%AB%EF%BC%8C%E8%8D%B7%E8%98%AD%E7%95%AB%E5%AE%B6%E9%98%BF%E7%91%9E%E8%A8%B1%E8%8F%B2%E7%88%BE%EF%BC%88Ary-Scheffer%EF%BC%89%E4%BD%9C%EF%BC%8C%E8%8D%B7%E8%98%AD%E5%A4%9A%E5%BE%B7%E9%9B%B7%E8%B5%AB%E7%89%B9%E5%8D%9A%E7%89%A9%E9%A4%A8%EF%BC%88Dordrechts-Museum%EF%BC%89%E8%97%8F%E3%80%82-175636.jpg"
  }
];

// 抓取 SVG 元素與資訊展示區 infoBox
const svg = document.getElementById("timelineSVG");
const infoBox = document.getElementById("infoBox");

// 設定時間軸左右邊距與軸線高度位置
const paddingLeft = 60;
const paddingRight = 60;
const width = svg.viewBox.baseVal.width;
const height = svg.viewBox.baseVal.height;
const axisY = height - 40;

// 擷取作曲家的出生年份範圍
const years = composers.map(c => c.year);
const minYear = Math.min(...years);
const maxYear = Math.max(...years);

// 將年份轉換為 X 軸上的位置
function yearToX(year) {
  return paddingLeft + ((year - minYear) / (maxYear - minYear)) * (width - paddingLeft - paddingRight);
}

// 繪製折線（連接每位作曲家的點）
function drawLine(points) {
  let path = "M ";
  points.forEach((pt, i) => {
    path += `${pt.x} ${pt.y} `;
    if (i !== points.length - 1) path += "L ";
  });
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  line.setAttribute("d", path.trim());
  line.setAttribute("stroke", "#c8b18a");
  line.setAttribute("stroke-width", "3");
  line.setAttribute("fill", "none");
  svg.appendChild(line);
}

// 主函式：繪製整條時間軸
function drawTimeline() {
  const points = [];

  // 針對每位作曲家繪製點與標籤
  composers.forEach((c, idx) => {
    const x = yearToX(c.year);
    const y = axisY;
    points.push({ x, y });

    // 點（circle）
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "timeline-point");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 10);
    circle.style.cursor = "pointer";

    // 點擊時顯示作曲家資料與圖片
    circle.addEventListener("click", () => {
      infoBox.innerHTML = `
        <strong>${c.name} (${c.year})</strong><br/>
        <em>${c.desc}</em><br/>
        <img src="${c.img}" alt="${c.name}" class="composer-img" />
      `;
    });

    svg.appendChild(circle);

    // 加上姓名標籤
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("class", "timeline-label");
    text.setAttribute("x", x);
    text.setAttribute("y", y - 15);
    text.setAttribute("text-anchor", "middle");
    text.textContent = c.name;
    svg.appendChild(text);
  });

  // 畫折線連接各點
  drawLine(points);

  // 畫底部 X 軸線
  const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  axis.setAttribute("x1", paddingLeft);
  axis.setAttribute("y1", axisY);
  axis.setAttribute("x2", width - paddingRight);
  axis.setAttribute("y2", axisY);
  axis.setAttribute("stroke", "#cbbca4");
  axis.setAttribute("stroke-width", "2");
  svg.appendChild(axis);

  // 加上年份刻度標籤（每 20 年）
  for (let y = minYear; y <= maxYear; y += 20) {
    const x = yearToX(y);
    const yearText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    yearText.setAttribute("x", x);
    yearText.setAttribute("y", axisY + 20);
    yearText.setAttribute("text-anchor", "middle");
    yearText.setAttribute("fill", "#a67c52");
    yearText.textContent = y;
    svg.appendChild(yearText);
  }
}

// 呼叫函式畫出時間軸
drawTimeline();
