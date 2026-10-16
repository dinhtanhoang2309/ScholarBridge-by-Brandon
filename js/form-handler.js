// Formspree Integration & Form Validation for ScholarBridge by Brandon
// Target endpoint: https://formspree.io/f/xyeklllb

export function initFormHandlers() {
  const regForm = document.getElementById('mentee-registration-form');
  const generalForm = document.getElementById('general-contact-form');

  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = regForm.querySelector('button[type="submit"]');
      const alertBox = document.getElementById('reg-form-alert');
      
      // Basic validation
      const name = regForm.querySelector('[name="name"]')?.value.trim();
      const email = regForm.querySelector('[name="email"]')?.value.trim();
      const consent = regForm.querySelector('[name="privacy_consent"]')?.checked;

      if (!name || !email || !consent) {
        showAlert(alertBox, 'error', 'Please complete all required fields and accept the privacy notice.');
        return;
      }

      // Prepare submission
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
        Submitting Registration...
      `;

      try {
        const formData = new FormData(regForm);
        const response = await fetch('https://formspree.io/f/xyeklllb', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showAlert(
            alertBox, 
            'success', 
            'Thank you for reaching out to ScholarBridge by Brandon. Your registration details have been submitted. I will review your message and follow up using the contact details you provided.'
          );
          regForm.reset();
          submitBtn.style.display = 'none';
        } else {
          const data = await response.json().catch(() => ({}));
          const errorMsg = data.errors ? data.errors.map(err => err.message).join(', ') : 'There was an issue submitting your registration. Please try again or email Brandon directly at dinhtanhoang2309@gmail.com.';
          showAlert(alertBox, 'error', errorMsg);
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      } catch (err) {
        console.error('Submission error:', err);
        showAlert(alertBox, 'error', 'Network error. Please check your connection and retry.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  if (generalForm) {
    generalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = generalForm.querySelector('button[type="submit"]');
      const alertBox = document.getElementById('general-form-alert');

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      try {
        const formData = new FormData(generalForm);
        const response = await fetch('https://formspree.io/f/xyeklllb', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showAlert(
            alertBox, 
            'success', 
            'Thank you for your message. Brandon will get back to you within 24–48 hours.'
          );
          generalForm.reset();
          submitBtn.style.display = 'none';
        } else {
          showAlert(alertBox, 'error', 'Submission error. Please email directly at dinhtanhoang2309@gmail.com.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      } catch (err) {
        showAlert(alertBox, 'error', 'Network error. Please try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
}

function showAlert(el, type, message) {
  if (!el) return;
  el.className = `form-status-alert ${type}`;
  el.textContent = message;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
