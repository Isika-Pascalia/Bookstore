// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Listen for Add to Cart buttons
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const bookId = button.dataset.id;
      const title = button.dataset.title;
      const price = parseFloat(button.dataset.price);

      // Check if book is already in cart
      const existing = cart.find(item => item.id === bookId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id: bookId, title, price, quantity: 1 });
      }

      // Save back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`"${title}" added to cart!`);
    });
  });
});

// If we're on cart.html, show cart items
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsDiv = document.getElementById('cart-items');

  if (cartItemsDiv) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');

      const subtotal = item.price * item.quantity;
      total += subtotal;

      itemDiv.innerHTML = `
        <p><strong>${item.title}</strong></p>
        <p>Price: KES ${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: KES ${subtotal}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
        <hr>
      `;

      cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('total-price').textContent = `Total: KES ${total}`;

    // Remove item from cart
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); 
        
      });
    });
  }
});

// Handle Checkout Form Submission
document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const address = document.getElementById('address').value;

      // Simulate sending order
      console.log('Order placed by:', { name, email, address });

      // Clear cart
      localStorage.removeItem('cart');

      // Show success message
      document.getElementById('order-success').style.display = 'block';
      checkoutForm.reset();
    });
  }
});
//update the checkoutbutton
function updateCheckoutButton() {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (!checkoutBtn) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  checkoutBtn.disabled = cart.length === 0;
}


document.addEventListener('DOMContentLoaded', function () {
  updateCheckoutButton(); 
});

