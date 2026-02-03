const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const teaseText = document.getElementById("teaseText");
const resultBox = document.getElementById("resultBox");
const resetBtn = document.getElementById("resetBtn");
const rainContainer = document.getElementById("rainContainer");

let finished = false;
let dodgeCount = 0;

/* Make messages NOT repeat:
   We shuffle a "deck", draw one each time, and reshuffle when empty. */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck(items) {
  let deck = shuffle(items);
  return {
    next() {
      if (deck.length === 0) deck = shuffle(items);
      return deck.pop();
    },
    reset() {
      deck = shuffle(items);
    }
  };
}

const dodgeDeck = makeDeck([
  "Ayo! You really tried NO? 😂",
  "NO button said: ‘not today’ 🤣",
  "Stop chasing me brooo 🏃‍♂️💨",
  "Your mouse is on 2G 😂",
  "NO is playing hide & seek 😭",
  "Pick YES and go home 😂",
  "Why you acting innocent 😏😂",
  "I’m allergic to NO clicks 🤧😂",
  "Skill issue. Try again 🤣",
  "I can do this all day 😭😂",
  "NO button has legs today 🦵😂",
  "Your aim is… inspirational 😭😂"
]);

const yesDeck = makeDeck([
  "CONFESSION ACCEPTED ✅😂",
  "Finally! Truth unlocked 🔓🤣",
  "Honesty level: MAX 😭😂",
  "You clicked YES like a hero 🫡😂",
  "Bro chose honesty… respect 🤣✅",
  "I knew it from the first second 😭😂",
  "That YES click was personal 😂",
  "Welcome to the Honest Club 🤣"
]);

const noWinDeck = makeDeck([
  "HOW did you click NO?! 😭😂",
  "Okay hacker… calm down 😂",
  "You got lucky… very lucky 😤😂",
  "Bro has aim-bot 😭😂",
  "Impossible… but okay 😅😂",
  "You won this round… suspiciously 🤨😂"
]);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFallingMessage(text) {
  const div = document.createElement("div");
  div.className = "rainMsg";
  div.style.left = `${randomInt(8, 92)}%`;

  // Slightly different durations so it feels alive
  div.style.animationDuration = `${randomInt(130, 185) / 100}s`;

  div.innerHTML = `${text} <span class="emoji">😂😂</span>`;
  rainContainer.appendChild(div);

  setTimeout(() => div.remove(), 2200);
}

function moveNoAnywhere() {
  const padding = 12;
  const rect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  const x = randomInt(padding, Math.max(padding, maxX));
  const y = randomInt(padding, Math.max(padding, maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Extra cartoon pop
  noBtn.animate(
    [
      { transform: "scale(1) rotate(0deg)" },
      { transform: "scale(1.18) rotate(-10deg)" },
      { transform: "scale(1.06) rotate(10deg)" },
      { transform: "scale(1) rotate(0deg)" }
    ],
    { duration: 260, easing: "cubic-bezier(.2,.9,.2,1.2)" }
  );
}

function lockButtons() {
  finished = true;
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.style.opacity = "0.6";
  noBtn.style.opacity = "0.6";
  yesBtn.style.cursor = "not-allowed";
  noBtn.style.cursor = "not-allowed";
}

function comedyEnding(mode) {
  if (mode === "yes") {
    const main = "I knew it 😂 You are a nonsense!";
    resultBox.textContent = main;
    teaseText.textContent = "Honesty detected ✅";

    // Burst of different messages (no repeats)
    createFallingMessage(yesDeck.next());
    createFallingMessage(yesDeck.next());
    createFallingMessage("Respect for honesty 🤣✅");
    createFallingMessage("Case closed 👮‍♂️😂");

  } else {
    const win = noWinDeck.next();
    resultBox.textContent = win;
    teaseText.textContent = "Okay okay… you win 😅";

    createFallingMessage(win);
    createFallingMessage("Bro broke the system 😭😂");
    createFallingMessage("Next time I’ll run faster 🏃‍♂️💨😂");
  }

  lockButtons();
}

function resetAll() {
  finished = false;
  dodgeCount = 0;

  teaseText.textContent = "Choose honestly... 👀";
  resultBox.textContent = "";
  rainContainer.innerHTML = "";

  yesBtn.disabled = false;
  noBtn.disabled = false;
  yesBtn.style.opacity = "1";
  noBtn.style.opacity = "1";
  yesBtn.style.cursor = "pointer";
  noBtn.style.cursor = "pointer";

  noBtn.style.left = "60%";
  noBtn.style.top = "55%";

  // Reset decks so it feels fresh again
  dodgeDeck.reset();
  yesDeck.reset();
  noWinDeck.reset();
}

yesBtn.addEventListener("click", () => {
  if (finished) return;
  comedyEnding("yes");
});

// Dodge on hover (desktop)
noBtn.addEventListener("mouseenter", () => {
  if (finished) return;

  dodgeCount++;

  // Always different tease line
  const msg = dodgeDeck.next();
  teaseText.textContent = msg;
  createFallingMessage(msg);

  // After some attempts, add bonus roasts
  if (dodgeCount % 4 === 0) {
    createFallingMessage("Still chasing? 😭😂");
  }

  moveNoAnywhere();

  // Make it harder over time: double hop sometimes
  if (dodgeCount >= 6 && Math.random() < 0.35) {
    setTimeout(moveNoAnywhere, 120);
  }
});

// Dodge on touch (mobile)
noBtn.addEventListener("touchstart", (e) => {
  if (finished) return;
  e.preventDefault();

  dodgeCount++;

  const msg = dodgeDeck.next();
  teaseText.textContent = msg;
  createFallingMessage(msg);

  moveNoAnywhere();

  if (dodgeCount >= 6 && Math.random() < 0.35) {
    setTimeout(moveNoAnywhere, 120);
  }
});

// If they somehow click NO
noBtn.addEventListener("click", () => {
  if (finished) return;
  comedyEnding("no");
});

resetBtn.addEventListener("click", resetAll);

// If window size changes, keep NO visible
window.addEventListener("resize", () => {
  if (!finished) {
    // nudge it back into safe area
    moveNoAnywhere();
  }
});
