document.addEventListener("DOMContentLoaded", () => {
  const reflections = Array.from(document.querySelectorAll(".reflection"));
  if (!reflections.length) return;

  let activeIndex = 0;

  const openReflection = (index, { focusHeader = false } = {}) => {
    activeIndex = index;
    reflections.forEach((section, i) => {
      const header = section.querySelector(".reflection-header");
      const body = section.querySelector(".reflection-body");
      const hint = section.querySelector(".hint");
      const isActive = i === index;
      section.classList.toggle("is-open", isActive);
      header.setAttribute("aria-expanded", String(isActive));
      if (hint) {
        hint.textContent = isActive ? "Close" : "Open";
      }
      if (body) {
        body.hidden = !isActive;
      }
    });
    if (focusHeader) {
      reflections[index].querySelector(".reflection-header")?.focus();
    }
  };

  reflections.forEach((section, index) => {
    const header = section.querySelector(".reflection-header");
    if (!header) return;
    header.addEventListener("click", () => openReflection(index));
  });

  openReflection(0);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (activeIndex + 1) % reflections.length;
      openReflection(nextIndex, { focusHeader: true });
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = (activeIndex - 1 + reflections.length) % reflections.length;
      openReflection(prevIndex, { focusHeader: true });
    }
  });
});
