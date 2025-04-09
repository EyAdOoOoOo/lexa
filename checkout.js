document.addEventListener('DOMContentLoaded', function() {
    displayOrderSummary();
});

function displayOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let subtotal = 0;
    
    orderItems.innerHTML = cart.map(item => {
        const itemTotal = parseFloat(item.price) * (item.quantity || 1);
        subtotal += itemTotal;
        
        return `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Quantity: ${item.quantity || 1}</p>
                    <p>$${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${(subtotal + 10).toFixed(2)}`;
}

function placeOrder() {
    // Validate form
    const form = document.getElementById('shippingForm');
    if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
    }

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value,
        country: document.getElementById('country').value
    };

    // Here you would typically send the order to your backend
    alert('Order placed successfully!');
    
    // Clear cart and redirect to confirmation page
    localStorage.removeItem('cart');
    window.location.href = 'order-confirmation.html';
} 