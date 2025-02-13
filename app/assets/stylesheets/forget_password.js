window.validateForm = function() { 
    clearErrorMessages();
    var emailField = document.getElementById("email");

    // Validate Email Field
  if (email === "") {
    displayError(emailField, "Email is required.");
    valid = false;
  } else if (!validateEmail(email)) {
    displayError(emailField, "Please enter a valid email address.");
    valid = false;
  }
   // Return false to prevent form submission if there are any errors
   return valid;
};

// Helper function: Inserts an error message in a consistent place within the field container
function displayError(inputField, message) {
    var errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.style.color = "red";
    errorSpan.style.fontSize = "12px";
    errorSpan.style.display = "block";
    errorSpan.textContent = message;
    
    // Insert the error message at the end of the parent container
    // (Assumes the input is wrapped by a container element, e.g., a div with class "field")
    var container = inputField.parentNode;
    container.appendChild(errorSpan);
  }

  // Helper function: Clears all error messages from the form
function clearErrorMessages() {
    var errors = document.querySelectorAll(".error-message");
    errors.forEach(function(error) {
      error.remove();
    });
  }
  
  // Helper function: Validates the email format
  function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Attach event listeners to clear errors when the user starts typing in the input fields
function attachListeners() {
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");
  
    if (emailField) {
      emailField.addEventListener("input", function() {
        clearErrorMessages();
      });
    }
  }
  // Ensure the listeners are attached on page load (supporting both standard and Turbolinks page loads)
document.addEventListener("DOMContentLoaded", attachListeners);
document.addEventListener("turbolinks:load", attachListeners);
