// Get the signup form
const signupForm = document.querySelector('.auth-form');

// Store users in localStorage if it doesn't exist
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Handle form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users'));

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    // Create new user object
    const newUser = {
        name,
        email,
        password
    };

    // Add user to array
    users.push(newUser);

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    alert('Registration successful! Please login.');

    // Redirect to login page
    window.location.href = 'login.html';
}); 