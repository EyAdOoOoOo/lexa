document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Get price (handle both sale and regular prices)
            let price;
            const salePrice = productCard.querySelector('.sale-price');
            const regularPrice = productCard.querySelector('.price');
            
            if (salePrice) {
                price = salePrice.textContent;
            } else {
                price = regularPrice.textContent;
            }

            // Add to cart data in localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push({
                name: productName,
                price: price,
                image: productImage,
                quantity: 1
            });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update cart count
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            updateCartBadge();

            // Visual feedback
            button.textContent = 'Added to Cart!';
            button.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Filter functionality (for category pages)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.textContent.toLowerCase();
                const products = document.querySelectorAll('.product-card');
                
                products.forEach(product => {
                    if (category === 'all sale' || category === 'all') {
                        product.style.display = 'block';
                    } else {
                        const productCategory = product.dataset.category;
                        product.style.display = 
                            productCategory === category ? 'block' : 'none';
                    }
                });
            });
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // If on home page, handle search and redirect
            if (window.location.pathname.endsWith('lexa.html')) {
                if (searchTerm.includes('watch')) {
                    window.location.href = 'accessories.html?search=watch';
                }
            } else {
                // On other pages, filter the products
                const products = document.querySelectorAll('.product-card');
                let hasResults = false;
                
                products.forEach(product => {
                    const productName = product.querySelector('h3').textContent.toLowerCase();
                    const productDescription = product.querySelector('.product-description')?.textContent.toLowerCase() || '';
                    
                    if (searchTerm === '' || productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                        product.style.display = 'block';
                        hasResults = true;
                    } else {
                        product.style.display = 'none';
                    }
                });

                // Optional: Show a message if no results found
                const noResultsMsg = document.querySelector('.no-results-message') || document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.color = 'white';
                noResultsMsg.style.padding = '2rem';
                
                if (!hasResults && searchTerm !== '') {
                    noResultsMsg.textContent = 'No products found matching your search.';
                    const productGrid = document.querySelector('.product-grid');
                    if (!document.querySelector('.no-results-message')) {
                        productGrid.parentNode.insertBefore(noResultsMsg, productGrid.nextSibling);
                    }
                } else {
                    noResultsMsg.remove();
                }
            }
        });
    }

    // Handle search parameters when page loads
    window.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        
        if (searchTerm) {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = searchTerm;
                // Trigger the search
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    });

    // Cart badge update
    function updateCartBadge() {
        const cartIcon = document.querySelector('.cart-icon');
        const badge = cartIcon.querySelector('.cart-badge') || 
            document.createElement('span');
        badge.classList.add('cart-badge');
        badge.textContent = cartCount;
        
        if (!cartIcon.querySelector('.cart-badge')) {
            cartIcon.appendChild(badge);
        }
    }

    // Initialize cart badge
    updateCartBadge();

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Favorite icon functionality
    const favoriteIcons = document.querySelectorAll('.favorite-icon');
    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.color = this.style.color === 'red' ? 'white' : 'red';
        });
    });
});
