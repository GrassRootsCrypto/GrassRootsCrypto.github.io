---
permalink: /contact/
layout: single
toc: true
toc_label: "On This Page"
toc_icon: "envelope"
---

{% include localbusiness-schema.html %}

## Based in Adelaide, South Australia

I'm available for face-to-face consultations in Adelaide or online sessions anywhere in the world. Whether you're starting your crypto journey or looking to deepen your understanding, I'm here to help.

---

## Send Chris GRC a Message

Have a quick question or inquiry? Fill out the form below and I'll get back to you as soon as possible.

<form id="contact-form" action="https://api.web3forms.com/submit" method="POST" class="contact-form">

  <!-- Web3Forms Access Key (configured in _config.yml) -->
  <input type="hidden" name="access_key" value="{{ site.web3forms.access_key }}">

  <!-- Optional: Redirect to thank you page after submission -->
  <input type="hidden" name="redirect" value="{{ site.url }}/contact-success/">

  <!-- Optional: Custom subject line -->
  <input type="hidden" name="subject" value="New Contact Form Submission from GrassRoots Crypto">

  <!-- Honeypot Spam Protection -->
  <input type="checkbox" name="botcheck" class="hidden" style="display: none;" aria-hidden="true" tabindex="-1">

  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" name="name" id="name" placeholder="Your Name" aria-required="true" aria-describedby="name-error" required>
    <span id="name-error" role="alert" class="error-message"></span>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" name="email" id="email" placeholder="your.email@example.com" aria-required="true" aria-describedby="email-error" required>
    <span id="email-error" role="alert" class="error-message"></span>
  </div>

  <div class="form-group">
    <label for="subject">Subject</label>
    <input type="text" name="form_subject" id="subject" placeholder="What's this about?" aria-describedby="subject-error">
    <span id="subject-error" role="alert" class="error-message"></span>
  </div>

  <div class="form-group">
    <label for="message">Message *</label>
    <textarea name="message" id="message" rows="6" placeholder="How can I help you..." aria-required="true" aria-describedby="message-error" required></textarea>
    <span id="message-error" role="alert" class="error-message"></span>
  </div>

<button type="submit" class="btn btn--primary" id="submit-btn">Send Message</button>

</form>

<script>
// Form submission handler with loading state and error handling
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const originalText = btn.innerHTML;

  // Show loading state
  btn.disabled = true;
  btn.innerHTML = 'Sending...';

  const formData = new FormData(this);

  try {
    const response = await fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {'Accept': 'application/json'}
    });

    if (response.ok) {
      window.location.href = '{{ site.url }}/contact-success/';
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    alert('Error submitting form. Please try again or contact me directly via email.');
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
});
</script>

## Book a Session

Ready to start your crypto learning journey? Book a 30-minute consultation session with me.

<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/chris-grc/30min" style="min-width:320px;height:700px;"></div>
<script>
  // Lazy-load Calendly when user scrolls to booking section
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const script = document.createElement('script');
          script.src = 'https://assets.calendly.com/assets/external/widget.js';
          script.async = true;
          document.head.appendChild(script);
          observer.disconnect();
        }
      });
    });
    observer.observe(document.querySelector('.calendly-inline-widget'));
  } else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }
</script>
<!-- Calendly inline widget end -->

---

<style>
.contact-form {
  max-width: 600px;
  margin: 2em 0;
}

.form-group {
  margin-bottom: 1.2em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #494e52;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: 2px solid #7a8288;
  outline-offset: 2px;
  border-color: #7a8288;
}

.error-message {
  display: block;
  color: #d32f2f;
  font-size: 0.875em;
  margin-top: 0.25em;
  min-height: 1.2em;
}

.contact-form button {
  margin-top: 1em;
}

.calendly-inline-widget {
  margin: 2em 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
