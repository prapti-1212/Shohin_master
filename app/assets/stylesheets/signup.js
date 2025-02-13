 // Make the validateForm function globally available
 window.validateForm = function () {
    // Clear any existing error messages
    clearErrorMessages();

    // Get the input fields by their IDs
    var firstnameField       = document.getElementById("firstname");
    var lastnameField        = document.getElementById("lastname");
    var emailField           = document.getElementById("email");
    var passwordField        = document.getElementById("password");
    var confirmPasswordField = document.getElementById("confirm_password");

    // Retrieve and trim the values
    var firstname       = firstnameField.value.trim();
    var lastname        = lastnameField.value.trim();
    var email           = emailField.value.trim();
    var password        = passwordField.value.trim();
    var confirmPassword = confirmPasswordField.value.trim();

    var valid = true;

    // Validate First Name
    if (firstname === "") {
        displayError(firstnameField, "First name is required.");
        valid = false;
    }

    // Validate Last Name
    if (lastname === "") {
        displayError(lastnameField, "Last name is required.");
        valid = false;
    }

    // Validate Email Field
    if (email === "") {
        displayError(emailField, "Email is required.");
        valid = false;
    } else if (!validateEmail(email)) {
        displayError(emailField, "Please enter a valid email address.");
        valid = false;
    }

    // Validate Password Field
    if (password === "") {
        displayError(passwordField, "Password is required.");
        valid = false;
    } else if (password.length < 6) {
        displayError(passwordField, "Password must be at least 6 characters long.");
        valid = false;
    }

    // Validate Confirm Password Field
    if (confirmPassword === "") {
        displayError(confirmPasswordField, "Please confirm your password.");
        valid = false;
    } else if (confirmPassword !== password) {
        displayError(confirmPasswordField, "Passwords do not match.");
        valid = false;
    }

    // Return false to prevent form submission if any validations fail
    return valid;
};

// Helper function: Inserts an error message immediately after the input field
function displayError(inputField, message) {
    var errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.style.color = "red";
    errorSpan.style.fontSize = "12px";
    errorSpan.style.display = "block";
    errorSpan.textContent = message;

    // Insert the error message right after the input field
    inputField.insertAdjacentElement("afterend", errorSpan);
}

// Helper function: Clears all error messages from the form
function clearErrorMessages() {
    var errors = document.querySelectorAll(".error-message");
    errors.forEach(function (error) {
        error.remove();
    });
}

// Helper function: Validates the email format
function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Attach event listeners to clear errors when the user starts typing in any input field
function attachListeners() {
    var inputFields = document.querySelectorAll("#firstname, #lastname, #email, #password, #confirm_password");
    inputFields.forEach(function (field) {
        field.addEventListener("input", function () {
            clearErrorMessages();
        });
    });
}

// Ensure the listeners are attached on page load (supporting both standard and Turbolinks page loads)
document.addEventListener("DOMContentLoaded", attachListeners);
document.addEventListener("turbolinks:load", attachListeners);