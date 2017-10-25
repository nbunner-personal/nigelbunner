---
layout: page
title: Contact Me
currentPage: contact
permalink: /test-contact-me.html
---

<fieldset>
    <form name="contact" netlify-honeypot="bot-field" action="thank-you" netlify>
  <p class="form-secret">
    <label>Don’t fill this out:</label>
    <input name="bot-field">
  </p>
  <p>
    <label>Email:</label>
    <input type="text" name="name">
  </p>
  <p>
    <label>Message:</label>
    <textarea name="message"></textarea>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
</fieldset>