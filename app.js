/* ================================================================
   WOMEN'S DAY APP — APP.JS  |  Gen Z Edition  🌸
   All 9 features: Green Flag, Curiosity Box, Flip Cards, Emoji Quiz,
   Personality Quiz, Decode Text, Red Flag Detector, Meme Gen, Compliments
================================================================ */

// ════════════════════════════════════════════════════════════════
// 0. AMBIENT BACKGROUND MUSIC
// ════════════════════════════════════════════════════════════════

let isAudioPlaying = false;

function toggleMusic() {
  const audio = document.getElementById('ambient-audio');
  const btn = document.getElementById('music-btn');
  
  if (!audio) return;
  
  if (isAudioPlaying) {
    // Stop music
    audio.pause();
    audio.currentTime = 0;
    btn.textContent = '🎵 Play Music';
    btn.classList.remove('playing');
    isAudioPlaying = false;
  } else {
    // Play music
    audio.volume = 0.25; // 25% volume - subtle
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        btn.textContent = '⏸ Stop Music';
        btn.classList.add('playing');
        isAudioPlaying = true;
      }).catch(error => {
        console.log('Music playback failed:', error);
        btn.textContent = '🎵 Play Music (Error)';
      });
    }
  }
}

// ── UTILS ──────────────────────────────────────────────────────

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showToast(msg, duration = 2500) {
  const t = document.getElementById('global-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ════════════════════════════════════════════════════════════════
// 1. GREEN FLAG GENERATOR
// ════════════════════════════════════════════════════════════════

const GREEN_FLAGS = [
  "Laughs at dark memes 💀",
  "Will hype you up before interviews",
  "Sends reels that are too accurate 📱",
  "Knows the best street food places 🌮",
  "Will roast you but defend you outside 😤",
  "Checks in without being asked 🫂",
  "Remembers the small things you said",
  "Sends voice notes instead of paragraphs 🎤",
  "Never makes you feel guilty for resting",
  "Shares their food without hesitation 🍕",
  "Hypes you up in their head too, not just out loud",
  "Tells you the truth even when it's uncomfortable",
  "Lets you vent without immediately giving advice",
  "Celebrates your wins like they're their own 🎉",
  "Doesn't keep score in friendships",
  "Apologises and actually means it",
  "Has their own hobbies and interests 🎨",
  "Can sit in comfortable silence with you",
  "Remembers you don't like onions 🧅❌",
  "Shares memes at 2am that hit different",
  "Shows up even when you say 'it's fine'",
  "Reads the room every single time 👁️",
  "Laughs at your jokes even when they're terrible",
  "Will go for a midnight drive just because 🌙",
  "Brings snacks without being asked 🍿",
  "Doesn't ghost you mid-conversation",
  "Sends 'thinking of you' randomly 💭",
  "Admits when they were wrong, easily",
  "Never makes you feel like a burden",
  "Screams your name when you walk in 😤💚",
];

let lastFlag = '';

function generateFlag() {
  let flag;
  do { flag = rand(GREEN_FLAGS); } while (flag === lastFlag && GREEN_FLAGS.length > 1);
  lastFlag = flag;

  const card = document.getElementById('flag-card');
  const txt = document.getElementById('flag-text');
  card.style.opacity = '0';
  card.style.transform = 'scale(0.95)';
  setTimeout(() => {
    txt.textContent = flag;
    card.style.transition = 'all .35s ease';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
  }, 200);

  document.getElementById('share-flag-btn').style.display = '';
  document.getElementById('flag-toast').textContent = '';
}

function shareFlag() {
  const text = document.getElementById('flag-text').textContent;
  navigator.clipboard?.writeText(`💚 Green Flag: ${text}\n\nHappy Women's Day 🌸`).then(() => {
    document.getElementById('flag-toast').textContent = '✅ Copied to clipboard!';
    setTimeout(() => document.getElementById('flag-toast').textContent = '', 2500);
  }).catch(() => showToast('Could not copy, but appreciate the vibe!'));
}

// ════════════════════════════════════════════════════════════════
// 2. CURIOSITY BOX
// ════════════════════════════════════════════════════════════════

let curiosityCount = 0;

const CURIOSITY_ITEMS = [
  { type: 'FACT', icon: '🧠', text: 'Marie Curie was the first person — not just woman — to win two Nobel Prizes.' },
  { type: 'QUOTE', icon: '💬', text: '"You are more powerful than you know; you are beautiful just as you are." — Melissa Etheridge' },
  { type: 'GREEN FLAG', icon: '💚', text: 'She responds to "are you okay?" with an actual answer.' },
  { type: 'FACT', icon: '🌍', text: 'In Rwanda, over 60% of parliament seats are held by women — the highest in the world.' },
  { type: 'QUOTE', icon: '✨', text: '"I am not free while any woman is unfree, even when her shackles are very different from my own." — Audre Lorde' },
  { type: 'MEME', icon: '😂', text: '"Women\'s intuition" is actually just years of noticing things everyone else ignored.' },
  { type: 'FACT', icon: '🚀', text: 'Kalpana Chawla was the first Indian-origin woman in space, completing 252 Earth orbits.' },
  { type: 'GREEN FLAG', icon: '💚', text: 'She celebrates others\' wins without dimming her own light.' },
  { type: 'QUOTE', icon: '🌸', text: '"The most courageous act is still to think for yourself. Aloud." — Coco Chanel' },
  { type: 'MEME', icon: '😂', text: 'Her: I\'m fine.\nTranslation: I\'m processing 3 life crises simultaneously.' },
  { type: 'FACT', icon: '📚', text: 'Malala Yousafzai is the youngest Nobel Peace Prize laureate in history.' },
  { type: 'GREEN FLAG', icon: '💚', text: 'She explains things without making you feel dumb for not knowing.' },
  { type: 'QUOTE', icon: '💪', text: '"I\'m tough, ambitious, and I know exactly what I want. If that makes me a bitch, okay." — Madonna' },
  { type: 'FACT', icon: '🧮', text: 'Ada Lovelace wrote the first computer algorithm in the 1840s — before computers existed.' },
  { type: 'MEME', icon: '😂', text: 'Women multitask so naturally that "doing one thing at a time" feels suspicious.' },
  { type: 'GREEN FLAG', icon: '💚', text: 'She introduces you as her friend with genuine pride.' },
  { type: 'QUOTE', icon: '🔥', text: '"Here\'s to strong women. May we know them. May we be them. May we raise them." — Unknown' },
  { type: 'FACT', icon: '🎬', text: 'Hedy Lamarr, a Hollywood actress, co-invented frequency-hopping spread spectrum — used in WiFi and Bluetooth today.' },
];

let curiosityIndex = -1;

function openCuriosityBox() {
  curiosityCount++;
  document.getElementById('curiosity-count').textContent = curiosityCount;

  curiosityIndex = (curiosityIndex + 1) % CURIOSITY_ITEMS.length;
  const item = CURIOSITY_ITEMS[curiosityIndex];

  const lid = document.getElementById('box-lid');
  const reveal = document.getElementById('box-reveal');

  lid.classList.add('hidden');
  reveal.classList.remove('hidden');
  document.getElementById('box-reveal-icon').textContent = item.icon;
  document.getElementById('box-reveal-label').textContent = item.type;
  document.getElementById('box-reveal-text').textContent = item.text;

  const box = document.getElementById('mystery-box');
  box.style.animation = 'none';
  box.offsetHeight;
  box.style.animation = '';

  // After a bit, restore the box lid for the "click again" feel
  setTimeout(() => {
    lid.classList.remove('hidden');
    reveal.classList.add('hidden');
    lid.textContent = ['📦', '🎁', '📫', '🗃️'][Math.floor(Math.random() * 4)];
  }, 4000);
}

// ════════════════════════════════════════════════════════════════
// 3. FLIP CARDS — What People Think vs Reality
// ════════════════════════════════════════════════════════════════

const FLIP_DATA = [
  { front: '"She is quiet"', back: 'Actually observing everything 👀' },
  { front: '"She is emotional"', back: 'She just cares deeply 💖' },
  { front: '"She talks a lot"', back: 'She communicates openly — big difference' },
  { front: '"She is dramatic"', back: 'She notices details others miss 🔍' },
  { front: '"She is bossy"', back: 'She has leadership energy 👑' },
  { front: '"She overreacts"', back: 'She had healthy boundaries all along' },
  { front: '"She is too sensitive"', back: 'She\'s emotionally intelligent ✨' },
  { front: '"She\'s always busy"', back: 'She\'s building something incredible 🔨' },
  { front: '"She\'s indecisive"', back: 'She weighs every angle meticulously 🧠' },
  { front: '"She\'s too ambitious"', back: 'She knows exactly what she wants 🎯' },
  { front: '"She can\'t take a joke"', back: 'She just has higher standards 💅' },
  { front: '"She is naive"', back: 'She chooses to see the good in people 🌿' },
];

function initFlipCards() {
  const grid = document.getElementById('flip-grid');
  grid.innerHTML = '';
  FLIP_DATA.forEach((item, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'flip-card-wrap';
    wrap.id = `fc-${i}`;
    wrap.onclick = () => wrap.classList.toggle('flipped');
    wrap.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-face flip-front">
          <span class="flip-front-label">What they think</span>
          <span class="flip-front-text">${item.front}</span>
          <span class="flip-front-hint">tap to flip 🃏</span>
        </div>
        <div class="flip-face flip-back">
          <span class="flip-back-text">${item.back}</span>
        </div>
      </div>`;
    grid.appendChild(wrap);
  });
}

// ════════════════════════════════════════════════════════════════
// 4. EMOJI QUIZ — Guess the Iconic Woman
// ════════════════════════════════════════════════════════════════

const EMOJI_QUESTIONS = [
  {
    emoji: '👩‍🚀 🚀 🇮🇳',
    hint: 'First Indian-origin woman in space',
    answer: 'Kalpana Chawla',
    fact: 'She completed 252 Earth orbits aboard Space Shuttle Columbia.',
    choices: ['Sunita Williams', 'Kalpana Chawla', 'Indira Gandhi', 'Savitribai Phule'],
  },
  {
    emoji: '🎤 🐍 💿',
    hint: 'Queen of pop with 12 Grammy awards',
    answer: 'Taylor Swift',
    fact: 'She re-recorded her albums to own her masters — a power move.',
    choices: ['Beyoncé', 'Adele', 'Taylor Swift', 'Rihanna'],
  },
  {
    emoji: '📚 ✊ 👧',
    hint: 'Nobel Peace Prize at 17 years old',
    answer: 'Malala Yousafzai',
    fact: 'She is the youngest Nobel Peace Prize laureate ever.',
    choices: ['Greta Thunberg', 'Malala Yousafzai', 'Ruth Bader Ginsburg', 'Mary Shelley'],
  },
  {
    emoji: '👩‍💻 🧮 🕰️',
    hint: 'Wrote the first computer algorithm in the 1800s',
    answer: 'Ada Lovelace',
    fact: 'She theorised computers 100 years before they were built.',
    choices: ['Grace Hopper', 'Ada Lovelace', 'Marie Curie', 'Rosalind Franklin'],
  },
  {
    emoji: '⚗️ 🏆🏆 🇵🇱',
    hint: 'Two Nobel Prizes. First and only person to achieve this in two sciences.',
    answer: 'Marie Curie',
    fact: 'She is still the only person to win Nobel Prizes in two different sciences.',
    choices: ['Ada Lovelace', 'Rosalind Franklin', 'Marie Curie', 'Hedy Lamarr'],
  },
  {
    emoji: '🎨 💀 🌵',
    hint: 'Mexican surrealist painter known for her self-portraits',
    answer: 'Frida Kahlo',
    fact: 'She painted herself in pain and power — over 55 self-portraits.',
    choices: ['Georgia O\'Keeffe', 'Frida Kahlo', 'Mary Cassatt', 'Yayoi Kusama'],
  },
  {
    emoji: '🧬 🔬 ❌',
    hint: 'Her X-ray work led to the discovery of DNA, but she was not credited',
    answer: 'Rosalind Franklin',
    fact: 'Photo 51, taken by Franklin, was the key to discovering DNA\'s structure.',
    choices: ['Marie Curie', 'Ada Lovelace', 'Hedy Lamarr', 'Rosalind Franklin'],
  },
  {
    emoji: '🏍️ ✊🏽 💪',
    hint: 'Led Rani Lakshmibai regiment, India\'s freedom fighter',
    answer: 'Lakshmi Sahgal',
    fact: 'She led an all-woman regiment in the Indian National Army in the 1940s.',
    choices: ['Savitribai Phule', 'Lakshmi Sahgal', 'Indira Gandhi', 'Sarojini Naidu'],
  },
];

let eqIndex = 0, eqScore = 0, eqStreak = 0, eqAnswered = false;

function initEmojiQuiz() {
  eqIndex = 0; eqScore = 0; eqStreak = 0; eqAnswered = false;
  updateEQStats();
  renderEQ();
}

function updateEQStats() {
  document.getElementById('eq-score').textContent = eqScore;
  document.getElementById('eq-progress').textContent = `${eqIndex + 1} / ${EMOJI_QUESTIONS.length}`;
  document.getElementById('eq-streak').textContent = eqStreak;
}

function renderEQ() {
  const q = EMOJI_QUESTIONS[eqIndex];
  eqAnswered = false;
  document.getElementById('emoji-display').textContent = q.emoji;
  document.getElementById('emoji-hint').textContent = q.hint;

  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  const shuffled = [...q.choices].sort(() => Math.random() - 0.5);
  shuffled.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.onclick = () => checkEQAnswer(choice, btn, q);
    grid.appendChild(btn);
  });

  document.getElementById('answer-reveal').classList.add('hidden');
  document.getElementById('emoji-clue-card').classList.remove('hidden');
  document.getElementById('choices-grid').classList.remove('hidden');
  document.getElementById('emoji-game-area').classList.remove('hidden');
  document.getElementById('eq-result').classList.add('hidden');
}

function checkEQAnswer(choice, btn, q) {
  if (eqAnswered) return;
  eqAnswered = true;

  const correct = choice === q.answer;
  document.querySelectorAll('.choice-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === q.answer) b.classList.add('correct');
  });
  if (!correct) {
    btn.classList.add('wrong');
    eqStreak = 0;
  } else {
    eqScore += (1 + Math.min(eqStreak, 3));
    eqStreak++;
  }
  updateEQStats();

  document.getElementById('answer-icon').textContent = correct ? '✅' : '❌';
  document.getElementById('answer-text').textContent = q.answer;
  document.getElementById('answer-fact').textContent = q.fact;
  document.getElementById('answer-reveal').classList.remove('hidden');
  document.getElementById('emoji-clue-card').classList.add('hidden');
  document.getElementById('choices-grid').classList.add('hidden');
}

function nextEmojiQuestion() {
  eqIndex++;
  if (eqIndex >= EMOJI_QUESTIONS.length) {
    showEQResult();
  } else {
    updateEQStats();
    renderEQ();
  }
}

function showEQResult() {
  document.getElementById('emoji-game-area').classList.add('hidden');
  document.getElementById('eq-result').classList.remove('hidden');

  const p = eqScore;
  let title, msg;
  if (p >= 12) { title = '🏆 Legendary Womxn Scholar!'; msg = 'You clearly know your icons. We are not worthy.'; }
  else if (p >= 8) { title = '🌟 Icon Enthusiast!'; msg = 'Solid knowledge — you\'ve done your reading!'; }
  else if (p >= 5) { title = '📚 Learning & Growing!'; msg = 'You\'re on your way to legendary status.'; }
  else { title = '👀 Discovery Mode!'; msg = 'You just met some incredible women. Go Google them!'; }

  document.getElementById('eq-title').textContent = title;
  document.getElementById('eq-msg').textContent = msg;
  document.getElementById('eq-final').textContent = `${eqScore} pts`;
}

function restartEmojiQuiz() {
  document.getElementById('eq-result').classList.add('hidden');
  initEmojiQuiz();
}

// ════════════════════════════════════════════════════════════════
// 5. PERSONALITY QUIZ — What Kind of Girl Are You?
// ════════════════════════════════════════════════════════════════

const PQ_QUESTIONS = [
  {
    q: "🌅 Pick your vibe",
    opts: [
      { text: '☕ Morning coffee & journaling', type: 'mentor' },
      { text: '🎧 Music on, world off', type: 'adventure' },
      { text: '📚 Lost in a book or a rabbit hole', type: 'mentor' },
      { text: '🔥 Making chaos look cute', type: 'chaos' },
    ]
  },
  {
    q: "👯 What's your role in the group?",
    opts: [
      { text: '📋 The Planner — itinerary ready at 9am', type: 'main' },
      { text: '😂 The Chaotic Friend — plan? what plan?', type: 'chaos' },
      { text: '🫂 The Therapist — everyone\'s crying shoulder', type: 'mentor' },
      { text: '📲 The Meme Dealer — quality content 24/7', type: 'chaos' },
    ]
  },
  {
    q: "🌮 It's Saturday night. You're:",
    opts: [
      { text: '✈️ Booking a spontaneous trip', type: 'adventure' },
      { text: '🎉 Hosting and making memories', type: 'main' },
      { text: '🛋️ Cozy night in, unbothered', type: 'mentor' },
      { text: '🌀 Started 3 projects at midnight', type: 'chaos' },
    ]
  },
  {
    q: "💬 Your texting style is:",
    opts: [
      { text: 'Long thoughtful paragraphs 📝', type: 'mentor' },
      { text: 'One word + punctuation 🙂', type: 'main' },
      { text: 'All emojis, no context 🫡🔥💀', type: 'chaos' },
      { text: 'Voice notes on voice notes 🎤', type: 'adventure' },
    ]
  },
  {
    q: "🌟 Pick something that speaks to you",
    opts: [
      { text: '🌍 Exploring the world & collecting stories', type: 'adventure' },
      { text: '👑 Being undeniable in every room', type: 'main' },
      { text: '🧠 Deep conversations at 3am', type: 'mentor' },
      { text: '😅 Controlled chaos is still controlled', type: 'chaos' },
    ]
  },
];

const PQ_RESULTS = {
  main: {
    emoji: '✨',
    title: 'Main Character Energy',
    desc: 'You walk into rooms and somehow people notice. You\'re the one everyone wants to be around, and you make that look effortless. Goals? Exceeded. Vibes? Immaculate.',
    tags: ['Natural Leader', 'Undeniable Presence', 'Effortlessly Cool', 'Sets the Standard'],
  },
  chaos: {
    emoji: '😂',
    title: 'Chaos Bestie',
    desc: 'You are the spark in every story. Spontaneous, hilarious, and wildly creative — life with you is never boring. You turn any situation into a memory. Iconic.',
    tags: ['Spontaneous', 'Hilarious', 'Chaotic Good', 'Meme Queen'],
  },
  mentor: {
    emoji: '🧠',
    title: 'Wise Mentor',
    desc: 'You\'re that person everyone calls at 2am, and you actually pick up. Your emotional intelligence is off the charts. You see through people in the best way possible.',
    tags: ['Emotionally Intelligent', 'Deeply Loyal', 'The Anchor', 'Sees Everything'],
  },
  adventure: {
    emoji: '🌍',
    title: 'Adventure Girl',
    desc: 'You live for the next chapter. New cities, new playlists, new experiences — you collect stories instead of things. Your curiosity is your superpower.',
    tags: ['Free Spirit', 'Curious Soul', 'Story Collector', 'Always Ready'],
  },
};

let pqAnswers = [];
let pqCurrent = 0;

function startPQ() {
  pqAnswers = []; pqCurrent = 0;
  document.getElementById('pq-start').classList.add('hidden');
  document.getElementById('pq-result').classList.add('hidden');
  document.getElementById('pq-area').classList.remove('hidden');
  renderPQ();
}

function renderPQ() {
  const q = PQ_QUESTIONS[pqCurrent];
  document.getElementById('pq-fill').style.width = `${(pqCurrent / PQ_QUESTIONS.length) * 100}%`;
  document.getElementById('pq-counter').textContent = `Question ${pqCurrent + 1} of ${PQ_QUESTIONS.length}`;
  document.getElementById('pq-q').textContent = q.q;

  const opts = document.getElementById('pq-opts');
  opts.innerHTML = '';
  q.opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'pq-opt-btn';
    btn.textContent = opt.text;
    btn.onclick = () => {
      pqAnswers.push(opt.type);
      pqCurrent++;
      if (pqCurrent >= PQ_QUESTIONS.length) {
        showPQResult();
      } else {
        renderPQ();
      }
    };
    opts.appendChild(btn);
  });
}

function showPQResult() {
  document.getElementById('pq-area').classList.add('hidden');
  document.getElementById('pq-result').classList.remove('hidden');

  const counts = {};
  pqAnswers.forEach(t => counts[t] = (counts[t] || 0) + 1);
  const topType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const result = PQ_RESULTS[topType];

  document.getElementById('pq-fill').style.width = '100%';
  document.getElementById('pq-r-emoji').textContent = result.emoji;
  document.getElementById('pq-r-title').textContent = result.title;
  document.getElementById('pq-r-desc').textContent = result.desc;

  const tags = document.getElementById('pq-r-tags');
  tags.innerHTML = result.tags.map(t => `<span class="pq-tag">${t}</span>`).join('');
}

function sharePQ() {
  const title = document.getElementById('pq-r-title').textContent;
  const emoji = document.getElementById('pq-r-emoji').textContent;
  navigator.clipboard?.writeText(`${emoji} I'm a "${title}" — discovered on Women's Day 2026! 🌸\n\nWhich one are you?`).then(() => {
    document.getElementById('pq-toast').textContent = '✅ Copied! Paste it anywhere 📋';
    setTimeout(() => document.getElementById('pq-toast').textContent = '', 2500);
  });
}

function restartPQ() {
  document.getElementById('pq-result').classList.add('hidden');
  document.getElementById('pq-start').classList.remove('hidden');
}

// ════════════════════════════════════════════════════════════════
// 6. DECODE HER TEXT
// ════════════════════════════════════════════════════════════════

const DECODE_DATA = [
  { msg: "It's fine.", meaning: "It is absolutely not fine. Not even a little." },
  { msg: "Do whatever you want.", meaning: "Wrong answer detected. Proceed with extreme caution. 🚨" },
  { msg: "Nothing.", meaning: "Definitely something. She's processing. Give space." },
  { msg: "I'm almost ready.", meaning: "She just started getting ready. ETA: 20 minutes." },
  { msg: "No, it's okay.", meaning: "It's not okay but she won't explain why rn." },
  { msg: "I'm not mad.", meaning: "She is a little bit mad. Check in again in 10 minutes." },
  { msg: "We need to talk.", meaning: "Prepare yourself. This is not a casual conversation." },
  { msg: "Lol okay.", meaning: "This was not funny and she is not okay with it." },
  { msg: "Whatever.", meaning: "She gave up trying to explain — and that's worse." },
  { msg: "You don't have to.", meaning: "You absolutely have to. This is a test. Don't fail." },
  { msg: "I'll think about it.", meaning: "The answer is probably no, but she's being polite." },
  { msg: "I'm tired.", meaning: "She's exhausted emotionally — be gentle today." },
];

let decodeIndex = 0;
let decodeRevealed = false;

function initDecodeText() {
  const chips = document.getElementById('decode-messages');
  chips.innerHTML = '';
  DECODE_DATA.forEach((item, i) => {
    const chip = document.createElement('button');
    chip.className = 'decode-msg-chip' + (i === 0 ? ' active' : '');
    chip.textContent = item.msg;
    chip.onclick = () => selectDecode(i);
    chips.appendChild(chip);
  });
  showDecode(0);
}

function selectDecode(i) {
  decodeIndex = i;
  document.querySelectorAll('.decode-msg-chip').forEach((c, j) => {
    c.classList.toggle('active', j === i);
  });
  showDecode(i);
}

function showDecode(i) {
  decodeRevealed = false;
  document.getElementById('decode-msg-display').textContent = DECODE_DATA[i].msg;
  document.getElementById('decode-reveal').textContent = '';
  document.getElementById('decode-reveal').classList.add('hidden');
  document.getElementById('decode-btn').style.display = '';
}

function decodeText() {
  if (decodeRevealed) return;
  decodeRevealed = true;
  const reveal = document.getElementById('decode-reveal');
  reveal.textContent = '🔍 ' + DECODE_DATA[decodeIndex].meaning;
  reveal.classList.remove('hidden');
  document.getElementById('decode-btn').style.display = 'none';
}

function nextDecode() {
  decodeIndex = (decodeIndex + 1) % DECODE_DATA.length;
  selectDecode(decodeIndex);
}

// ════════════════════════════════════════════════════════════════
// 7. RED FLAG DETECTOR
// ════════════════════════════════════════════════════════════════

const RF_RULES = [
  { keywords: ['brought food', 'made food', 'cooked', 'birthday', 'surprise', 'checked on', 'remembered', 'listened', 'stood up', 'defended', 'supported', 'hype', 'apologise', 'apologized', 'sorry first', 'sorry and'], level: 'green', icon: '💚', label: 'Certified Green Flag', msg: 'We love to see it. Keep that energy.' },
  { keywords: ['i forgot', 'left on read', 'left you on read', 'ghosted', 'never replied', 'i was busy', 'maybe later', 'will text you later', 'will call', 'one day', 'someday', 'when i feel like', 'not in the mood', 'too tired to reply', 'just forgot'], level: 'red', icon: '🚩', label: '🚩 Red Flag Detected', msg: 'That\'s a classic. We see you.' },
  { keywords: ['do whatever', 'whatever you want', 'i don\'t care', "it's fine", "i'm fine", 'fine.', 'nothing', 'not mad', 'not angry', 'i said okay'], level: 'warning', icon: '⚠️', label: '⚠️ Suspicious Behaviour Detected', msg: 'She\'s giving mixed signals. Tread carefully.' },
  { keywords: ['you always', 'you never', 'you always do', 'every time you', 'typical', 'as usual', 'you\'re just like'], level: 'red', icon: '🚩', label: '🚩 Major Red Flag', msg: 'Absolutist language = unresolved pattern. This needs a conversation.' },
  { keywords: ['we need to talk', 'can we talk', 'we should talk', 'something\'s off', 'i feel like'], level: 'warning', icon: '🤨', label: '🤨 Questionable — Investigate', msg: 'Something is brewing. Proceed with care.' },
];

function detectFlag() {
  const input = document.getElementById('rf-input').value.toLowerCase().trim();
  if (!input) { showToast('Type something first!'); return; }

  let result = null;
  for (const rule of RF_RULES) {
    if (rule.keywords.some(kw => input.includes(kw))) {
      result = rule;
      break;
    }
  }
  if (!result) {
    result = { icon: '🤔', label: 'Energy Unclear', msg: 'Our detector is confused. Context: needed.' };
  }

  const resEl = document.getElementById('rf-result');
  const icon = document.getElementById('rf-icon');
  const label = document.getElementById('rf-label');
  const msg = document.getElementById('rf-msg');

  resEl.style.opacity = '0';
  resEl.classList.remove('hidden');
  icon.textContent = result.icon;
  label.textContent = result.label;
  msg.textContent = result.msg;

  // Color feedback
  resEl.style.borderColor = result.level === 'green' ? 'rgba(34,197,94,0.5)' :
    result.level === 'red' ? 'rgba(239,68,68,0.5)' :
      'rgba(251,191,36,0.5)';
  resEl.style.background = result.level === 'green' ? 'rgba(34,197,94,0.1)' :
    result.level === 'red' ? 'rgba(239,68,68,0.1)' :
      'rgba(251,191,36,0.1)';
  setTimeout(() => resEl.style.opacity = '1', 50);
}

function tryRF(text) {
  document.getElementById('rf-input').value = text;
  detectFlag();
}

// ════════════════════════════════════════════════════════════════
// 8. MEME GENERATOR
// ════════════════════════════════════════════════════════════════

let activeTemplate = 'drake';

function selectTemplate(t) {
  activeTemplate = t;
  document.getElementById('tab-drake').classList.toggle('active', t === 'drake');
  document.getElementById('tab-exp').classList.toggle('active', t === 'expectation');
  document.getElementById('drake-inputs').classList.toggle('hidden', t !== 'drake');
  document.getElementById('exp-inputs').classList.toggle('hidden', t !== 'expectation');
  document.getElementById('canvas-wrap').style.display = 'none';
  document.getElementById('dl-btn').classList.add('hidden');
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = [];
  for (let w of words) {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      lines.push(line.trim());
      line = w + ' ';
    } else {
      line = test;
    }
  }
  lines.push(line.trim());
  const totalH = lines.length * lineHeight;
  const startY = y - totalH / 2 + lineHeight / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}

function generateMeme() {
  const canvas = document.getElementById('meme-canvas');
  const ctx = canvas.getContext('2d');
  const wrap = document.getElementById('canvas-wrap');

  if (activeTemplate === 'drake') {
    const top = document.getElementById('drake-top').value.trim() || 'Ignoring red flags';
    const bottom = document.getElementById('drake-bottom').value.trim() || 'Appreciating green flags';
    const img = document.getElementById('img-drake');
    if (!img.complete || img.naturalWidth === 0) { showToast('Image loading, try again!'); return; }

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const hw = canvas.width / 2;
    const hh = canvas.height / 2;
    ctx.font = `bold ${Math.floor(hw * 0.1)}px Outfit, Arial`;
    ctx.fillStyle = '#111';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    wrapText(ctx, top, hw * 1.5, hh * 0.5, hw * 0.85, hw * 0.12);
    wrapText(ctx, bottom, hw * 1.5, hh * 1.5, hw * 0.85, hw * 0.12);

  } else {
    const exp = document.getElementById('exp-top').value.trim() || "Women's Day motivation";
    const real = document.getElementById('exp-bottom').value.trim() || 'Sending memes to each other';
    const img = document.getElementById('img-expectation');
    if (!img.complete || img.naturalWidth === 0) { showToast('Image loading, try again!'); return; }

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const hw = canvas.width / 2;
    const fSize = Math.floor(hw * 0.07);
    ctx.font = `bold ${fSize}px Outfit, Arial`;
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#111';
    ctx.lineWidth = fSize * 0.18;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    const padding = fSize;
    const y = canvas.height - padding;

    // Left panel
    ctx.strokeText(exp, hw * 0.5, y);
    ctx.fillText(exp, hw * 0.5, y);
    // Right panel
    ctx.strokeText(real, hw * 1.5, y);
    ctx.fillText(real, hw * 1.5, y);
  }

  wrap.style.display = 'block';
  document.getElementById('dl-btn').classList.remove('hidden');
}

function downloadMeme() {
  const canvas = document.getElementById('meme-canvas');
  const a = document.createElement('a');
  a.download = 'womens-day-meme.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
  showToast('Meme downloaded! 🎉');
}

// ════════════════════════════════════════════════════════════════
// 9. COMPLIMENT MACHINE
// ════════════════════════════════════════════════════════════════

const COMPLIMENTS = [
  "Your confidence is louder than your doubts. 💪",
  "Your curiosity will take you further than you imagine. 🌍",
  "You make spaces feel alive just by being in them. ✨",
  "The way you love others says so much about your character. 💖",
  "You are not too much — you are exactly enough. 🌸",
  "Your creativity is genuinely one of a kind. 🎨",
  "You carry strength in ways people don't even see. 🦋",
  "Your presence is a gift that others take for granted. Don't you. 👑",
  "You are allowed to take up space. All of it. 💚",
  "The version of you that you're becoming? Incredible. 🔥",
  "You turn problems into plans and chaos into momentum. ⚡",
  "Your sensitivity is not a weakness — it's a superpower. 🌊",
  "You laugh in a way that makes everyone else want to laugh too. 😊",
  "The ideas in your head deserve to be heard. Say them. 🎤",
  "You've survived 100% of your bad days so far. Legendary streak. 🏆",
  "Your mind works in ways that the world needs more of. 🧠",
  "You inspire more people than you'll ever know. 🌟",
  "You don't shrink to fit in rooms — you expand them. 🚀",
];

let lastCompliment = '';

function generateCompliment() {
  let c;
  do { c = rand(COMPLIMENTS); } while (c === lastCompliment && COMPLIMENTS.length > 1);
  lastCompliment = c;

  const card = document.getElementById('compliment-card');
  const txt = document.getElementById('compliment-text');
  card.style.opacity = '0';
  card.style.transform = 'scale(0.95)';
  setTimeout(() => {
    txt.textContent = c;
    card.style.transition = 'all .4s ease';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    launchSparkles();
  }, 200);

  document.getElementById('share-compliment-btn').style.display = '';
  document.getElementById('compliment-toast').textContent = '';
}

function launchSparkles() {
  const container = document.getElementById('sparkles');
  container.innerHTML = '';
  const emojis = ['✨', '🌸', '💖', '⭐', '💫', '🌟', '🦋'];
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = rand(emojis);
    s.style.left = `${Math.random() * 90 + 5}%`;
    s.style.top = `${Math.random() * 80 + 10}%`;
    s.style.animationDelay = `${Math.random() * 0.5}s`;
    container.appendChild(s);
  }
}

function shareCompliment() {
  const text = document.getElementById('compliment-text').textContent;
  navigator.clipboard?.writeText(`💌 "${text}"\n\nHappy Women's Day 2026 🌸`).then(() => {
    document.getElementById('compliment-toast').textContent = '✅ Copied! Send it to someone who needs it 💚';
    setTimeout(() => document.getElementById('compliment-toast').textContent = '', 3000);
  });
}

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initFlipCards();
  initEmojiQuiz();
  initDecodeText();
  // Auto-trigger first green flag
  generateFlag();
  generateCompliment();
});
