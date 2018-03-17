---
layout: page
title: Contact Me
currentPage: contact
permalink: /contact-me.html
---

<fieldset>
    <form name="contact" netlify-honeypot="dob" action="thank-you" netlify>
  <p class="form-secret">
    <label>Don’t fill this out:</label>
    <input name="dob">
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