const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const world = {
  width: 4000,
  height: 4000
};

const tracks = [
  {
    name: "Redecorate",
    audio: "music/Twenty One Pilots - Redecorate (Lyric Video)(1).mp3",
    cover: "albumcovers/Redecorate.png",
    colors: { primary: "#ee88af", secondary: "#81c1cb" },
    border: "#F3DE09",
    artist: "Twenty One Pilots"
  },
  {
    name: "Under Cover of Darkness",
    audio: "music/The Strokes - Under Cover Of Darkness(1).mp3",
    cover: "albumcovers/UnderCoverOfDarkness.png",
    colors: { primary: "#FFD631", secondary: "#EA53A3" },
    border: "#3D7BC4",
    artist: "The Strokes"
  },
  {
    name: "November Has Come",
    audio: "music/Gorillaz - November Has Come - Demon Days(1).mp3",
    cover: "albumcovers/NovemberHasCome.png",
    colors: { primary: "#0C1A2D", secondary: "#FFFFFF" },
    border: "#B86A6F",
    artist: "Gorillaz"
  },
  {
    name: "Black Madonna",
    audio: "music/Cage The Elephant - Black Madonna (Official Audio)(1).mp3",
    cover: "albumcovers/BlackMadonna.png",
    colors: { primary: "#1BB6D9", secondary: "#E72F2D" },
    border: "#EDEAE5",
    artist: "Cage The Elephant"
  },
  {
    name: "Just",
    audio: "music/Radiohead - Just [HQ](1).mp3",
    cover: "albumcovers/Just.png",
    colors: { primary: "#000000", secondary: "#f0d077" },
    border: "#ff0000",
    artist: "Radiohead"
  },
  {
    name: "This Charming Man",
    audio: "music/This Charming Man (2008 Remaster)(1).mp3",
    cover: "albumcovers/ThisCharmingMan.png",
    colors: { primary: "#9f819b", secondary: "#680b42" },
    border: "#7B5274",
    artist: "The Smiths"
  },
  {
    name: "Live Forever",
    audio: "music/Live Forever(1).mp3",
    cover: "albumcovers/LiveForever.png",
    colors: { primary: "#F4D27F", secondary: "#6FA6C4" },
    border: "#A7A58C",
    artist: "Oasis"
  },
  {
    name: "Get Got",
    audio: "music/Death Grips - Get Got 4(1).mp3",
    cover: "albumcovers/GetGot.png",
    colors: { primary: "#FFFFFF", secondary: "#000000" },
    border: "#5A5A5C",
    artist: "Death Grips"
  },
  {
    name: "I THINK",
    audio: "music/Tyler, The Creator - I THINK 4(1).mp3",
    cover: "albumcovers/ITHINK.png",
    colors: { primary: "#f7b4c6", secondary: "#423e3d" },
    border: "#A39F8F",
    artist: "Tyler, The Creator"
  },
  {
    name: "Like You Do",
    audio: "music/Like You Do 4(1).mp3",
    cover: "albumcovers/LikeYouDo.png",
    colors: { primary: "#2A1A1A", secondary: "#E02622" },
    border: "#0F0505",
    artist: "Joji"
  },
  {
    name: "Sober to Death",
    audio: "music/Car Seat Headrest - _Sober to Death_ (Official Audio) 4(1).mp3",
    cover: "albumcovers/SoberToDeath.png",
    colors: { primary: "#FFFFFF", secondary: "#000000" },
    border: "#7E7E7E",
    artist: "Car Seat Headrest"
  },
  {
    name: "Back To Me",
    audio: "music/SpotiDownloader.com - Back To Me - The Marías(1).mp3",
    cover: "albumcovers/Cover of Back To Me by The Marías.jpg",
    colors: { primary: "#EDEDED", secondary: "#1E1D1F" },
    border: "#C6AEB2",
    artist: "The Marías"
  },
  {
    name: "Entombed",
    audio: "music/entombed(1).mp3",
    cover: "albumcovers/Cover of Entombed by Deftones.jpg",
    colors: { primary: "#0D0F10", secondary: "#D3421C" },
    border: "#3C3A28",
    artist: "Deftones"
  },
  {
    name: "Letter in a Suitcase",
    audio: "music/letterinasuitcase(1).mp3",
    cover: "albumcovers/Cover of Letter in a Suitcase by Anarbor.jpg",
    colors: { primary: "#5AB7FF", secondary: "#F4806C" },
    border: "#FCE0B7",
    artist: "Anarbor"
  },
  {
    name: "SIXFT",
    audio: "music/sixft(1).mp3",
    cover: "albumcovers/Cover of SIXFT by I DONT KNOW HOW BUT THEY FOUND ME.jpg",
    colors: { primary: "#FF7F22", secondary: "#8EC8F6" },
    border: "#C8B8A4",
    artist: "I DONT KNOW HOW BUT THEY FOUND ME"
  },
  {
    name: "Wait & See",
    audio: "music/waitandsee(1).mp3",
    cover: "albumcovers/Cover of Wait & See by Saint Motel.jpg",
    colors: { primary: "#14284B", secondary: "#E47A88" },
    border: "#F2CFA8",
    artist: "Saint Motel"
  },
  {
    name: "All My Life",
    audio: "music/SpotiDown.App - All My Life - Foo Fighters(1).mp3",
    cover: "albumcovers/SpotiDown.App - All My Life - Foo Fighters.jpeg",
    colors: { primary: "#FFFFFF", secondary: "#000000" },
    border: "#C91F1F",
    artist: "Foo Fighters"
  },
  {
    name: "Faint",
    audio: "music/SpotiDown.App - Faint - Linkin Park(1).mp3",
    cover: "albumcovers/Cover of Faint by Linkin Park.jpg",
    colors: { primary: "#2E2B2A", secondary: "#A08D74" },
    border: "#706C63",
    artist: "Linkin Park"
  },
  {
    name: "In the Aeroplane Over the Sea",
    audio: "music/SpotiDown.App - In the Aeroplane Over the Sea - Neutral Milk Hotel(1).mp3",
    cover: "albumcovers/SpotiDown.App - In the Aeroplane Over the Sea - Neutral Milk Hotel.jpeg",
    colors: { primary: "#C3D3C5", secondary: "#9C3B32" },
    border: "#EAD9B2",
    artist: "Neutral Milk Hotel"
  },
  {
    name: "Loretta",
    audio: "music/SpotiDownloader.com - Loretta - Ginger Root(1).mp3",
    cover: "albumcovers/Cover of Loretta by Ginger Root.jpg",
    colors: { primary: "#222A72", secondary: "#FFDA28" },
    border: "#3B3F99",
    artist: "Ginger Root"
  },
  {
    name: "New York",
    audio: "music/SpotiDownloader.com - New York - Junior Varsity(1).mp3",
    cover: "albumcovers/Cover of New York by Junior Varsity.jpg",
    colors: { primary: "#1A223D", secondary: "#4B3E6D" },
    border: "#D69078",
    artist: "Junior Varsity"
  },
  {
    name: "Reelin' In The Years",
    audio: "music/SpotiDownloader.com - Reelin' In The Years - Steely Dan(1).mp3",
    cover: "albumcovers/Cover of Reelin' In The Years by Steely Dan.jpg",
    colors: { primary: "#E5C78F", secondary: "#C83772" },
    border: "#63B9DD",
    artist: "Steely Dan"
  },
  {
    name: "Scar Tissue",
    audio: "music/SpotiDownloader.com - Scar Tissue - Red Hot Chili Peppers(1).mp3",
    cover: "albumcovers/Cover of Scar Tissue by Red Hot Chili Peppers.jpg",
    colors: { primary: "#0077C8", secondary: "#E23E0F" },
    border: "#F7D59A",
    artist: "Red Hot Chili Peppers"
  },
  {
    name: "Yoshimi Battles the Pink Robots, Pt. 1",
    audio: "music/SpotiDownloader.com - Yoshimi Battles the Pink Robots, Pt. 1 - The Flaming Lips(1).mp3",
    cover: "albumcovers/Cover of Yoshimi Battles the Pink Robots, Pt. 1 by The Flaming Lips.jpg",
    colors: { primary: "#F5DFA8", secondary: "#D86F4E" },
    border: "#F6BBD1",
    artist: "The Flaming Lips"
  },
  {
    name: "deep in it",
    audio: "music/SpotiDownloader.com - deep in it - berlioz(1).mp3",
    cover: "albumcovers/Cover of deep in it by berlioz, Ted Jasper.jpg",
    colors: { primary: "#FFFFFF", secondary: "#FFDA28" },
    border: "#0090A0",
    artist: "berlioz, Ted Jasper"
  }
];

const player = {
  x: world.width / 2,
  y: world.height / 2,
  r: 39,
  vx: 0,
  vy: 0,
  angle: 0
};

const ui = {
  playPause: document.getElementById("play-pause"),
  stop: document.getElementById("stop-track"),
  time: document.getElementById("ui-time"),
  progress: document.getElementById("progress"),
  progressBar: document.getElementById("ui-progress"),
  progressThumb: document.getElementById("ui-progress-thumb"),
  cover: document.getElementById("ui-cover"),
  title: document.getElementById("ui-title"),
  artist: document.getElementById("ui-artist"),
  left: document.querySelector(".ui-left")
};

const keys = { left: false, right: false, up: false, down: false };
const mouse = { x: 0, y: 0 };
const bullets = [];
const songs = [];
const fogBlobs = [];
let camera = { x: 0, y: 0 };
const fireCooldown = 120;
let lastFire = 0;
let bgColor = "#000";
let currentAudio = null;
let currentTrack = null;
const particles = [];
let particleColor = "#ffffff";
let playerColor = "#000000";
let playerStroke = "#ffffff";
let projectileColor = "#ffffff";
let audioCtx = null;
let analyser = null;
let sourceNode = null;
let freqData = null;
const audioCache = new Map();
let touchActive = false;
let touchPos = { x: 0, y: 0 };

const physics = {
  accel: 0.6,
  friction: 0.96,
  maxSpeed: 8
};
const borderThickness = 6;
let uiBarHeight = 70;
let uiBarLineY = 70;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
function getSongRect(song) {
  const scale = currentTrack && currentTrack === song.track ? 1.35 : 1;
  const size = song.size * scale;
  const offset = (size - song.size) / 2;
  return { x: song.x - offset, y: song.y - offset, size, scale };
}
function hexToRgb(hex) {
  if (!hex) return { r: 255, g: 255, b: 255 };
  const cleaned = hex.replace("#", "");
  const value = cleaned.length === 3 ? cleaned.split("").map(c => c + c).join("") : cleaned;
  const num = parseInt(value, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const uiH = document.getElementById("player-ui").offsetHeight || 70;
  uiBarHeight = uiH + 6;
  uiBarLineY = uiH;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function preloadAudio() {
  tracks.forEach((track) => {
    const path = track.audio.replace(new RegExp("^music/", "i"), "music/");
    if (!audioCache.has(path)) {
      const a = new Audio(path);
      a.preload = "auto";
      a.load();
      audioCache.set(path, a);
    }
  });
}

function seedFog() {
  fogBlobs.length = 0;
  const clusters = 9;
  const blobsPerCluster = 4 + Math.floor(Math.random() * 2);
  const clusterRadius = 200;
  const clusterCenters = [];
  const cols = Math.ceil(Math.sqrt(clusters));
  const rows = Math.ceil(clusters / cols);
  const xStep = world.width / cols;
  const yStep = (world.height - uiBarHeight) / rows;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols && clusterCenters.length < clusters; col++) {
      const jitterX = (Math.random() - 0.5) * xStep * 0.35;
      const jitterY = (Math.random() - 0.5) * yStep * 0.35;
      const cx = xStep * (col + 0.5) + jitterX;
      const cy = uiBarHeight + yStep * (row + 0.5) + jitterY;
      clusterCenters.push({ x: cx, y: cy });
    }
  }

  for (const c of clusterCenters) {
    for (let i = 0; i < blobsPerCluster; i++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = Math.random() * clusterRadius * 0.7;
      const r = 180 + Math.random() * 260;
      fogBlobs.push({
        x: c.x + Math.cos(ang) * dist,
        y: c.y + Math.sin(ang) * dist,
        r,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        tintIndex: Math.random() < 0.5 ? 0 : 1
      });
    }
  }
}

function seedParticles() {
  particles.length = 0;
  const count = 480;
  for (let i = 0; i < count; i++) {
    const isBig = Math.random() < 0.12;
    const baseRadius = 90 + Math.random() * 240;
    particles.push({
      x: Math.random() * world.width,
      y: Math.random() * world.height,
      r: isBig ? 1.6 + Math.random() * 1.6 : 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      baseRadius,
      wobble: Math.random() * 0.15,
      speed: (Math.random() * 0.3 + 0.05) * (Math.random() < 0.5 ? -1 : 1),
      isThird: Math.random() < 0.33,
      locked: false,
      flare: 0,
      flareTint: null
    });
  }
}

seedParticles();
seedFog();
preloadAudio();

function seedSongs() {
  songs.length = 0;
  const margin = 300;
  tracks.forEach((track) => {
    let x, y;
    do {
      x = Math.random() * (world.width - margin * 2) + margin;
      y = Math.random() * (world.height - margin * 2) + margin;
    } while (Math.hypot(x - player.x, y - player.y) < 500);
    const img = new Image();
    img.src = track.cover;
    songs.push({
      x,
      y,
      size: 128,
      track,
      img,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      locked: false
    });
  });
}

seedSongs();

function handleKeyDown(e) {
  if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = true;
  if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = true;
  if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = true;
  if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = true;
  if (e.code === "Space") tryFire();
  if (["ArrowLeft", "a", "A", "ArrowRight", "d", "D", "ArrowUp", "w", "W", "ArrowDown", "s", "S", "Space"].includes(e.key)) {
    e.preventDefault();
  }
}

function handleKeyUp(e) {
  if (["ArrowLeft", "a", "A"].includes(e.key)) keys.left = false;
  if (["ArrowRight", "d", "D"].includes(e.key)) keys.right = false;
  if (["ArrowUp", "w", "W"].includes(e.key)) keys.up = false;
  if (["ArrowDown", "s", "S"].includes(e.key)) keys.down = false;
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener("click", (e) => {
  const target = { x: camera.x + e.clientX, y: camera.y + e.clientY };
  tryFire(target);
});
ui.playPause.addEventListener("click", togglePlayPause);
ui.stop.addEventListener("click", () => {
  stopCurrent();
});
ui.progress.addEventListener("click", (e) => {
  if (!currentAudio) return;
  const rect = ui.progress.getBoundingClientRect();
  const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
  currentAudio.currentTime = ratio * (currentAudio.duration || 0);
  updateUIFromAudio();
});

function updateTouchFromEvent(e) {
  const t = e.touches[0];
  if (!t) return;
  touchPos.x = t.clientX;
  touchPos.y = t.clientY;
}

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  updateTouchFromEvent(e);
  touchActive = true;
}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  updateTouchFromEvent(e);
}, { passive: false });

["touchend", "touchcancel"].forEach((ev) => {
  canvas.addEventListener(ev, (e) => {
    if (e.touches.length === 0) {
      touchActive = false;
    } else {
      updateTouchFromEvent(e);
    }
  });
});

let isScrubbing = false;
ui.progress.addEventListener("pointerdown", (e) => {
  if (!currentAudio) return;
  isScrubbing = true;
  ui.progress.setPointerCapture(e.pointerId);
  scrub(e);
});
ui.progress.addEventListener("pointermove", (e) => {
  if (!isScrubbing || !currentAudio) return;
  scrub(e);
});
ui.progress.addEventListener("pointerup", (e) => {
  if (isScrubbing) {
    isScrubbing = false;
    ui.progress.releasePointerCapture(e.pointerId);
  }
});

function scrub(e) {
  const rect = ui.progress.getBoundingClientRect();
  const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
  currentAudio.currentTime = ratio * (currentAudio.duration || 0);
  updateUIFromAudio();
}

function tryFire(target) {
  const now = performance.now();
  if (now - lastFire < fireCooldown) return;
  lastFire = now;
  let angle = player.angle;
  if (target) {
    const dx = target.x - player.x;
    const dy = target.y - player.y;
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      angle = Math.atan2(dy, dx);
    }
  }
  const speed = 16;
  const barrelLen = player.r * 1.1;
  const muzzleOffset = player.r + barrelLen * 0.75;
  const startX = player.x + Math.cos(angle) * muzzleOffset;
  const startY = player.y + Math.sin(angle) * muzzleOffset;
  const avgFrameMs = 16.67;
  let lifeMs;
  if (target) {
    const dist = Math.hypot(target.x - startX, target.y - startY);
    lifeMs = Math.max(120, Math.min(2000, (dist * avgFrameMs) / speed));
  } else {
    const desiredDistance = Math.max(0, (canvas.height * 0.5 - player.r * 2) * 1.4);
    lifeMs = Math.max(300, Math.min(2200, (desiredDistance * avgFrameMs) / speed));
  }
  bullets.push({
    x: startX,
    y: startY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: lifeMs
  });
}

function updatePlayer() {
  let touchDX = 0;
  let touchDY = 0;
  if (touchActive) {
    const screenPX = player.x - camera.x;
    const screenPY = player.y - camera.y;
    touchDX = touchPos.x - screenPX;
    touchDY = touchPos.y - screenPY;
    const dist = Math.hypot(touchDX, touchDY) || 1;
    touchDX /= dist;
    touchDY /= dist;
  }
  if (keys.left) player.vx -= physics.accel;
  if (keys.right) player.vx += physics.accel;
  if (keys.up) player.vy -= physics.accel;
  if (keys.down) player.vy += physics.accel;
  if (touchActive) {
    player.vx += touchDX * physics.accel;
    player.vy += touchDY * physics.accel;
  }

  player.vx *= physics.friction;
  player.vy *= physics.friction;

  player.vx = clamp(player.vx, -physics.maxSpeed, physics.maxSpeed);
  player.vy = clamp(player.vy, -physics.maxSpeed, physics.maxSpeed);

  const minX = player.r;
  const maxX = world.width - player.r;
  const minY = uiBarHeight + player.r;
  const maxY = world.height - player.r;

  player.x = clamp(player.x + player.vx, minX, maxX);
  player.y = clamp(player.y + player.vy, minY, maxY);

  if (player.y - player.r < uiBarHeight) {
    player.y = uiBarHeight + player.r;
    if (player.vy < 0) player.vy = 0;
  }
}

function updateBullets(dt) {
  for (const b of bullets) {
    b.x += b.vx;
    b.y += b.vy;
    b.life -= dt;
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b.life <= 0 || b.x < -100 || b.x > world.width + 100 || b.y < -100 || b.y > world.height + 100) {
      spawnBulletPop(b);
      bullets.splice(i, 1);
    }
  }
}

function spawnBulletPop(b) {
  const starIsThird = Math.random() < 0.3333;
  const ringTint = starIsThird
    ? projectileColor
    : currentTrack
      ? currentTrack.colors.secondary
      : particleColor;
  const starTint = starIsThird ? projectileColor : ringTint;
  particles.push({
    x: b.x,
    y: b.y,
    r: 2,
    vx: 0,
    vy: 0,
    baseRadius: 0,
    wobble: 0,
    speed: 0,
    isThird: false,
    locked: false,
    flare: 1,
    flareTint: ringTint,
    life: 600,
    popPulse: true
  });
  particles.push({
    x: b.x,
    y: b.y,
    r: 1.8 + Math.random() * 2.2,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    baseRadius: 0,
    wobble: 0.05,
    speed: 0.02,
    isThird: starIsThird,
    locked: false,
    flare: 0.9,
    flareTint: starTint,
    popOnce: true
  });
}

function stopCurrent() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (sourceNode) {
    try { sourceNode.disconnect(); } catch (e) {}
    sourceNode = null;
  }
  analyser = null;
  freqData = null;
  currentTrack = null;
  bgColor = "#000000";
  particleColor = "#ffffff";
  playerColor = "#000000";
  playerStroke = "#ffffff";
  projectileColor = "#ffffff";
  songs.forEach((s) => {
    s.locked = false;
    s.vx += (Math.random() - 0.5) * 1.2;
    s.vy += (Math.random() - 0.5) * 1.2;
  });
  ui.cover.removeAttribute("src");
  ui.cover.removeAttribute("alt");
  ui.cover.style.background = "#777";
  ui.cover.style.visibility = "hidden";
  ui.title.textContent = "";
  ui.artist.textContent = "";
  if (ui.left) ui.left.style.visibility = "hidden";
  ui.progressBar.style.width = "0%";
  ui.time.textContent = "0:00 / 0:00";
  ui.playPause.textContent = "⏵";
}

function formatTime(sec) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateUIFromAudio() {
  if (!currentAudio || !currentTrack) return;
  const dur = currentAudio.duration || 0;
  const cur = currentAudio.currentTime || 0;
  ui.time.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
  ui.playPause.textContent = currentAudio.paused ? "⏵" : "⏸";
  const pct = dur ? Math.min(100, (cur / dur) * 100) : 0;
  ui.progressBar.style.width = `${pct}%`;
  if (ui.progressThumb) {
    ui.progressThumb.style.left = `${pct}%`;
  }
}

function playSong(song) {
  stopCurrent();
  currentTrack = song.track;
  songs.forEach((s) => { s.locked = s.track === song.track; });
  const audioPath = song.track.audio.replace(new RegExp("^music/", "i"), "music/");
  if (audioCache.has(audioPath)) {
    currentAudio = audioCache.get(audioPath).cloneNode(true);
  } else {
    currentAudio = new Audio(audioPath);
    audioCache.set(audioPath, currentAudio.cloneNode(true));
  }
  currentAudio.addEventListener("loadedmetadata", updateUIFromAudio);
  currentAudio.addEventListener("timeupdate", updateUIFromAudio);
  currentAudio.addEventListener("ended", () => {
    stopCurrent();
  });
  currentAudio.play().catch(() => {});
  if (!audioCtx) audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;
  freqData = new Uint8Array(analyser.frequencyBinCount);
  sourceNode = audioCtx.createMediaElementSource(currentAudio);
  sourceNode.connect(analyser);
  analyser.connect(audioCtx.destination);
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  bgColor = song.track.colors.primary;
  const { r, g, b } = hexToRgb(song.track.colors.secondary);
  particleColor = `rgb(${r},${g},${b})`;
  playerColor = `rgb(${r},${g},${b})`;
  playerStroke = song.track.border || "#ffffff";
  projectileColor = song.track.border || "#ffffff";
  ui.playPause.textContent = "⏸";
  if (song.track.cover) ui.cover.src = song.track.cover;
  ui.cover.style.visibility = "visible";
  ui.title.textContent = song.track.name;
  ui.artist.textContent = song.track.artist || "";
  if (ui.left) ui.left.style.visibility = "visible";
}

function togglePlayPause() {
  if (!currentAudio) return;
  if (currentAudio.paused) {
    currentAudio.play().catch(() => {});
  } else {
    currentAudio.pause();
  }
  updateUIFromAudio();
}

function updateCollisions(now) {
  for (const song of songs) {
    const rect = getSongRect(song);
    for (const b of bullets) {
      const hit = b.x > rect.x && b.x < rect.x + rect.size && b.y > rect.y && b.y < rect.y + rect.size;
      if (hit) {
        b.life = 0;
        if (currentTrack && currentTrack === song.track && currentAudio) {
          currentAudio.currentTime = Math.min(currentAudio.duration || 0, currentAudio.currentTime + 10);
          updateUIFromAudio();
        } else {
          playSong(song);
        }
        break;
      }
    }
  }
}

function updateSongs(dt) {
  const dtScale = dt / 16.67;
  for (const song of songs) {
    if (!song.locked) {
      song.vx += (Math.random() - 0.5) * 0.02 * dtScale;
      song.vy += (Math.random() - 0.5) * 0.02 * dtScale;
      const maxSpeed = 3.4;
      const speed = Math.hypot(song.vx, song.vy);
      if (speed > maxSpeed) {
        song.vx = (song.vx / speed) * maxSpeed;
        song.vy = (song.vy / speed) * maxSpeed;
      }
      song.x += song.vx * dtScale;
      song.y += song.vy * dtScale;
    } else {
      song.vx = 0;
      song.vy = 0;
    }

    const rectForBounds = getSongRect(song);
    if (rectForBounds.x < 0) {
      song.x = (rectForBounds.size - song.size) / 2;
      song.vx = song.locked ? 0 : -song.vx;
    } else if (rectForBounds.x + rectForBounds.size > world.width) {
      song.x = world.width - song.size - (rectForBounds.size - song.size) / 2;
      song.vx = song.locked ? 0 : -song.vx;
    }
    if (rectForBounds.y < uiBarHeight) {
      song.y = uiBarHeight + (rectForBounds.size - song.size) / 2;
      song.vy = song.locked ? 0 : -song.vy;
    } else if (rectForBounds.y + rectForBounds.size > world.height) {
      song.y = world.height - song.size - (rectForBounds.size - song.size) / 2;
      song.vy = song.locked ? 0 : -song.vy;
    }

    const rect = getSongRect(song);
    const innerLeft = rect.x + borderThickness;
    const innerRight = rect.x + rect.size - borderThickness;
    const innerTop = rect.y + borderThickness;
    const innerBottom = rect.y + rect.size - borderThickness;
    if (player.x > innerLeft && player.x < innerRight && player.y > innerTop && player.y < innerBottom) {
      continue;
  }

    const cx = clamp(player.x, rect.x, rect.x + rect.size);
    const cy = clamp(player.y, rect.y, rect.y + rect.size);
    const dx = player.x - cx;
    const dy = player.y - cy;
    const dist2 = dx * dx + dy * dy;
    const r = player.r;
        if (dist2 < r * r) {
          let dist = Math.sqrt(dist2);
          let nx, ny;
          if (dist < 0.0001) {
            const leftPen = player.x + r - song.x;
          const rightPen = rect.x + rect.size - (player.x - r);
        const topPen = player.y + r - rect.y;
        const bottomPen = rect.y + rect.size - (player.y - r);
        const minPen = Math.min(leftPen, rightPen, topPen, bottomPen);
        if (minPen === leftPen) { nx = -1; ny = 0; dist = 1; }
        else if (minPen === rightPen) { nx = 1; ny = 0; dist = 1; }
        else if (minPen === topPen) { nx = 0; ny = -1; dist = 1; }
        else { nx = 0; ny = 1; dist = 1; }
      } else {
        nx = dx / dist;
        ny = dy / dist;
      }
      const overlap = r - Math.max(dist, 0.0001);

      const sep = overlap + 1;
          player.x += nx * sep;
          player.y += ny * sep;
          if (!song.locked) {
            song.vx -= nx * 3.0;
            song.vy -= ny * 3.0;
          }
        }
      }

  for (let i = 0; i < songs.length; i++) {
    for (let j = i + 1; j < songs.length; j++) {
      const a = songs[i];
      const b = songs[j];
      const ra = getSongRect(a);
      const rb = getSongRect(b);
      const ax2 = ra.x + ra.size;
      const ay2 = ra.y + ra.size;
      const bx2 = rb.x + rb.size;
      const by2 = rb.y + rb.size;
      if (ra.x < bx2 && ax2 > rb.x && ra.y < by2 && ay2 > rb.y) {
        const overlapX = Math.min(ax2 - rb.x, bx2 - ra.x);
        const overlapY = Math.min(ay2 - rb.y, by2 - ra.y);
        const bounce = 1.4;
        let nx = 0;
        let ny = 0;
        if (overlapX <= overlapY) {
          const sep = overlapX + 1;
          nx = ra.x < rb.x ? -1 : 1;
          if (!a.locked && !b.locked) {
            const push = sep * 0.5;
            a.x += nx * push;
            b.x -= nx * push;
          } else if (!a.locked && b.locked) {
            a.x += nx * sep;
          } else if (a.locked && !b.locked) {
            b.x -= nx * sep;
          }
        } else {
          const sep = overlapY + 1;
          ny = ra.y < rb.y ? -1 : 1;
          if (!a.locked && !b.locked) {
            const push = sep * 0.5;
            a.y += ny * push;
            b.y -= ny * push;
          } else if (!a.locked && b.locked) {
            a.y += ny * sep;
          } else if (a.locked && !b.locked) {
            b.y -= ny * sep;
          }
        }
        const relVx = (a.vx || 0) - (b.vx || 0);
        const relVy = (a.vy || 0) - (b.vy || 0);
        const closing = relVx * nx + relVy * ny;
        if (closing < 0) {
          const invMassA = a.locked ? 0 : 1;
          const invMassB = b.locked ? 0 : 1;
          const massSum = invMassA + invMassB || 1;
          const impulse = -(1 + bounce) * closing / massSum;
          if (!a.locked) {
            a.vx += impulse * nx * invMassA;
            a.vy += impulse * ny * invMassA;
          }
          if (!b.locked) {
            b.vx -= impulse * nx * invMassB;
            b.vy -= impulse * ny * invMassB;
          }
        }
      }
    }
  }
}

function updateParticles(dt) {
  const dtScale = dt / 16.67;
  const frozen = currentTrack && analyser && currentAudio && !currentAudio.paused;
  const driftScale = frozen ? 0.75 : 1;
  for (const p of particles) {
    p.x += p.vx * dtScale * driftScale;
    p.y += p.vy * dtScale * driftScale;
    if (p.x < -50) p.x = world.width + 50;
    if (p.x > world.width + 50) p.x = -50;
    if (p.y < -50) p.y = world.height + 50;
    if (p.y > world.height + 50) p.y = -50;
    p.flare = Math.max(0, p.flare - 0.08 * dtScale);
    if (p.popPulse && typeof p.life === "number") {
      p.life -= dt;
      if (p.life <= 0) p.dead = true;
    }
    if (p.popFade && typeof p.life === "number") {
      p.life -= dt;
      if (p.life <= 0) p.dead = true;
    }
    if (p.popPulse && typeof p.life === "number") {
      const t = Math.max(0, p.life) / 600;
      p.flare = t;
    }
    if (p.flare < 0.01) p.flareTint = null;
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].dead) particles.splice(i, 1);
  }
}

function updateFog(dt) {
  const step = dt / 16.67;
  for (const f of fogBlobs) {
    f.x += f.vx * step;
    f.y += f.vy * step;
    f.vx += (Math.random() - 0.5) * 0.02;
    f.vy += (Math.random() - 0.5) * 0.02;
    f.vx = clamp(f.vx, -0.35, 0.35);
    f.vy = clamp(f.vy, -0.35, 0.35);
    if (f.x < -300) f.x = world.width + 300;
    else if (f.x > world.width + 300) f.x = -300;
    if (f.y < uiBarHeight - 300) f.y = world.height + 300;
    else if (f.y > world.height + 300) f.y = uiBarHeight - 300;
  }
}

function updateCamera() {
  camera.x = clamp(player.x - canvas.width / 2, 0, Math.max(0, world.width - canvas.width));
  camera.y = clamp(player.y - canvas.height / 2, 0, Math.max(0, world.height - canvas.height));
}

function updateAngle() {
  const screenX = player.x - camera.x;
  const screenY = player.y - camera.y;
  player.angle = Math.atan2(mouse.y - screenY, mouse.x - screenX);
}

function update(dt, now) {
  if (touchActive) {
    mouse.x = touchPos.x;
    mouse.y = touchPos.y;
  }
  updatePlayer();
  updateSongs(dt);
  updateParticles(dt);
  updateFog(dt);
  updateBullets(dt);
  updateCollisions(now);
  updateAngle();
  updateCamera();
  updateUIFromAudio();
  if (touchActive) {
    const target = { x: camera.x + touchPos.x, y: camera.y + touchPos.y };
    tryFire(target);
  }
}

function drawGrid() {
  const step = 200;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  const startX = -((camera.x % step + step) % step);
  const startY = -((camera.y % step + step) % step);
  for (let x = startX; x < canvas.width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = startY; y < canvas.height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawParticles(freqData, reacting) {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const sx = p.x - camera.x;
    const sy = p.y - camera.y;
    if (sx < -50 || sx > canvas.width + 50 || sy < -50 || sy > canvas.height + 50) continue;
    const amp = reacting && freqData ? freqData[i % freqData.length] / 255 : 0;
    if (p.popPulse) {
      const total = 600;
      const rem = Math.max(0, p.life || 0);
      const prog = 1 - clamp(rem / total, 0, 1);
      const ringR = (p.popPulseBase || p.r) + prog * 65;
      const alpha = Math.max(0, 1 - prog);
      const tint = p.flareTint || particleColor;
      const fc = hexToRgb(tint);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `rgba(${fc.r},${fc.g},${fc.b},1)`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(sx, sy, ringR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      continue;
    }
    const flareScale = 1 + p.flare * 0.6;
    const flareAlpha = p.flare * 0.6;
    const flareColor = p.flareTint || (currentTrack ? currentTrack.colors.secondary : playerStroke);
    const starColor = p.isThird ? projectileColor : particleColor;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = starColor;
    ctx.beginPath();
    ctx.arc(sx, sy, p.r * flareScale, 0, Math.PI * 2);
    ctx.fill();
    if (reacting && freqData) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = starColor;
      ctx.beginPath();
      const pulse = p.r * flareScale + amp * 5 + 1;
      ctx.arc(sx, sy, pulse, 0, Math.PI * 2);
      ctx.fill();
    }
    if (p.flare > 0) {
      const fc = hexToRgb(flareColor);
      ctx.globalAlpha = flareAlpha;
      ctx.fillStyle = `rgba(${fc.r},${fc.g},${fc.b},1)`;
      ctx.beginPath();
      ctx.arc(sx, sy, p.r * (1.6 + p.flare), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function applyStarFlares(highEnergy) {
  if (!highEnergy || highEnergy < 0.28) return;
  const flareCount = Math.max(1, Math.floor(particles.length * 0.05 * highEnergy));
  const palette = currentTrack
    ? [currentTrack.colors.secondary, currentTrack.border || currentTrack.colors.secondary]
    : [playerStroke, particleColor];
  for (let i = 0; i < flareCount; i++) {
    const idx = Math.floor(Math.random() * particles.length);
    const p = particles[idx];
    p.flare = Math.min(1, p.flare + 0.9);
    const pick = palette[Math.floor(Math.random() * palette.length)];
    p.flareTint = pick;
  }
}

function drawFog(amp) {
  const hasTrack = !!currentTrack;
  const palette = hasTrack
    ? [currentTrack.colors.secondary, currentTrack.border || currentTrack.colors.secondary]
    : ["#ffffff"];
  const fogAlpha = 0.08 + amp * 0.18;
  const pulse = 1 + amp * 0.3;
  for (const f of fogBlobs) {
    const sx = f.x - camera.x;
    const sy = f.y - camera.y;
    if (sx + f.r * 1.4 < 0 || sx - f.r * 1.4 > canvas.width || sy + f.r * 1.4 < 0 || sy - f.r * 1.4 > canvas.height) continue;
    const tintHex = palette[f.tintIndex % palette.length];
    const tint = hexToRgb(tintHex);
    ctx.save();
    ctx.globalAlpha = fogAlpha;
    ctx.fillStyle = `rgba(${tint.r},${tint.g},${tint.b},1)`;
    ctx.beginPath();
    ctx.arc(sx, sy, f.r * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let reacting = currentTrack && analyser && currentAudio && !currentAudio.paused;
  if (reacting && freqData) {
    analyser.getByteFrequencyData(freqData);
  } else {
    reacting = false;
  }

  let ampLevel = 0;
  let highEnergy = 0;
  if (reacting && freqData) {
    const bins = Math.min(24, freqData.length);
    for (let i = 0; i < bins; i++) ampLevel += freqData[i];
    ampLevel = (ampLevel / bins) / 255;
    const start = Math.floor(freqData.length * 0.7);
    let sumHigh = 0;
    let countHigh = 0;
    for (let i = start; i < freqData.length; i++) {
      sumHigh += freqData[i];
      countHigh++;
    }
    highEnergy = countHigh ? (sumHigh / countHigh) / 255 : 0;
  }

  if (reacting) {
    applyStarFlares(highEnergy);
  }
  drawFog(ampLevel);
  drawParticles(freqData, reacting);
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";

  const nowTime = performance.now();
  const getGotPlaying = currentTrack && currentTrack.name === "Get Got";
  const carSeatPlaying = currentTrack && currentTrack.name === "Sober to Death";

  for (const song of songs) {
    const sx = song.x - camera.x;
    const sy = song.y - camera.y;
    if (sx + song.size < 0 || sx > canvas.width || sy + song.size < 0 || sy > canvas.height) continue;
    const isPlaying = currentTrack && currentTrack === song.track;
    let amp = 0;
    if (isPlaying && freqData) {
      const bins = Math.min(8, freqData.length);
      for (let k = 0; k < bins; k++) amp += freqData[k];
      amp = (amp / bins) / 255;
    }
    const baseGrow = isPlaying ? 1.35 : 1;
    const pulseScale = isPlaying ? baseGrow + amp * 0.5 : 1;
    const coverScale = isPlaying ? baseGrow : 1;
    const halfSize = (song.size * coverScale) / 2;
    const pad = 2;
    const strokePad = 2.5;
    if (isPlaying) {
      ctx.save();
      ctx.translate(sx + song.size / 2, sy + song.size / 2);
      ctx.scale(pulseScale, pulseScale);
      ctx.fillStyle = song.track.colors.secondary;
      ctx.globalAlpha = Math.min(1, 0.15 + amp * 0.5);
      ctx.shadowColor = song.track.colors.secondary;
      ctx.shadowBlur = 6 + amp * 24;
      const size = song.size + pad * 2;
      const half = size / 2;
      const radius = Math.min(12, pad + 4);
      ctx.beginPath();
      ctx.moveTo(-half + radius, -half);
      ctx.lineTo(half - radius, -half);
      ctx.quadraticCurveTo(half, -half, half, -half + radius);
      ctx.lineTo(half, half - radius);
      ctx.quadraticCurveTo(half, half, half - radius, half);
      ctx.lineTo(-half + radius, half);
      ctx.quadraticCurveTo(-half, half, -half, half - radius);
      ctx.lineTo(-half, -half + radius);
      ctx.quadraticCurveTo(-half, -half, -half + radius, -half);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(sx + song.size / 2, sy + song.size / 2);
    ctx.scale(coverScale, coverScale);
    if (song.img && song.img.complete) {
      ctx.drawImage(song.img, -song.size / 2, -song.size / 2, song.size, song.size);
    } else {
      ctx.fillStyle = "#fff";
      ctx.fillRect(-song.size / 2, -song.size / 2, song.size, song.size);
    }
    ctx.lineWidth = 5;
    let stroke = isPlaying ? song.track.colors.secondary : "rgba(255,255,255,0.6)";
    if (!isPlaying && (getGotPlaying || carSeatPlaying)) {
      stroke = "rgba(0,0,0,0.35)";
    }
    ctx.strokeStyle = stroke;
    ctx.strokeRect(-song.size / 2 - strokePad, -song.size / 2 - strokePad, song.size + strokePad * 2, song.size + strokePad * 2);
    ctx.restore();
  }

  ctx.fillStyle = projectileColor;
  for (const b of bullets) {
    const bx = b.x - camera.x;
    const by = b.y - camera.y;
    const mag = Math.hypot(b.vx, b.vy) || 1;
    const ux = b.vx / mag;
    const uy = b.vy / mag;

    const tailLen = 70;
    const headW = 10;
    const tailW = 0;
    const tailX = bx - ux * tailLen;
    const tailY = by - uy * tailLen;
    const pxn = -uy;
    const pyn = ux;
    const grad = ctx.createLinearGradient(tailX, tailY, bx, by);
    const pc = hexToRgb(projectileColor);
    const rgba = (r, g, b, a) => `rgba(${r},${g},${b},${a})`;
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.3, rgba(pc.r, pc.g, pc.b, 0.45));
    grad.addColorStop(1, rgba(pc.r, pc.g, pc.b, 0.7));
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(bx + pxn * headW, by + pyn * headW);
    ctx.lineTo(bx - pxn * headW, by - pyn * headW);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(bx, by, 7.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const px = player.x - camera.x;
  const py = player.y - camera.y;

  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(player.angle);
  const barrelW = player.r * 0.9;
  const barrelLen = player.r * 0.8;
  const startX = player.r - barrelLen * 0.25;
  const endX = startX + barrelLen;
  ctx.fillStyle = projectileColor;
  ctx.beginPath();
  ctx.rect(startX, -barrelW / 2, barrelLen, barrelW);
  ctx.closePath();
  ctx.fill();
  const rimW = barrelW * 1.15;
  const rimH = Math.max(8, barrelW * 0.25);
  const rimRadius = Math.min(rimH * 0.6, 10);
  const rimX = endX - rimH * 0.4;
  const rimTop = -rimW / 2;
  const rimBottom = rimW / 2;
  ctx.strokeStyle = playerStroke;
  ctx.lineWidth = Math.max(6, barrelW * 0.35);
  ctx.beginPath();
  ctx.moveTo(endX, -barrelW / 2);
  ctx.lineTo(endX, barrelW / 2);
  ctx.stroke();
  ctx.fillStyle = projectileColor;
  ctx.beginPath();
  ctx.moveTo(rimX + rimRadius, rimTop);
  ctx.lineTo(rimX + rimH - rimRadius, rimTop);
  ctx.quadraticCurveTo(rimX + rimH, rimTop, rimX + rimH, rimTop + rimRadius);
  ctx.lineTo(rimX + rimH, rimBottom - rimRadius);
  ctx.quadraticCurveTo(rimX + rimH, rimBottom, rimX + rimH - rimRadius, rimBottom);
  ctx.lineTo(rimX + rimRadius, rimBottom);
  ctx.quadraticCurveTo(rimX, rimBottom, rimX, rimBottom - rimRadius);
  ctx.lineTo(rimX, rimTop + rimRadius);
  ctx.quadraticCurveTo(rimX, rimTop, rimX + rimRadius, rimTop);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = playerColor;
  ctx.beginPath();
  ctx.arc(px, py, player.r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = playerStroke;
  const borderPulse = 6 + ampLevel * 10;
  ctx.lineWidth = borderPulse;
  ctx.shadowColor = playerStroke;
  ctx.shadowBlur = ampLevel * 20;
  ctx.beginPath();
  ctx.arc(px, py, player.r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;

}

let lastTime = performance.now();
function loop(now) {
  const dt = now - lastTime;
  lastTime = now;
  update(dt, now);
  draw();
  requestAnimationFrame(loop);
}

loop(performance.now());
