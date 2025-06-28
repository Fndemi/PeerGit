document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitBtn = document.querySelector(".submit-btn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    if (name.length < 2 || !/^[a-zA-Z\s]+$/.test(name)) {
      alert("Please enter a valid name (letters and spaces only).");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(function () {
      alert("Thank you! Your message has been sent.");
      form.reset();
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }, 1000);
  });
});
