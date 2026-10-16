// Checkout, BCA Bank Transfer Workflow & Gated Registration Unlocker

let currentOrder = null;

export function openCheckoutModal(item) {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  const orderRef = `SB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  currentOrder = {
    ...item,
    orderRef: orderRef,
    timestamp: new Date().toISOString(),
    status: 'AWAITING_PAYMENT'
  };

  document.getElementById('checkout-item-name').textContent = item.name;
  document.getElementById('checkout-item-price').textContent = `$${item.price} USD`;
  document.getElementById('checkout-order-ref').textContent = orderRef;
  document.getElementById('checkout-ref-note').textContent = orderRef;

  // Reset steps
  document.getElementById('payment-instructions-step').style.display = 'block';
  document.getElementById('payment-verification-step').style.display = 'none';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export function initCheckout() {
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('checkout-modal-close');
  const confirmTransferBtn = document.getElementById('confirm-transfer-btn');
  const proceedRegistrationBtn = document.getElementById('proceed-to-registration-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCheckoutModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCheckoutModal();
    });
  }

  if (confirmTransferBtn) {
    confirmTransferBtn.addEventListener('click', () => {
      const senderName = document.getElementById('sender-name-input').value.trim();
      const txRef = document.getElementById('tx-ref-input').value.trim();

      if (!senderName) {
        alert('Please enter the Sender / Account Holder Name for reconciliation.');
        return;
      }

      currentOrder.senderName = senderName;
      currentOrder.txRef = txRef;
      currentOrder.status = 'VERIFICATION_PENDING';

      // Transition to verification view
      document.getElementById('payment-instructions-step').style.display = 'none';
      document.getElementById('payment-verification-step').style.display = 'block';

      // Simulate verification progress indicator
      const statusLabel = document.getElementById('order-status-badge');
      statusLabel.textContent = 'Processing Verification...';
      statusLabel.style.background = '#FEF3C7';
      statusLabel.style.color = '#92400E';

      setTimeout(() => {
        currentOrder.status = 'VERIFIED';
        statusLabel.textContent = 'Payment Verified ✓';
        statusLabel.style.background = '#D1FAE5';
        statusLabel.style.color = '#065F46';
        if (proceedRegistrationBtn) {
          proceedRegistrationBtn.style.display = 'inline-flex';
        }
      }, 1400);
    });
  }

  if (proceedRegistrationBtn) {
    proceedRegistrationBtn.addEventListener('click', () => {
      closeCheckoutModal();
      unlockMenteeRegistration(currentOrder);
    });
  }
}

export function unlockMenteeRegistration(order) {
  const regSection = document.getElementById('mentee-registration-section');
  const lockedBanner = document.getElementById('registration-locked-banner');
  const unlockedForm = document.getElementById('registration-active-form');
  const orderRefDisplay = document.getElementById('reg-order-ref-display');
  const packageInput = document.getElementById('form-selected-package');
  const orderRefHidden = document.getElementById('form-order-ref');

  if (lockedBanner) lockedBanner.style.display = 'none';
  if (unlockedForm) unlockedForm.style.display = 'block';

  if (orderRefDisplay) orderRefDisplay.textContent = order.orderRef;
  if (packageInput) packageInput.value = `${order.name} ($${order.price} USD)`;
  if (orderRefHidden) orderRefHidden.value = order.orderRef;

  if (regSection) {
    regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Toast notification
  showToast(`Registration unlocked for order ${order.orderRef}`);
}

function showToast(msg) {
  const toast = document.getElementById('site-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
