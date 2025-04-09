document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    // Load product details based on ID
    loadProductDetails(productId);

    // Thumbnail click handling
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            // Update main image
            mainImage.src = this.src;
        });
    });

    // Color selection
    const colorButtons = document.querySelectorAll('.color-circle');
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Favorite button
    const favoriteBtn = document.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.style.color = this.classList.contains('active') ? '#ff4444' : 'white';
    });

    // Add to Cart functionality
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const selectedSize = document.querySelector('.size-btn.active');
        const selectedColor = document.querySelector('.color-circle.active');

        if (!selectedSize || !selectedColor) {
            alert('Please select both size and color');
            return;
        }

        // Show success message
        this.textContent = 'Added to Cart!';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = 'ADD TO CART';
            this.style.backgroundColor = '';
        }, 2000);
    });
});

function loadProductDetails(productId) {
    // You can either:
    // 1. Load details from a JSON file
    // 2. Have separate HTML files for each product
    // 3. Use a database (if you have backend)
    
    // For now, we'll use the URL parameters to load the correct images and info
    const productInfo = getProductInfo(productId);
    if (productInfo) {
        updateProductPage(productInfo);
    }
}

function getProductInfo(productId) {
    // This could be expanded to load from a database or JSON file
    const products = {
        'womens-football-jersey': {
            name: "Women's Oversized Football Jersey Top",
            price: 89.99,
            originalPrice: 109.99,
            images: [
                'Women\'s Oversized Blokecore Football Jersey Top.jpg',
                // Add more image paths
            ],
            colors: ['white', 'black', 'red'],
            sizes: ['S', 'M', 'L', 'XL']
        },
        // Add more products
    };
    
    return products[productId];
}

function updateProductPage(productInfo) {
    // Update page title
    document.title = `LEXA - ${productInfo.name}`;
    
    // Update product name
    document.querySelector('.product-details h1').textContent = productInfo.name;
    
    // Update prices
    document.querySelector('.current-price').textContent = `$${productInfo.price}`;
    if (productInfo.originalPrice) {
        document.querySelector('.original-price').textContent = `$${productInfo.originalPrice}`;
    }
    
    // Update images
    // ... update gallery images ...
    
    // Update color options
    // ... update color circles ...
    
    // Update size options
    // ... update size buttons ...
}

function getSelectedSize() {
    const selectedBtn = document.querySelector('.size-btn.selected');
    return selectedBtn ? selectedBtn.textContent : null;
}

document.addEventListener('DOMContentLoaded', function() {
    // Size selection functionality
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});

function addToCart(productInfo) {
    // Check if size is selected
    if (!productInfo.size) {
        alert('Please select a size');
        return;
    }

    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Make sure the image path is correct by keeping the full path
    const imagePath = productInfo.image;
    
    // Add the new item with complete information
    cart.push({
        name: productInfo.name,
        price: productInfo.price,
        image: imagePath,  // Using the full image path
        size: productInfo.size,
        quantity: 1
    });
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message on the button
    const button = document.querySelector('.add-to-cart');
    const originalText = button.textContent;
    button.textContent = 'Added to Cart!';
    button.style.backgroundColor = '#4CAF50';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
} 