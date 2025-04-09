document.addEventListener('DOMContentLoaded', function() {
    // Generate random order number
    const orderNumber = generateOrderNumber();
    document.getElementById('orderNumber').textContent = orderNumber;
    
    // Set current date
    const orderDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('orderDate').textContent = orderDate;
});

function generateOrderNumber() {
    const prefix = 'ORD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
} 