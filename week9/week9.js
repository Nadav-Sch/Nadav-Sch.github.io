document.addEventListener("DOMContentLoaded", () => {
  const logEl = document.getElementById("decisionLog");
  const statusEl = document.getElementById("statusText");
  const feedEl = document.querySelector(".feed");

  if (!logEl || !feedEl) return;

  const topics = [
    {
      type: "lifestyle",
      title: "Morning routines that promise more focus",
      url: "www.example.com/focus-mornings",
      body: "Small habits that claim more focus.",
      facts: [
        "Readers tend to scan morning routines and then save them for later, stretching the day with tiny rituals.",
        "Habit stacking lists keep people on page far longer than single tips.",
        "Morning routine checklists get reopened multiple times before noon."
      ]
    },
    {
      type: "politics",
      title: "Election shifts ahead of local ballots",
      url: "news.example.com/local-ballots",
      body: "Ballot measures and who they affect.",
      facts: [
        "Policy explainers draw long reads and often get shared into group chats before dinner.",
        "Debate clips are replayed multiple times, especially when a soundbite sticks.",
        "Comment spikes follow controversy, pulling readers back for updates."
      ]
    },
    {
      type: "sad",
      title: "Late night post on burnout and change",
      url: "blog.example.com/late-night",
      body: "A quiet entry about burnout and change.",
      facts: [
        "Reflective late night posts slow scrolling and often get bookmarked silently.",
        "Soft, personal stories keep attention without big headlines.",
        "Readers pause on reflective posts, sometimes returning the next day."
      ]
    },
    {
      type: "shopping",
      title: "Sale alert on earbuds",
      url: "shop.example.com/earbud-deals",
      body: "Noise cancelling earbuds drop in price.",
      facts: [
        "Gadget sales pull in repeat clicks as people compare models.",
        "Price drops trigger quick decisions when paired with a shipping countdown.",
        "Bundles rise after back to back deals, pushing multi-item carts."
      ]
    },
    {
      type: "sports",
      title: "Late score update",
      url: "sports.example.com/scores",
      body: "Overtime pushes viewership up.",
      facts: [
        "Overtime headlines spread fastest as fans refresh repeatedly.",
        "Live scoreboards keep tabs open in the background during games.",
        "Post-game recaps pull in highlight seekers who skipped the live stream."
      ]
    },
    {
      type: "travel",
      title: "Weekend escape",
      url: "travel.example.com/weekend-deals",
      body: "Cheap flights nudge impulsive trips.",
      facts: [
        "Off season trips get longer reads as people weigh weather and cost.",
        "Weekend deals prompt quick saves to watch prices for a day or two.",
        "Photo essays spark map searches for nearby getaways."
      ]
    },
    {
      type: "tech",
      title: "Device teardown",
      url: "tech.example.com/teardown",
      body: "Specs leak shifts recommendations.",
      facts: [
        "Specs lists are skimmed for chip, storage, and price before anything else.",
        "Review readers jump straight to the verdict and battery section.",
        "Comparison tables keep tabs open side by side while deciding."
      ]
    }
  ];

  const clickHistory = [];
  const logLimit = 40;

  const typeOut = (element, text, speed = 18) => {
    if (!element) return;
    if (element._typeTimer) {
      clearInterval(element._typeTimer);
      element._typeTimer = null;
    }
    element.textContent = "";
    let i = 0;
    const total = text.length;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i += 1;
      if (i >= total) {
        clearInterval(timer);
        element._typeTimer = null;
      }
    }, speed);
    element._typeTimer = timer;
    // keep reference in case we want to stop later
    return timer;
  };

  const pushLog = (text) => {
    const item = document.createElement("li");
    logEl.appendChild(item);
    while (logEl.children.length > logLimit) {
      logEl.removeChild(logEl.firstChild);
    }
    logEl.scrollTop = logEl.scrollHeight;
    typeOut(item, text, 18);
  };

  const createCard = (topic) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.type = topic.type;
    card.innerHTML = `
      <p class="eyebrow">${topic.type}</p>
      <p class="link-url">${topic.url || "www.example.com"}</p>
      <h2>${topic.title}</h2>
      <p>${topic.body}</p>
    `;
    card.addEventListener("click", () => handleClick(topic, card));
    return card;
  };

  const renderFeed = () => {
    feedEl.innerHTML = "";
    topics.forEach((topic) => feedEl.appendChild(createCard(topic)));
  };

  const contextNotes = {
    lifestyle: "Also noted: focus seekers lingered on routines.",
    politics: "Also noted: recent political curiosity stays active.",
    sad: "Also noted: reflective reading keeps attention gentle.",
    shopping: "Also noted: price watching remains on.",
    sports: "Also noted: score tracking runs in the background.",
    travel: "Also noted: travel planning tabs are still open.",
    tech: "Also noted: spec comparisons continue."
  };

  const handleClick = (topic, card) => {
    card.classList.add("visited");
    clickHistory.push(topic.type);

    const fact = topic.facts[Math.floor(Math.random() * topic.facts.length)] || topic.body;
    const prior = clickHistory.slice(0, -1);
    const context = prior
      .map((type) => contextNotes[type])
      .filter(Boolean)
      .join(" ");
    const message = `${topic.title}: ${fact} ${context} The algorithm never forgets.`.trim();
    pushLog(message);
  };

  if (statusEl) {
    typeOut(statusEl, "Algorithm listening. Waiting for your signals.", 18);
  }

  renderFeed();
});
