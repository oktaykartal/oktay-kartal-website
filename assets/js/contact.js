const contactForm = document.querySelector("#contact-form");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const firstName = String(data.get("firstName") || "").trim();
  const lastName = String(data.get("lastName") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = `Portfolio inquiry from ${firstName} ${lastName}`.trim();
  const body = [`Name: ${firstName} ${lastName}`.trim(), `Email: ${email}`, "", message].join("\n");
  window.location.href = `mailto:kkartal.oktay@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
