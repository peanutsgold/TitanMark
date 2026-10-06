const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const serviceTriggers = document.querySelectorAll(".service-detail-trigger");
const serviceDetailRow = document.querySelector("#service-detail-row");
const serviceDetailTitle = document.querySelector("#service-detail-title");
const serviceDetailDescription = document.querySelector("#service-detail-description");
const serviceDetailList = document.querySelector("#service-detail-list");
const year = document.querySelector("#year");
const paymentForm = document.querySelector("#payment-form");
const projectDetails = document.querySelector("#project-details");
const projectEnquiryButton = document.querySelector("#project-enquiry");
const paymentStatus = document.querySelector("#payment-status");
const whatsappLinks = document.querySelectorAll(".whatsapp-link");
const ambientAudio = document.querySelector("#ambient-audio");
const audioControl = document.querySelector("#audio-control");
const audioTrackSelect = document.querySelector("#audio-track");
const audioLabel = document.querySelector("#audio-label");
const audioIcon = document.querySelector(".audio-icon");
const serviceBuilder = document.querySelector("#service-builder");
const serviceBuilderOpeners = document.querySelectorAll(".service-builder-open");
const builderOptions = document.querySelectorAll(".builder-option");
const builderSelection = document.querySelector("#builder-selection");
const builderInvoice = document.querySelector("#builder-invoice");
const builderClose = document.querySelector(".builder-close");
const costCards = document.querySelectorAll(".cost-card");
const paymentPackage = document.querySelector("#payment-package");
const paymentDeposit = document.querySelector("#payment-deposit");
const whatsappNumber = ["27", "72", "699", "9872"].join("");
const chilledTracks = [
  { title: "Titanmark Chill", src: "assets/music/titanmark-chill.m4a" },
  { title: "Serene View", src: "assets/music/mixkit-serene-view.mp3" },
  { title: "Digital Clouds", src: "assets/music/mixkit-digital-clouds.mp3" },
  { title: "Sleepy Cat", src: "assets/music/mixkit-sleepy-cat.mp3" },
  { title: "Thinking About You", src: "assets/music/mixkit-thinking-about-you.mp3" },
  { title: "Majestic", src: "assets/music/mixkit-majestic.mp3" },
  { title: "See Line Funk", src: "assets/music/mixkit-see-line-funk.mp3" },
  { title: "Smooth Jazz", src: "assets/music/mixkit-smooth-jazz.mp3" },
  { title: "Serene Moments", src: "assets/music/mixkit-serene-moments.mp3" },
  { title: "Deep Meditation", src: "assets/music/mixkit-deep-meditation.mp3" },
  { title: "Day Dreamin' with U", src: "assets/music/mixkit-day-dreamin-with-u.mp3" },
  { title: "Other World", src: "assets/music/mixkit-other-world.mp3" },
  { title: "Slow Walk", src: "assets/music/mixkit-slow-walk.mp3" },
];
let currentTrackIndex = 0;

const serviceDetails = {
  "basic-logo": {
    title: "Basic Logo Design",
    description: "A simple, clean logo direction for a new business that needs to look credible quickly.",
    items: [
      "One main logo concept",
      "Basic typography and colour direction",
      "One round of small refinements",
      "Final web-ready logo export"
    ]
  },
  "premium-logo": {
    title: "Premium Logo",
    description: "A deeper logo process with options, refinement, and stronger brand direction for a business that wants a professional, consistent identity from day one.",
    items: [
      "Three original logo concepts",
      "Colour and typography direction",
      "Revision rounds to polish the chosen concept",
      "Scalable vector files for web and print use",
      "Black-and-white and icon-only versions for small placements"
    ]
  },
  "business-card": {
    title: "Business Card Design",
    description: "A sharp card layout that carries your contact details and brand clearly, with premium finish options if you want the card to stand out by touch as well as design.",
    items: [
      "Front and back card layout",
      "Logo, name, contact details, and role placement",
      "Print-ready file setup",
      "Optional textured, metallic, or foil-highlight artwork",
      "Digital preview for approval"
    ]
  },
  "single-flyer": {
    title: "Flyer (Single-sided A5/A4)",
    description: "A one-sided promotional flyer for an offer, event, service, or announcement.",
    items: [
      "A5 or A4 single-sided layout",
      "Strong headline and call-to-action placement",
      "Image, logo, and contact detail layout",
      "Print-ready and web-ready export"
    ]
  },
  "double-flyer": {
    title: "Double-sided Flyer",
    description: "A two-sided flyer with more space for details, pricing, benefits, or steps.",
    items: [
      "Front design for attention",
      "Back design for details and trust points",
      "Balanced spacing for readable information",
      "Print-ready export with both sides"
    ]
  },
  "social-post": {
    title: "Social Media Post",
    description: "A branded post graphic made for quick attention on social platforms.",
    items: [
      "One branded social graphic",
      "Headline and offer layout",
      "Logo and contact placement",
      "Export sized for social media use"
    ]
  },
  "facebook-cover": {
    title: "Facebook Cover Banner",
    description: "A cover banner that introduces the brand clearly at the top of the page.",
    items: [
      "Facebook cover-sized banner",
      "Desktop and mobile safe layout",
      "Brand message and logo placement",
      "Ready-to-upload image export"
    ]
  },
  "pull-up-banner": {
    title: "Pull-up Banner",
    description: "A tall display banner designed for events, offices, launches, and walk-in attention.",
    items: [
      "Large-format vertical layout",
      "Clear headline, benefits, and contact details",
      "Logo and brand colour use",
      "Print-ready file preparation"
    ]
  },
  "brochure": {
    title: "Brochure (Tri-fold)",
    description: "A six-panel brochure that explains your business, offer, and contact path.",
    items: [
      "Tri-fold panel structure",
      "Front, inside, and back panel layout",
      "Service or product information flow",
      "Print-ready export"
    ]
  },
  "one-page-website": {
    title: "One-page Website",
    description: "A focused website that puts the whole offer on one clean, mobile-friendly page, built to load fast and load confidence in the brand.",
    items: [
      "Hero, services, pricing, and contact sections",
      "Responsive layout for mobile and desktop",
      "Consistent brand colours and typography",
      "Basic page structure",
      "Launch-ready static website files"
    ]
  },
  "business-website": {
    title: "Business Website",
    description: "A 5-7 page website for a business that needs more trust, structure, and proof, giving visitors a clear path from first visit to enquiry.",
    items: [
      "Home, about, services, portfolio, and contact pages",
      "Pricing or package section",
      "Clear content structure and navigation",
      "Basic on-page SEO structure",
      "Payment or enquiry section readiness"
    ]
  },
  "custom-website": {
    title: "Custom Website",
    description: "A custom build for businesses that need more pages, deeper structure, or special features beyond the standard page tiers.",
    items: [
      "Custom page plan and layout direction",
      "Advanced content and conversion structure",
      "Portfolio, payment, or integration-ready sections",
      "Launch polish and handoff support"
    ]
  },
  "maintenance": {
    title: "Website Maintenance",
    description: "Monthly support to keep the website updated, edited, and working after launch.",
    items: [
      "Small content and image updates",
      "Page edits and minor fixes",
      "Basic health checks",
      "Monthly support based on the chosen plan"
    ]
  }
};

if (year) {
  year.textContent = new Date().getFullYear();
}

paymentPackage?.addEventListener("change", () => {
  const selectedOption = paymentPackage.options[paymentPackage.selectedIndex];
  const deposit = Number(selectedOption?.dataset.deposit || 0);
  if (paymentDeposit) {
    paymentDeposit.textContent = deposit
      ? new Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
          maximumFractionDigits: 0
        }).format(deposit)
      : selectedOption?.value
        ? "Quote first"
        : "Choose a service";
  }
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const whatsappUrl = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

whatsappLinks.forEach((link) => {
  link.href = whatsappUrl("Hi Titanmark, I would like to discuss a project.");
  link.target = "_blank";
  link.rel = "noopener";
});

let selectedBuilderOption = null;

const resetServiceBuilder = () => {
  selectedBuilderOption = null;
  builderOptions.forEach((item) => item.classList.remove("is-selected"));
  if (builderSelection) builderSelection.textContent = "Select an option to continue.";
  if (builderInvoice) {
    builderInvoice.disabled = true;
    builderInvoice.textContent = "Request deposit invoice";
  }
};

const openServiceBuilder = (preferredService = "") => {
  if (!serviceBuilder) return;
  resetServiceBuilder();
  serviceBuilder.showModal();
  if (preferredService) {
    const preferredOption = [...builderOptions].find((option) => option.dataset.service === preferredService);
    preferredOption?.focus();
  } else {
    builderClose?.focus();
  }
};

serviceBuilderOpeners.forEach((opener) => {
  opener.addEventListener("click", () => openServiceBuilder(opener.dataset.builderService));
});

builderClose?.addEventListener("click", () => serviceBuilder?.close());

costCards.forEach((card) => {
  card.addEventListener("toggle", () => {
    if (!card.open) return;
    costCards.forEach((otherCard) => {
      if (otherCard !== card) otherCard.open = false;
    });
  });
});

builderOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedBuilderOption = option.dataset;
    builderOptions.forEach((item) => item.classList.toggle("is-selected", item === option));
    if (builderSelection) {
      builderSelection.textContent = `${option.dataset.option} selected — starting at ${option.dataset.price}.`;
    }
    if (builderInvoice) {
      builderInvoice.disabled = false;
      builderInvoice.textContent = "Request deposit invoice";
    }
  });
});

builderInvoice?.addEventListener("click", () => {
  if (!selectedBuilderOption) return;
  const { service, option, price, package: packageCode } = selectedBuilderOption;

  if (packageCode) {
    if (paymentPackage) {
      paymentPackage.value = packageCode;
      paymentPackage.dispatchEvent(new Event("change"));
    }
    serviceBuilder?.close();
    document.querySelector("#payments")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.querySelector('input[name="name_first"]')?.focus(), 500);
    return;
  }

  const checkbox = [...document.querySelectorAll('input[name="project"]')]
    .find((input) =>
      input.value === service ||
      (service === "Branding" && input.value === "Logo design") ||
      (service === "Business cards" && input.value === "Business card design") ||
      (service === "Print design" && input.value === "Flyer or brochure")
    );
  if (checkbox) checkbox.checked = true;

  if (projectDetails) {
    projectDetails.value = `I would like Titanmark to create: ${option} (${price}).\n\nProject details: `;
  }
  if (paymentPackage) {
    paymentPackage.value = "";
    paymentPackage.dispatchEvent(new Event("change"));
  }
  serviceBuilder?.close();
  document.querySelector("#payments")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => projectDetails?.focus(), 500);
});

paymentForm?.addEventListener("submit", (event) => {
  event.preventDefault();
});

projectEnquiryButton?.addEventListener("click", async () => {
  if (!paymentForm?.reportValidity()) return;

  const selectedOption = paymentPackage?.options[paymentPackage.selectedIndex];
  const data = new FormData(paymentForm);
  data.delete("terms_accepted");
  data.delete("company_website");
  data.set("selected_service", selectedOption?.textContent?.trim() || "General project");

  if (paymentStatus) {
    paymentStatus.classList.remove("is-success", "is-error");
    paymentStatus.textContent = "Sending your project request…";
  }
  projectEnquiryButton.disabled = true;

  try {
    const response = await fetch("https://formsubmit.co/ajax/hello@titanmark.co.za", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    if (!response.ok) throw new Error("Unable to send project request");

    paymentForm.reset();
    paymentPackage?.dispatchEvent(new Event("change"));
    if (paymentStatus) {
      paymentStatus.textContent = "Thank you. Your project request was sent to Titanmark.";
      paymentStatus.classList.add("is-success");
    }
  } catch {
    if (paymentStatus) {
      paymentStatus.textContent = "The request could not be sent. Please email hello@titanmark.co.za or use WhatsApp.";
      paymentStatus.classList.add("is-error");
    }
  } finally {
    projectEnquiryButton.disabled = false;
  }
});

const competitionForm = document.querySelector("#competition-form");
const competitionSubmit = document.querySelector("#competition-submit");
const competitionStatus = document.querySelector("#competition-status");
const competitionAnswers = { q1: "R3,500", q2: "3", q3: "90 × 50 mm", q4: "50%", q5: "Durban" };

const setCompetitionStatus = (message, state) => {
  if (!competitionStatus) return;
  competitionStatus.classList.remove("is-success", "is-error");
  if (state) competitionStatus.classList.add(state);
  competitionStatus.textContent = message;
};

const competitionHasClosed = () => {
  const closes = Date.parse(competitionForm?.dataset.closes || "");
  return Number.isFinite(closes) && Date.now() > closes;
};

if (competitionForm && competitionHasClosed()) {
  competitionForm.querySelectorAll("input, button").forEach((field) => { field.disabled = true; });
  setCompetitionStatus("This competition has closed. Thank you to everyone who entered.");
}

competitionForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (competitionHasClosed()) return;

  const unanswered = Object.keys(competitionAnswers).find((name) => !competitionForm.querySelector(`input[name="${name}"]:checked`));
  if (unanswered) {
    setCompetitionStatus(`Please answer question ${unanswered.slice(1)}.`, "is-error");
    competitionForm.querySelector(`input[name="${unanswered}"]`)?.focus();
    return;
  }
  setCompetitionStatus("");
  if (!competitionForm.reportValidity()) return;

  const data = new FormData(competitionForm);
  if (data.get("company_website")) return;
  data.delete("company_website");
  data.delete("rules_accepted");
  const score = Object.entries(competitionAnswers).filter(([name, answer]) => data.get(name) === answer).length;
  data.set("score", `${score} / ${Object.keys(competitionAnswers).length}`);
  data.set("in_draw", score === Object.keys(competitionAnswers).length ? "Yes" : "No");

  setCompetitionStatus("Sending your entry…");
  competitionSubmit.disabled = true;

  try {
    const response = await fetch("https://formsubmit.co/ajax/hello@titanmark.co.za", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    if (!response.ok) throw new Error("Unable to send competition entry");

    competitionForm.reset();
    setCompetitionStatus("Thank you — your entry is in. The winner will be contacted after the draw on 1 December 2026.", "is-success");
  } catch {
    setCompetitionStatus("Your entry could not be sent. Please try again, or email your answers to hello@titanmark.co.za.", "is-error");
  } finally {
    competitionSubmit.disabled = false;
  }
});

const loadChilledTrack = () => {
  if (!ambientAudio) return;
  const track = chilledTracks[currentTrackIndex];
  ambientAudio.src = track.src;
  ambientAudio.load();
};

const updateAudioPlayingLabel = () => {
  if (!audioLabel) return;
  const track = chilledTracks[currentTrackIndex];
  audioLabel.textContent = `Playing: ${track.title}`;
};

loadChilledTrack();

audioTrackSelect?.addEventListener("change", async () => {
  if (!ambientAudio) return;
  const wasPlaying = !ambientAudio.paused;
  ambientAudio.pause();
  currentTrackIndex = Number(audioTrackSelect.value);
  loadChilledTrack();

  if (wasPlaying) {
    try {
      await ambientAudio.play();
      audioControl?.setAttribute("aria-pressed", "true");
      updateAudioPlayingLabel();
      if (audioIcon) audioIcon.textContent = "❚❚";
      return;
    } catch {
      if (audioLabel) audioLabel.textContent = "Audio unavailable";
    }
  }

  audioControl?.setAttribute("aria-pressed", "false");
  if (audioLabel) audioLabel.textContent = "Play selected song";
  if (audioIcon) audioIcon.textContent = "▶";
});

audioControl?.addEventListener("click", async () => {
  if (!ambientAudio) return;

  if (ambientAudio.paused) {
    try {
      await ambientAudio.play();
      audioControl.setAttribute("aria-pressed", "true");
      updateAudioPlayingLabel();
      if (audioIcon) audioIcon.textContent = "❚❚";
    } catch {
      if (audioLabel) audioLabel.textContent = "Audio unavailable";
    }
    return;
  }

  ambientAudio.pause();
  audioControl.setAttribute("aria-pressed", "false");
  if (audioLabel) audioLabel.textContent = "Play selected song";
  if (audioIcon) audioIcon.textContent = "▶";
});

ambientAudio?.addEventListener("ended", () => {
  audioControl?.setAttribute("aria-pressed", "false");
  if (audioLabel) audioLabel.textContent = "Play selected song";
  if (audioIcon) audioIcon.textContent = "▶";
});

serviceTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const detail = serviceDetails[trigger.dataset.service];
    const tableRow = trigger.closest("tr");

    if (!detail || !serviceDetailRow || !tableRow) {
      return;
    }

    document.querySelectorAll(".pricing-table tbody tr").forEach((row) => {
      row.classList.remove("is-selected");
    });

    tableRow.classList.add("is-selected");
    tableRow.after(serviceDetailRow);

    if (serviceDetailTitle && serviceDetailDescription && serviceDetailList) {
      serviceDetailTitle.textContent = detail.title;
      serviceDetailDescription.textContent = detail.description;
      serviceDetailList.replaceChildren(
        ...detail.items.map((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          return li;
        })
      );
    }

  });
});
