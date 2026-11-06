/* ==========================================================================
   TECHZONE ELECTRONICS - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features once DOM is ready
  initCart();
  initCategoryFilters();
  initLiveSearch();
  initProductDetail();
  initContactForm();
});

/* ==========================================================================
   1. CART MANAGEMENT (PERSISTENT VIA LOCALSTORAGE)
   ========================================================================== */
function initCart() {
  const countBadge = document.getElementById('cartCount');
  if (!countBadge) return;

  // Retrieve current cart count from localStorage (defaults to 0 if empty)
  let cartCount = parseInt(localStorage.getItem('techZoneCartCount')) || 0;
  countBadge.textContent = cartCount;

  // Add event listeners to all "Add to Cart" buttons on card grids
  const addButtons = document.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      cartCount++;
      updateCartUI(countBadge, cartCount);

      // Button feedback animation
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added!';
      button.classList.replace('btn-tech', 'btn-dark');

      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.replace('btn-dark', 'btn-tech');
      }, 1200);
    });
  });
}

// Helper to update state and update localStorage
function updateCartUI(badgeElement, newCount) {
  localStorage.setItem('techZoneCartCount', newCount);
  badgeElement.textContent = newCount;
}

/* ==========================================================================
   2. PRODUCT CATEGORY FILTERING (products.html)
   ========================================================================== */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');

  if (!filterBtns.length || !productItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button styles
      filterBtns.forEach(b => {
        b.classList.remove('btn-tech', 'active');
        b.classList.add('btn-outline-dark');
      });
      btn.classList.remove('btn-outline-dark');
      btn.classList.add('btn-tech', 'active');

      const filterValue = btn.getAttribute('data-category');

      // Show/hide grid elements based on category
      productItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. LIVE SEARCH FILTER (products.html)
   ========================================================================== */
function initLiveSearch() {
  const searchInput = document.getElementById('searchInput');
  const productItems = document.querySelectorAll('.product-item');

  if (!searchInput || !productItems.length) return;

  searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase().trim();

    productItems.forEach(item => {
      const title = item.querySelector('.card-title').textContent.toLowerCase();
      if (title.includes(term)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   4. PRODUCT DETAIL PAGE CONTROLS (product-detail.html)
   ========================================================================== */
function initProductDetail() {
  const detailAddToCartBtn = document.getElementById('detailAddToCartBtn');
  const qtyInput = document.getElementById('qtyInput');

  if (!detailAddToCartBtn || !qtyInput) return;

  // Add to Cart from detail view with quantity multiplier
  detailAddToCartBtn.addEventListener('click', () => {
    const selectedQty = parseInt(qtyInput.value) || 1;
    let currentCartCount = parseInt(localStorage.getItem('techZoneCartCount')) || 0;
    
    currentCartCount += selectedQty;
    const countBadge = document.getElementById('cartCount');
    if (countBadge) {
      updateCartUI(countBadge, currentCartCount);
    }

    // Feedback effect
    const originalText = detailAddToCartBtn.innerHTML;
    detailAddToCartBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Added to Cart!';
    detailAddToCartBtn.classList.replace('btn-tech', 'btn-dark');

    setTimeout(() => {
      detailAddToCartBtn.innerHTML = originalText;
      detailAddToCartBtn.classList.replace('btn-dark', 'btn-tech');
    }, 1500);
  });
}

// Global functions for inline HTML event handlers (Image gallery & Quantity buttons)
window.changeImage = function(src) {
  const mainImg = document.getElementById('mainImage');
  if (mainImg) {
    mainImg.src = src;
  }
};

window.incrementQty = function() {
  const qtyInput = document.getElementById('qtyInput');
  if (qtyInput) {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  }
};

window.decrementQty = function() {
  const qtyInput = document.getElementById('qtyInput');
  if (qtyInput && parseInt(qtyInput.value) > 1) {
    qtyInput.value = parseInt(qtyInput.value) - 1;
  }
};

/* ==========================================================================
   5. CONTACT FORM HANDLER (contact.html)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('successAlert');

  if (!contactForm || !successAlert) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reveal success message alert
    successAlert.classList.remove('d-none');
    contactForm.reset();

    // Auto-hide alert after 4 seconds
    setTimeout(() => {
      successAlert.classList.add('d-none');
    }, 4000);
  });
}