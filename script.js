const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* =========================
   DOTS SYSTEM
========================= */

let dots = [];
let mode = "scatter"; // scatter | heart | explode

const TOTAL = 300;

function initDots() {
  dots = [];
  for (let i = 0; i < TOTAL; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      tx: 0,
      ty: 0
    });
  }
}

initDots();

/* =========================
   HEART SHAPE TARGET
========================= */

function heartX(t) {
  return 16 * Math.pow(Math.sin(t), 3);
}

function heartY(t) {
  return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
}

/* =========================
   SET HEART FORM
========================= */

function formHeart() {
  mode = "heart";

  for (let i = 0; i < dots.length; i++) {
    let t = (i / dots.length) * Math.PI * 2;

    let x = heartX(t) * 15 + canvas.width / 2;
    let y = heartY(t) * 15 + canvas.height / 2;

    dots[i].tx = x;
    dots[i].ty = y;
  }
}

/* =========================
   EXPLODE
========================= */

function explode() {
  mode = "explode";

  dots.forEach(d => {
    d.vx = (Math.random() - 0.5) * 8;
    d.vy = (Math.random() - 0.5) * 8;
  });
}

/* =========================
   MESSAGE SYSTEM (same as yours)
========================= */

const messageText = `Nermin, ... (sənin düzəltdiyin mesaj buraya)`;

let i = 0;
let started = false;

function startTyping() {
  if (started) return;
  started = true;

  const msg = document.getElementById("message");

  let interval = setInterval(() => {
    if (i < messageText.length) {
      msg.innerHTML += messageText[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

/* =========================
   ANIMATION LOOP
========================= */

function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";

  dots.forEach(d => {

    if (mode === "scatter") {
      d.x += d.vx;
      d.y += d.vy;

      if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
    }

    if (mode === "heart") {
      d.x += (d.tx - d.x) * 0.05;
      d.y += (d.ty - d.y) * 0.05;
    }

    if (mode === "explode") {
      d.x += d.vx;
      d.y += d.vy;
    }

    ctx.beginPath();
    ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

/* =========================
   CLICK CONTROL
========================= */

let clickStage = 0;

window.addEventListener("click", () => {

  // 1-ci klik → heart
  if (clickStage === 0) {
    formHeart();
    clickStage = 1;
  }

  // 2-ci klik → explode + message
  else if (clickStage === 1) {
    explode();
    startTyping();
    clickStage = 2;
  }

});

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
