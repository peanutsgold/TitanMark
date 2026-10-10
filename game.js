// Eye for Colour — mix the target colour with hue, saturation and lightness sliders.
const ROUNDS = 5;
const BEST_KEY = "titanmark-colour-best";

const sliders = {
  h: document.querySelector("#slider-h"),
  s: document.querySelector("#slider-s"),
  l: document.querySelector("#slider-l"),
};
const outputs = {
  h: document.querySelector("#out-h"),
  s: document.querySelector("#out-s"),
  l: document.querySelector("#out-l"),
};
const targetSwatch = document.querySelector("#swatch-target");
const mixSwatch = document.querySelector("#swatch-mix");
const roundLabel = document.querySelector("#game-round");
const scoreLabel = document.querySelector("#game-score");
const bestLabel = document.querySelector("#game-best");
const resultText = document.querySelector("#game-result");
const actionButton = document.querySelector("#game-action");
const playPanel = document.querySelector("#game-play");
const endPanel = document.querySelector("#game-end");
const finalScore = document.querySelector("#game-final-score");
const rating = document.querySelector("#game-rating");
const restartButton = document.querySelector("#game-restart");

let round = 1;
let total = 0;
let target = null;
let locked = false;

const readBest = () => {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; }
};
const saveBest = (value) => {
  try { localStorage.setItem(BEST_KEY, String(value)); } catch { /* storage unavailable */ }
};

const hsl = ({ h, s, l }) => `hsl(${h} ${s}% ${l}%)`;
const oneDecimal = (n) => Math.round(n * 10) / 10;
const randomBetween = (min, max) => Math.round(min + Math.random() * (max - min));

const hslToRgb = ({ h, s, l }) => {
  const sat = s / 100;
  const light = l / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
};

// sRGB (0–1) → CIE Lab, so the score follows how different colours look to people.
const rgbToLab = ([r, g, b]) => {
  const linear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [linear(r), linear(g), linear(b)];
  const x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (t * 24389 / 27 + 16) / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
};

const colourDifference = (a, b) => {
  const [l1, a1, b1] = rgbToLab(hslToRgb(a));
  const [l2, a2, b2] = rgbToLab(hslToRgb(b));
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
};

const currentMix = () => ({
  h: Number(sliders.h.value),
  s: Number(sliders.s.value),
  l: Number(sliders.l.value),
});

const paintSliders = () => {
  const { h, s, l } = currentMix();
  sliders.h.style.background = `linear-gradient(90deg, ${[0, 60, 120, 180, 240, 300, 360].map((hue) => `hsl(${hue} ${s}% ${l}%)`).join(", ")})`;
  sliders.s.style.background = `linear-gradient(90deg, hsl(${h} 0% ${l}%), hsl(${h} 100% ${l}%))`;
  sliders.l.style.background = `linear-gradient(90deg, #000, hsl(${h} ${s}% 50%), #fff)`;
  outputs.h.textContent = `${h}°`;
  outputs.s.textContent = `${s}%`;
  outputs.l.textContent = `${l}%`;
  mixSwatch.style.background = hsl({ h, s, l });
};

const feedback = (difference) => {
  if (difference < 1) return "Pixel perfect!";
  if (difference < 6) return "Sharp eye!";
  if (difference < 14) return "Close!";
  if (difference < 25) return "Not bad.";
  return "Way off — keep trying.";
};

const finalRating = (score) => {
  if (score >= 45) return "Designer's eye";
  if (score >= 35) return "Sharp eye";
  if (score >= 20) return "Getting there";
  return "Colour adventurer";
};

const startRound = () => {
  target = { h: randomBetween(0, 359), s: randomBetween(35, 90), l: randomBetween(30, 72) };
  targetSwatch.style.background = hsl(target);
  sliders.h.value = 180;
  sliders.s.value = 50;
  sliders.l.value = 50;
  Object.values(sliders).forEach((slider) => { slider.disabled = false; });
  locked = false;
  resultText.textContent = "";
  actionButton.textContent = "Lock it in";
  roundLabel.textContent = `${round} / ${ROUNDS}`;
  paintSliders();
};

const lockIn = () => {
  const mix = currentMix();
  const difference = colourDifference(target, mix);
  const points = oneDecimal(Math.max(0, Math.min(10, 10 - difference / 4)));
  total = oneDecimal(total + points);
  locked = true;
  Object.values(sliders).forEach((slider) => { slider.disabled = true; });
  scoreLabel.textContent = total;
  resultText.textContent = `${feedback(difference)} +${points} points. The target was hue ${target.h}°, saturation ${target.s}%, lightness ${target.l}%.`;
  actionButton.textContent = round < ROUNDS ? "Next colour" : "See my score";
};

const finishGame = () => {
  const best = Math.max(readBest(), total);
  saveBest(best);
  bestLabel.textContent = best;
  finalScore.textContent = total;
  rating.textContent = finalRating(total);
  playPanel.hidden = true;
  endPanel.hidden = false;
  restartButton.focus();
};

const newGame = () => {
  round = 1;
  total = 0;
  scoreLabel.textContent = "0";
  endPanel.hidden = true;
  playPanel.hidden = false;
  startRound();
};

Object.values(sliders).forEach((slider) => slider.addEventListener("input", paintSliders));

actionButton.addEventListener("click", () => {
  if (!locked) return lockIn();
  if (round < ROUNDS) {
    round += 1;
    startRound();
  } else {
    finishGame();
  }
});

restartButton.addEventListener("click", newGame);

const savedBest = readBest();
if (savedBest) bestLabel.textContent = savedBest;
newGame();
