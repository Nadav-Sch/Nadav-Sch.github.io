document.addEventListener("DOMContentLoaded", () => {
  const images = [
    {
      src: "images/wholeearth_fall1968.jpg",
      alt: "Whole Earth Catalog cover, Fall 1968.",
      title: "Fall 1968 · Whole Earth Catalog",
      description: "Debut issue with NASA’s Earthrise photograph and the promise of “Access to Tools” for a planet of makers."
    },
    {
      src: "images/wholeearth_july1970.jpg",
      alt: "Whole Earth Catalog cover, July 1970.",
      title: "July 1970 · Whole Earth Catalog Supplement",
      description: "Summer supplement covering dome building, biofeedback rigs, and communal hacks for the counterculture toolkit."
    },
    {
      src: "images/wholeearth_march1971.jpg",
      alt: "Whole Earth Catalog cover, March 1971.",
      title: "March 1971 · The Last Whole Earth Catalog",
      description: "National Book Award-winning “Last” catalog celebrating a worldwide network of readers trading resilient ideas."
    },
    {
      src: "images/wholeearth_september1986.jpg",
      alt: "Whole Earth Review cover, September 1986.",
      title: "September 1986 · Whole Earth Review",
      description: "Whole Earth Review pivots toward digital networks and ecological futures, mapping new tools for a networked world."
    },
    {
      src: "images/wholeearth_december1994.jpg",
      alt: "Whole Earth Review cover, December 1994.",
      title: "December 1994 · Whole Earth Review",
      description: "Mid-’90s issue bridging cyberculture and environmental design, riffing on Wired-era typography with an Earth-first lens."
    }
  ];

  const imgElement = document.getElementById("catalogImage");
  const button = document.getElementById("nextButton");
  const titleEl = document.getElementById("coverTitle");
  const descriptionEl = document.getElementById("coverDescription");

  if (!imgElement || !button || !titleEl || !descriptionEl) return;

  let index = 0;

  const showImage = (i) => {
    const entry = images[i];
    imgElement.src = entry.src;
    imgElement.alt = entry.alt;
    titleEl.textContent = entry.title;
    descriptionEl.textContent = entry.description;
  };

  button.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  // Ensure the first image is set in case the HTML changes.
  showImage(index);
});
