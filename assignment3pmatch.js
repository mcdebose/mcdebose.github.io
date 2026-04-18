/*
Author: Marcus Debose-Hubbard
Date Created: 03/27/2026
Date last edited: 04/17/2026
Version: 1.1
Description: Script to validate that the password and confirm password fields match and display a message indicating whether they match or not.
Also includes a function to update the displayed height value when the range input is adjusted.
*/

// Function to update height value displayed as user moves slider. Consider moving to html file.

function updateValue(val) {
  document.getElementById('heightValue').innerText = val;
}

// Function to validate that the password and confirm password fields match.

document.addEventListener("DOMContentLoaded", function() {
    const password = document.getElementById("ppassword");
    const confirmPassword = document.getElementById("cpassword");
    const matchMessage = document.getElementById("match_message");

    if (!password || !confirmPassword || !matchMessage) {
        return;
    }

    function validatePassword() {
        if (password.value === confirmPassword.value) {
            confirmPassword.setCustomValidity("");
            matchMessage.textContent = "Passwords match.";
            matchMessage.style.color = "green";
        } else {
            confirmPassword.setCustomValidity("Passwords do not match.");
            matchMessage.textContent = "Passwords do not match.";
            matchMessage.style.color = "red";
        }
    }

    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validatePassword);
    validatePassword();
});
