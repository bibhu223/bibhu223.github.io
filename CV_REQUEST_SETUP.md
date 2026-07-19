# Setup instructions

1. Upload these files to the root of `bibhu223.github.io`:
   - index.html
   - style.css
   - script.js
   - request-cv.html
   - request-sent.html

2. Delete `assets/Bibhutibhusan_Nayak_CV.pdf` from the public repository if it exists.

3. Create a form at Formspree and copy its endpoint.

4. In `request-cv.html`, replace:
   action="https://formspree.io/f/YOUR_FORM_ID"
   with your real Formspree endpoint.

5. Commit the changes.

The form collects the visitor's details and sends them to you. The CV is not exposed or downloaded automatically. You manually review the request and email the CV.

Important: the “real person” checkbox is not a true CAPTCHA. The form includes a honeypot, and manual approval prevents direct CV access. Enable additional spam/CAPTCHA protection in your form service for stronger protection.
