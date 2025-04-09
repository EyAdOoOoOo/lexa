document.addEventListener('DOMContentLoaded', function() {
    // Display favorites when the page loads
    displayFavorites();
    updateHeartColors();

    // Add click event listeners to all favorite icons
    document.querySelectorAll('.favorite-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productInfo = {
                image: productCard.querySelector('img').src,
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price')?.textContent || 
                       productCard.querySelector('.sale-price')?.textContent,
                originalPrice: productCard.querySelector('.original-price')?.textContent
            };

            // Toggle favorite status
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const exists = favorites.some(item => item.name === productInfo.name);

            if (exists) {
                // Remove from favorites
                this.style.color = 'transparent';
                this.style.webkitTextStroke = '1.5px black';
                removeFavorite(productInfo.name);
            } else {
                // Add to favorites
                this.style.color = 'red';
                this.style.webkitTextStroke = '1px red';
                addFavorite(productInfo);
            }
        });
    });
});

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

function addFavorite(productInfo) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(item => item.name === productInfo.name)) {
        favorites.push(productInfo);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    displayFavorites();
}

function removeFavorite(productName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.name !== decodeURIComponent(productName));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // If we're on the favorites page, update the display immediately
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (favoritesGrid) {
        displayFavorites();
    }
    
    updateHeartColors();
}

function displayFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return; // Skip if not on favorites page

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<div class="empty-favorites">No favorite items yet</div>';
        return;
    }

    favoritesGrid.innerHTML = favorites.map(item => `
        <div class="product-card">
            <div class="product-image">
                <i class="fas fa-heart favorite-icon" style="color: red; -webkit-text-stroke: 1px red;" 
                   onclick="removeFavorite('${encodeURIComponent(item.name)}'); return false;"></i>
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3>${item.name}</h3>
                ${item.originalPrice ? `
                    <div class="price-container">
                        <p class="original-price">${item.originalPrice}</p>
                        <p class="sale-price">${item.price}</p>
                    </div>
                ` : `
                    <p class="price">${item.price}</p>
                `}
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
} 