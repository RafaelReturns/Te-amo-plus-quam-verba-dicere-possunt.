const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* STAR SYSTEM */
let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.1,
  });
}

/* COMET */
let comet = {
  x: -100,
  y: (Math.random() * canvas.height) / 2,
  len: 120,
};

/* HEART PARTICLES */
let particles = [];

function createHeart() {
  particles = [];

  for (let i = 0; i < 200; i++) {
    let t = Math.random() * Math.PI * 2;

    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    particles.push({
      x: canvas.width / 2 + x * 10,
      y: canvas.height / 2 + y * 10,
      vx: Math.random() - 0.5,
      vy: Math.random() - 0.5,
      size: 2,
    });
  }
}

/* DRAW LOOP */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // stars
  ctx.fillStyle = "white";
  stars.forEach((s) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.speed;
    if (s.y > canvas.height) s.y = 0;
  });

  // comet
  ctx.beginPath();
  let grad = ctx.createLinearGradient(
    comet.x,
    comet.y,
    comet.x - comet.len,
    comet.y - comet.len,
  );
  grad.addColorStop(0, "white");
  grad.addColorStop(1, "transparent");

  ctx.strokeStyle = grad;
  ctx.lineWidth = 2;
  ctx.moveTo(comet.x, comet.y);
  ctx.lineTo(comet.x - comet.len, comet.y - comet.len);
  ctx.stroke();

  comet.x += 4;
  comet.y += 1;

  if (comet.x > canvas.width + 200) {
    comet.x = -100;
    comet.y = (Math.random() * canvas.height) / 2;
  }

  // heart particles
  particles.forEach((p) => {
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

/* POPUP */
function startMusic() {
  document.getElementById("music").play();
  document.getElementById("popup").style.display = "none";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* MESSAGE TEXT */
const messageText = `Nermin, bu saytı sənin üçün yaratdım. Üzr istəyirəm ki, belə sadə bir şey oldu, amma sənin üçün çox da böyük bir şey yaratmağa ehtiyac olmadığını düşünərək bu qərara gəldim. Sənə demək istədiyim odur ki, səni sevirəm.

Həyatımda ilk dəfə birini sevdim. Bəyənilənlər olub, xoşuma gələnlər olub, amma həqiqətən həyatımda ilk dəfə birinə bağlandım, öləcək qədər sevdim səni. O qədər sevdim ki, hətta yolda gedərkən belə sənin videona baxıram, sənin atdığın səsləri dinləyirəm, hər zaman səni düşünürəm — nə edir, görəsən?

Mən indiyə qədər sevgiyə inanmırdım. Düşünürdüm ki, həyatımın sonuna qədər tək yaşayacağam. Amma səni tanıyandan sonra bütün hisslərim dəyişdi. Sən mənim ürəyimə oturdun, sən məni dəyişdin.

Mənim düşüncəmə görə biz Tanrı tərəfindən bir-birimizi tapmaq üçün yaradılmışıq. İkimiz də əvvəl sınandıq, sonra bir-birimizlə qarşı-qarşıya gətirildik. Sən mənim üçün bu qısa müddətdə bəlkə də tanıdığım və sevdiyim yeganə insan oldun. Bu qədər qısa zamanda heç kimi sevə biləcəyimi düşünmürdüm, amma sən mənə tam fərqli gəldin.

Kefim olmayanda belə səninlə danışıram və bəlkə də dünyanın ən xoşbəxt insanı oluram. Bunu sənə yazmaq üçün çox fikirləşdim, çünki hisslərin barədə tam əmin deyildim, mənim haqqımda nə düşündüyünü bilmirdim. Bəlkə bu mesajdan sonra mənimlə bir daha danışmaq istəməyəcəksən.

Bir neçə gün əvvəl mənə “biz sadəcə dostuq” demişdin. O gündən bəri göstərməsəm də, yavaş-yavaş içimdən içimə ölürəm. Bu elə bir şey idi ki, bir anda səninlə qurduğum bütün xəyallar yıxıldı. Heç kimə bağlana bilməyəcəyimi düşünürdüm, amma sən tam əksini mənə göstərdin.

Mən bəlkə də sənin intellektinə, düşüncə tərzinə, dünya görüşünə, hətta zəkana aşiq olmuşam. Amma tam olaraq səni nəyə görə sevdiyimi bilmirəm. Amma hisslərimdən tam əminəm ki, səni sevirəm.

Mənə görə sevgi sübut axtarmır. Çünki mən sənə sevgimi sübut etsəm, bunun magiyası itər. Mənə görə sevgi bir inancdır. Mən sənin də mənə qarşı hisslərinin olduğuna inanmaq istəyirəm.

WhatsApp-da “cycle sound effect”in mənasını soruşmuşdun. Onun mənası bir-birini sevən iki insanın ürəyindən keçən səsdir. Dünya necə Günəşin ətrafında fırlanırsa, sən də mənim Günəşimsən, mən isə sənin dünyan. Sən olmasan, mən qaranlıqda qalaram, buz kimi donarım, içimdə həyat olmaz.

Sən mənə yaşamaq enerjisi verirsən. Uzun zaman sonra mənə yenidən yaşamağın, gülməyin nə olduğunu xatırlatdın. Mən xaricə gedəndə belə bəlkə narahat olarsan, başqaları ilə olacağım barədə düşünərsən, amma sən tam əmin ola bilərsən ki, sən mənim üçün qaranlıq ruhların arasında öz işığı ilə mənə yol göstərən bir mələksən.

Sən mənim üçün dünyanın üstündən 60.000 ildən bir keçən Halley ulduzu kimisən.`;

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
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      clearInterval(interval);
    }
  }, 25);
}

/* CLICK EVENT */
document.querySelector(".heart").addEventListener("click", () => {
  createHeart();
  startTyping();
});

/* RESIZE */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
