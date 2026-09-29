const contactForm = document.querySelector("#contact-form");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const status = document.querySelector("#contact-form-status");
  const data = new FormData(contactForm);
  const firstName = String(data.get("firstName") || "").trim();
  const lastName = String(data.get("lastName") || "").trim();

  data.set("name", `${firstName} ${lastName}`.trim());
  data.set("_subject", `Portfolio inquiry from ${firstName} ${lastName}`.trim());
  submitButton.disabled = true;
  submitButton.textContent = "SENDING...";
  status.className = "contact-form-note";
  status.textContent = "Sending your message...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Submission failed");

    contactForm.reset();
    status.className = "contact-form-note is-success";
    status.textContent = "Thank you. Your message has been sent successfully.";
  } catch (error) {
    status.className = "contact-form-note is-error";
    status.innerHTML = 'Your message could not be sent. Please try again or email <a href="mailto:kkartal.oktay@gmail.com">kkartal.oktay@gmail.com</a>.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "SEND";
  }
});
