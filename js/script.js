const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Show sending state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "Sending your message...";
    formStatus.className = "sending";

    try {
        const response = await fetch(
            "https://my-api-v7q6.onrender.com/api/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to send message"
            );
        }

        formStatus.textContent =
            "Message sent successfully! Thank you.";

        formStatus.className = "success";

        contactForm.reset();

    } catch (error) {
        console.error("Contact form error:", error);

        formStatus.textContent =
            "Unable to send your message. Please try again.";

        formStatus.className = "error";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
});