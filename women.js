// Initialize cart and favorites in localStorage if they don't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productInfo = {
                image: productCard.querySelector('img').src,
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent.replace('$', ''),
            };
            addToCart(productInfo, this);
        });
    });
});

function addToCart(productInfo, button) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new item
    cart.push({
        name: productInfo.name,
        price: productInfo.price,
        image: productInfo.image,
        quantity: 1
    });
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    const originalText = button.textContent;
    button.textContent = 'Added to Cart!';
    button.style.backgroundColor = '#4CAF50';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
} 