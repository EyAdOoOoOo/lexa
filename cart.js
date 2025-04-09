document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartIcon();
});

function displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartTotal();
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="./${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">$${item.price}</p>
                <p class="item-size">Size: ${item.size}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity || 1}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
    `).join('');
    
    updateCartTotal();
}

// Initialize cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

function addToCart(productInfo) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.name === productInfo.name && 
        item.size === productInfo.size
    );
    
    if (existingItemIndex !== -1) {
        // If item exists, increment quantity
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
        // If item doesn't exist, add new item with quantity 1
        cart.push({
            name: productInfo.name,
            price: productInfo.price,
            image: productInfo.image,
            size: productInfo.size,
            quantity: 1
        });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    
    // Show success message on the button
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added to Cart!';
    button.style.backgroundColor = '#4CAF50';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartIcon();
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = (cart[index].quantity || 1) + change;
    
    if (cart[index].quantity < 1) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.cart-icon');
    const existingBadge = cartIcon.querySelector('.cart-badge');
    
    if (cart.length > 0) {
        if (existingBadge) {
            existingBadge.textContent = cart.length;
        } else {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = cart.length;
            cartIcon.appendChild(badge);
        }
    } else if (existingBadge) {
        existingBadge.remove();
    }
} 