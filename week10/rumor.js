document.addEventListener("DOMContentLoaded", () => {
  const seedInput = document.getElementById("seedInput");
  const simulateBtn = document.getElementById("simulate");
  const resetBtn = document.getElementById("reset");
  const finalText = document.getElementById("finalText");
  if (!seedInput || !simulateBtn || !resetBtn || !finalText) return;

  const randomSeeds = [
    "The city will shut down Main Street for a secret festival.",
    "Our campus is adding a rooftop garden open only at night.",
    "The cafeteria is replacing coffee with free energy drinks next week.",
    "Someone spotted drones testing new delivery routes after midnight.",
    "A professor hid a clue to extra credit inside the library stacks."
  ];

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const tidy = (text) => text.replace(/\s+/g, " ").replace(/\s([,.;!?])/g, "$1").trim();
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const replacements = {
    city: ["town", "grid", "metro zone"],
    street: ["lane", "artery", "avenue"],
    secret: ["off-record", "quiet", "coded"],
    free: ["no-cost", "comped", "limitless"],
    coffee: ["brew", "rocket fuel", "espresso shots"],
    festival: ["street rave", "flash market", "micro parade"],
    teacher: ["professor", "mentor", "instructor"],
    meeting: ["huddle", "closed chat", "briefing"],
    shutdown: ["freeze", "lock", "pause"],
    rumor: ["whisper", "leak", "hot take"],
    drones: ["hover cams", "bots", "tiny flyers"],
    credit: ["bonus", "points", "hidden grade"],
    library: ["archives", "stacks", "quiet vault"],
    night: ["after dark", "late shift", "blue hour"],
    people: ["crowd", "listeners", "contacts"],
    friends: ["contacts", "mutuals", "group chat"],
    delivery: ["drop", "shipment", "supply run"],
    campus: ["quad", "grounds", "learning maze"]
  };

  const addOns = [
    "apparently",
    "someone swore",
    "a friend of a friend claims",
    "supposedly",
    "sources near the hallway say",
    "heard in the group chat",
    "if you believe the chatter",
    "under the radar",
    "no one will confirm it",
    "kind of wild but"
  ];

  const intensifiers = [
    "definitely",
    "probably",
    "maybe",
    "almost",
    "absolutely",
    "sort of",
    "basically",
    "briefly"
  ];

  const distortSyntax = (text, intensity) => {
    const parts = text.split(/[,;:]/).filter(Boolean);
    if (parts.length < 2) return text;
    const swapped = parts.sort(() => Math.random() - 0.5).join(", ");
    if (Math.random() < intensity) {
      return `${randomItem(addOns)} ${swapped}`;
    }
    return swapped;
  };

  const glitchWord = (word) => {
    if (word.length < 4) return word;
    const idx = Math.floor(Math.random() * (word.length - 1)) + 1;
    const chars = word.split("");
    chars.splice(idx, 0, chars[idx]);
    return chars.join("");
  };

  const mutateText = (text, intensity) => {
    const lowered = text.toLowerCase();
    const tokens = lowered.split(/(\s+)/);

    const swapped = tokens.map((token) => {
      if (/^\s+$/.test(token)) return token;
      const cleaned = token.replace(/[^a-z]/gi, "");
      const key = cleaned.toLowerCase();
      const choices = replacements[key];
      if (choices && Math.random() < 0.45 * intensity) {
        const replacement = randomItem(choices);
        return token.replace(cleaned, replacement);
      }
      if (Math.random() < 0.12 * intensity) {
        return glitchWord(token);
      }
      return token;
    });

    let result = swapped.join("");

    if (Math.random() < 0.35 * intensity) {
      result = distortSyntax(result, intensity * 0.8);
    }

    if (Math.random() < 0.55 * intensity) {
      const addon = randomItem(addOns);
      result = `${addon} ${result}`;
    }

    if (Math.random() < 0.4 * intensity) {
      const adverb = randomItem(intensifiers);
      result = result.replace(/\bis\b/, `is ${adverb}`);
    }

    if (Math.random() < 0.45 * intensity) {
      const pieces = result.split(" ");
      const pulled = pieces.splice(Math.floor(Math.random() * pieces.length), 1)[0];
      pieces.splice(Math.floor(Math.random() * (pieces.length + 1)), 0, pulled);
      result = pieces.join(" ");
    }

    if (Math.random() < 0.5 * intensity) {
      result = result.replace(/\bthe\b/gi, "that");
    }

    return tidy(result);
  };

  const spreadRumor = () => {
    const seed = tidy(seedInput.value || randomItem(randomSeeds));
    const hops = Math.round(12 + Math.random() * 6); // 12–18 hops
    let current = seed;

    for (let i = 1; i <= hops; i += 1) {
      const intensity = clamp(i / hops + 0.35, 0.35, 1.3);
      current = mutateText(current, intensity);
    }

    finalText.textContent = current;
  };

  const reset = () => {
    seedInput.value = "";
    finalText.textContent = "—";
  };

  simulateBtn.addEventListener("click", spreadRumor);
  resetBtn.addEventListener("click", reset);

  seedInput.value = randomItem(randomSeeds);
});
