---
layout: page
title: Contact Me
currentPage: contact
permalink: /contact-me.html
---

<form name="contact" method="POST" action="/thank-you.html" netlify-honeypot="dob" netlify>
  <fieldset>
    <p class="form-secret">
      <label for="contact-dob">Don’t fill this out:</label>
      <input id="contact-dob" name="dob" tabindex="-1" autocomplete="off">
    </p>
    <p>
      <label for="contact-email">Email:</label>
      <input id="contact-email" type="email" name="email" autocomplete="email" required>
    </p>
    <p>
      <label for="contact-message">Message:</label>
      <textarea id="contact-message" name="message" required></textarea>
    </p>
    <p>
      <button type="submit">Send</button>
    </p>
  </fieldset>
</form>
