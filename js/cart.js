// Cart functionality
let cart = [];

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
  updateCartUI();
  setupCartModal();
});

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('bookerino_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('bookerino_cart', JSON.stringify(cart));
}

// Add book to cart
function addToCart(book) {
  const existingItem = cart.find(item => item.id === book.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...book,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartUI();
  showCartNotification('Книга додана до кошика!');
}

// Remove book from cart
function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

// Update quantity of item in cart
function updateQuantity(bookId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(bookId);
    return;
  }
  
  const item = cart.find(item => item.id === bookId);
  if (item) {
    item.quantity = newQuantity;
    saveCart();
    updateCartUI();
    renderCartItems();
  }
}

// Get total items in cart
function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get total price of cart
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart UI (count badge)
function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const count = getCartItemCount();
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'block' : 'none';
  }
  
  // Update cart total if modal is open
  const cartTotal = document.getElementById('cart-total');
  if (cartTotal) {
    cartTotal.textContent = getCartTotal();
  }
}

// Setup cart modal
function setupCartModal() {
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cartBtn && cartModal) {
    cartBtn.addEventListener('click', function() {
      cartModal.style.display = 'flex';
      renderCartItems();
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', function() {
      cartModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  if (cartModal) {
    cartModal.addEventListener('click', function(e) {
      if (e.target === cartModal) {
        cartModal.style.display = 'none';
      }
    });
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('Кошик порожній!');
        return;
      }
      alert(`Дякуємо за замовлення! Всього до сплати: ${getCartTotal()} ₴\nНаш менеджер зв'яжеться з вами найближчим часом.`);
      cart = [];
      saveCart();
      updateCartUI();
      renderCartItems();
      cartModal.style.display = 'none';
    });
  }
}

// Render cart items in modal
function renderCartItems() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Кошик порожній</p>';
    if (cartTotal) cartTotal.textContent = '0';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-item-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p class="cart-item-author">${item.author}</p>
        <p class="cart-item-price">${item.price} ₴</p>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="window.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="window.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-total">${item.price * item.quantity} ₴</div>
        <button class="remove-btn" onclick="window.removeFromCart(${item.id})" aria-label="Видалити">×</button>
      </div>
    </div>
  `).join('');

  if (cartTotal) {
    cartTotal.textContent = getCartTotal();
  }
}

// Show notification when item is added
function showCartNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Hide and remove notification
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

