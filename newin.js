// Initialize cart and favorites in localStorage if they don't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

if (!localStorage.getItem('favorites')) {
    localStorage.setItem('favorites', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', function() {
    // Update heart colors when page loads
    updateHeartColors();
    
    // Add click event listeners to all favorite icons
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productInfo = {
                image: productCard.querySelector('img').src,
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent,
            };
            toggleFavorite(this, productInfo);
        });
    });
});

function toggleFavorite(heartIcon, productInfo) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.some(item => item.name === productInfo.name);

    if (exists) {
        // Remove from favorites
        favorites = favorites.filter(item => item.name !== productInfo.name);
        heartIcon.style.color = 'transparent';
        heartIcon.style.webkitTextStroke = '1.5px black';
    } else {
        // Add to favorites
        favorites.push(productInfo);
        heartIcon.style.color = 'red';
        heartIcon.style.webkitTextStroke = '1px red';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToCart(productInfo) {
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

function updateHeartColors() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        const productCard = icon.closest('.product-card');
        if (productCard && productCard.querySelector('h3')) {
            const productName = productCard.querySelector('h3').textContent;
            
            if (favorites.some(item => item.name === productName)) {
                icon.style.color = 'red';
                icon.style.webkitTextStroke = '1px red';
            } else {
                icon.style.color = 'transparent';
                icon.style.webkitTextStroke = '1.5px black';
            }
        }
    });
} 