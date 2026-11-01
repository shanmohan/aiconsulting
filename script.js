// Inai — Partners in AI

const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");

// Nav background on scroll
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav__links a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Scroll-spy: highlight the nav link for the section in view.
// Sections without a nav link (e.g. Industries) keep the previous one active.
const spyLinks = [...document.querySelectorAll('.nav__links a:not(.btn)[href^="#"]')];
const spySections = spyLinks.map((a) => document.querySelector(a.getAttribute("href")));
let spyTicking = false;
const updateSpy = () => {
  spyTicking = false;
  const line = 120;
  let current = -1;
  spySections.forEach((s, i) => {
    if (s.getBoundingClientRect().top <= line) current = i;
  });
  // Past the last tracked section's end (e.g. Contact) → nothing active
  const last = spySections[spySections.length - 1];
  if (current === spySections.length - 1 && last.getBoundingClientRect().bottom <= line) current = -1;
  spyLinks.forEach((a, i) => a.classList.toggle("is-active", i === current));
};
window.addEventListener(
  "scroll",
  () => {
    if (!spyTicking) {
      spyTicking = true;
      requestAnimationFrame(updateSpy);
    }
  },
  { passive: true }
);
updateSpy();

// Count-up for stats
const countUp = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Reveal on scroll (staggered within each parent)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * 80}ms`;
      el.classList.add("is-visible");
      el.querySelectorAll("[data-count]").forEach(countUp);
      observer.unobserve(el);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal, .step").forEach((el) => observer.observe(el));

// Contact form — no backend yet, so open the user's mail client.
// Swap this for Formspree / Netlify Forms / your own API when ready.
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    note.textContent = "Please add your name, a valid email and a short message.";
    note.style.color = "#f87171";
    return;
  }
  const data = new FormData(form);
  const subject = `Enquiry: ${data.get("interest")} — ${data.get("company") || data.get("name")}`;
  const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company")}\nInterest: ${data.get("interest")}\n\n${data.get("message")}`;
  window.location.href = `mailto:hello@inai.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Opening your email app…";
  note.style.color = "";
});

document.getElementById("year").textContent = new Date().getFullYear();
