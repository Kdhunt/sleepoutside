import { } from './utils.mjs';
import auth from './Auth.mjs';

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the form data
    const formData = new FormData(event.target);
    const userData = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    // Call the Auth.login function with the form data
    auth.login(userData)
        .then(response => {
            console.log('Login successful:', response);
            // Handle successful login, redirect, or perform further actions
        })
        .catch(error => {
            console.error('Login failed:', error);
            // Handle login failure, show error message, etc.
        });
});