document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const statusEl = document.getElementById("statusMessage");
  const killCountEl = document.getElementById("killCount");
  const textBlocks = Array.from(document.querySelectorAll(".text-block"));

  if (!canvas || !statusEl || !killCountEl || !textBlocks.length) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const laneRatios = [0.18, 0.38, 0.62, 0.82];
  const shootCooldown = 240;

  const getLanePositions = () => laneRatios.map((ratio) => canvas.width * ratio);
  const getRailBaseline = () => Math.max(90, canvas.height * 0.12);

  const enemyStages = [
    { size: 110, speed: 1.2 }, // enemy 1 larger
    { size: 100, speed: 1.35 }, // enemy 2 larger
    { size: 84, speed: 1.5 }, // enemy 3 stays the same
    { size: 110, speed: 1.65 } // enemy 4 larger
  ];

  const enemySprites = ["images/enemy1.png", "images/enemy2.png", "images/enemy3.png", "images/enemy4.png"].map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const syncEnemyDimensions = (currentEnemy) => {
    if (
      !currentEnemy ||
      !currentEnemy.sprite ||
      !currentEnemy.sprite.complete ||
      !currentEnemy.sprite.naturalWidth ||
      !currentEnemy.sprite.naturalHeight
    ) {
      return;
    }
    const aspectRatio = currentEnemy.sprite.naturalWidth / currentEnemy.sprite.naturalHeight;
    if (!Number.isFinite(aspectRatio) || aspectRatio <= 0) return;

    const width = currentEnemy.height * aspectRatio;
    currentEnemy.width = width;
    currentEnemy.x = currentEnemy.center - width / 2;
  };

  const player = {
    width: 70,
    height: 26,
    x: 0,
    y: 0,
    speed: 5.6
  };

  const keyState = {
    ArrowLeft: false,
    ArrowRight: false,
    KeyA: false,
    KeyD: false,
    Space: false
  };

  const projectiles = [];

  let enemy = null;
  let lastLaneIndex = -1;
  let stageIndex = 0;
  let kills = 0;
  let lastShotTime = 0;
  let gameOver = false;
  let lastFrameTime = 0;

  const clampPlayerToBounds = () => {
    player.x = Math.min(Math.max(player.x, 0), Math.max(canvas.width - player.width, 0));
    player.y = canvas.height - getRailBaseline();
  };

  const resizeCanvas = () => {
    const width = Math.max(window.innerWidth, 360);
    const height = Math.max(window.innerHeight, 360);
    canvas.width = width;
    canvas.height = height;
    clampPlayerToBounds();

    if (enemy) {
      enemy.x = Math.min(Math.max(enemy.x, 0), Math.max(canvas.width - enemy.width, 0));
    }
  };

  const setStatus = (message) => {
    statusEl.textContent = message;
  };

  const revealTextBlock = (index) => {
    const block = textBlocks[index];
    if (block) {
      block.classList.add("revealed");
      block.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const resetTextBlocks = () => {
    textBlocks.forEach((block) => block.classList.remove("revealed"));
  };

  const spawnEnemy = (announce = true) => {
    const looping = stageIndex >= enemyStages.length;
    const stageSelection = looping ? Math.floor(Math.random() * enemyStages.length) : stageIndex;
    const stage = enemyStages[stageSelection];
    const lanes = getLanePositions();
    let laneIndex = Math.floor(Math.random() * lanes.length);

    if (laneIndex === lastLaneIndex) {
      laneIndex = (laneIndex + 1) % lanes.length;
    }

    lastLaneIndex = laneIndex;
    const centerX = lanes[laneIndex];

    enemy = {
      width: stage.size,
      height: stage.size,
      x: centerX - stage.size / 2,
      y: -stage.size,
      speed: stage.speed,
      sprite: enemySprites[stageSelection % enemySprites.length],
      center: centerX
    };

    if (announce) {
      if (looping) {
        setStatus("All text unlocked. Enemies now shuffle in at random.");
      } else {
        setStatus(`Enemy ${stageIndex + 1} inbound. Keep the rail clear.`);
      }
    }
  };

  const resetGame = () => {
    projectiles.length = 0;
    stageIndex = 0;
    kills = 0;
    lastShotTime = 0;
    gameOver = false;
    enemy = null;
    player.x = canvas.width / 2 - player.width / 2;
    clampPlayerToBounds();
    resetTextBlocks();
    killCountEl.textContent = "0";
    setStatus("Enemy 1 inbound. Hold the rail and reveal all four mechanics.");
    spawnEnemy(false);
  };

  const triggerMiss = () => {
    if (gameOver) return;
    setStatus("Enemy slipped through. Another target descending.");
    enemy = null;
    spawnEnemy(false);
  };

  const handleKill = () => {
    kills += 1;
    killCountEl.textContent = String(Math.min(kills, textBlocks.length));
    revealTextBlock(kills - 1);
    stageIndex += 1;
    enemy = null;

    if (kills === enemyStages.length) {
      setStatus("All sections revealed. Enemies now loop forever.");
      spawnEnemy(false);
    } else if (kills > enemyStages.length) {
      setStatus("Keep intercepting the endless wave.");
      spawnEnemy(false);
    } else {
      const header = textBlocks[kills - 1].querySelector("h2")?.textContent ?? "Next section";
      setStatus(`Lore unlocked: ${header}. Another target is dropping.`);
      spawnEnemy(false);
    }
  };

  const updatePlayer = (deltaMultiplier) => {
    if (gameOver) return;
    const moveLeft = keyState.ArrowLeft || keyState.KeyA;
    const moveRight = keyState.ArrowRight || keyState.KeyD;
    const movement = player.speed * deltaMultiplier;

    if (moveLeft && !moveRight) {
      player.x = Math.max(0, player.x - movement);
    } else if (moveRight && !moveLeft) {
      player.x = Math.min(canvas.width - player.width, player.x + movement);
    }
  };

  const fireProjectile = (timestamp) => {
    if (gameOver) return;
    if (!keyState.Space) return;
    if (timestamp - lastShotTime < shootCooldown) return;

    lastShotTime = timestamp;

    projectiles.push({
      x: player.x + player.width / 2,
      y: player.y,
      radius: 7,
      speed: 8.2
    });
  };

  const updateProjectiles = (deltaMultiplier) => {
    for (let i = projectiles.length - 1; i >= 0; i -= 1) {
      const shot = projectiles[i];
      shot.y -= shot.speed * deltaMultiplier;
      if (shot.y + shot.radius < 0) {
        projectiles.splice(i, 1);
      }
    }
  };

  const updateEnemy = (deltaMultiplier) => {
    if (!enemy || gameOver) return;

    enemy.y += enemy.speed * deltaMultiplier;

    if (enemy.y > canvas.height) {
      triggerMiss();
    }
  };

  const checkCollisions = () => {
    if (!enemy || gameOver) return;
    syncEnemyDimensions(enemy);

    for (let i = projectiles.length - 1; i >= 0; i -= 1) {
      const shot = projectiles[i];

      const withinX = shot.x >= enemy.x && shot.x <= enemy.x + enemy.width;
      const withinY = shot.y - shot.radius <= enemy.y + enemy.height && shot.y + shot.radius >= enemy.y;

      if (withinX && withinY) {
        projectiles.splice(i, 1);
        handleKill();
        break;
      }
    }
  };

  const drawPlayer = () => {
    context.fillStyle = "#4f7bff";
    context.fillRect(player.x, player.y, player.width, player.height);

    const turretWidth = player.width * 0.18;
    const turretHeight = player.height * 1.2;
    const turretX = player.x + player.width / 2 - turretWidth / 2;
    const turretY = player.y - turretHeight + player.height / 2;

    context.fillRect(turretX, turretY, turretWidth, turretHeight);
  };

  const drawProjectiles = () => {
    context.fillStyle = "#ffe773";
    projectiles.forEach((shot) => {
      context.beginPath();
      context.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    });
  };

  const drawEnemy = () => {
    if (!enemy) return;
    syncEnemyDimensions(enemy);
    if (enemy.sprite && enemy.sprite.complete && enemy.sprite.naturalWidth) {
      context.drawImage(enemy.sprite, enemy.x, enemy.y, enemy.width, enemy.height);
    } else {
      context.fillStyle = "#ff4f6d";
      context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  };

  const drawRail = () => {
    context.strokeStyle = "rgba(255, 231, 115, 0.22)";
    context.lineWidth = 2;
    const railY = player.y + player.height + 14;
    context.beginPath();
    context.moveTo(0, railY);
    context.lineTo(canvas.width, railY);
    context.stroke();
  };

  const loop = (timestamp) => {
    const delta = timestamp - lastFrameTime || 16.67;
    lastFrameTime = timestamp;
    const deltaMultiplier = delta / 16.67;

    context.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer(deltaMultiplier);
    fireProjectile(timestamp);
    updateProjectiles(deltaMultiplier);
    updateEnemy(deltaMultiplier);
    checkCollisions();

    drawRail();
    drawEnemy();
    drawPlayer();
    drawProjectiles();

    requestAnimationFrame(loop);
  };

  document.addEventListener("keydown", (event) => {
    const { code } = event;
    if (code === "Space") {
      event.preventDefault();
      keyState.Space = true;
    } else if (code in keyState) {
      keyState[code] = true;
    } else if (code === "KeyR") {
      resetGame();
    }
  });

  document.addEventListener("keyup", (event) => {
    const { code } = event;
    if (code in keyState) {
      keyState[code] = false;
    }
  });

  window.addEventListener("blur", () => {
    Object.keys(keyState).forEach((code) => {
      keyState[code] = false;
    });
  });

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  resetGame();
  requestAnimationFrame(loop);
});
