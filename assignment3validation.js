/*
Author: Marcus Debose-Hubbard
Date Created: 03/27/2026
Date last edited: 04/17/2026
Version: 1.0
Description: Script to validate that fields like first name, social secuirty number, and password are in the correct format.
Checks as the user inputs data and displays error messages if the data is not in the correct format.ASlso includes a function for the 
validation button to update. 
*/

    const form = document.getElementById('patientForm');

/*Defines rules for each field being validated, with a pattern and error message.*/

    const ValidationRules = {
        pusername: {
            pattern: /^[a-z][a-z0-9]{5,20}$/,
            errorMessage: "Username must be 5-20 characters long and should only contain lowercase letters and numbers."
        },
        ppassword: {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage: "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
        },

        fname: {
            pattern: /^[A-Za-z'-]{1,30}$/,
            errorMessage: "First name should only contain letters, hyphens, apostrophes, or dashes."
        },
        lname: {
            pattern: /^[A-Za-z'-]{1,30}$/,
            errorMessage: "Last name should only contain letters, hyphens, apostrophes, or dashes."
        },
        snumber: {
            pattern: /^\d{3}-\d{2}-\d{4}$/,
            errorMessage: "SSN must be in the format XXX-XX-XXXX."
        },
        
        phone: {
            pattern: /^\d{3}-\d{3}-\d{4}$/,
            errorMessage: "Phone number must be in the format XXX-XXX-XXXX."
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: "Please enter a valid email address."
         }

    };
        
    /*Event listeners to each field to validate on input and display error messages if the input does not match the defined pattern.*/
    
    Object.keys(ValidationRules).forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + "Error");
        const rule = ValidationRules[fieldId];
        field.addEventListener('input', function() {
            if (rule.pattern.test(this.value)) {
                errorSpan.textContent = '';
            } else {
                errorSpan.textContent = rule.errorMessage;
            }
        });
    });

// Function to change Validate button to submit button once all fields are valid.

const validateButton = document.getElementById('validateButton');

function updateValidateButton() {
    const allValid = Object.keys(ValidationRules).every(function(fieldId) {
        const field = document.getElementById(fieldId);
        return ValidationRules[fieldId].pattern.test(field.value);
    });

    if (allValid) {
        validateButton.type = 'submit';
        validateButton.value = 'Submit';
    } else {
        validateButton.type = 'button';
        validateButton.value = 'Validate';
    }
}

form.addEventListener('input', updateValidateButton);
updateValidateButton();

validateButton.addEventListener('click', function() {
    if (this.type === 'button') {
        form.reportValidity();
    }
});