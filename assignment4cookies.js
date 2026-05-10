/*
Author: Marcus Debose-Hubbard
Date Created: 05/09/2026
Date last edited: 05/09/2026
Version: 1.0
Description: Use cookies to greet users by first name on return visits and expire after 48 hours. Also include a welcome back message for returning users.
*/

// Wait for the DOM to load before executing the script.

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patientForm');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const cookieName = 'patientFirstName';
    const existingName = getCookie(cookieName);

// Functions to display welcome message and fill first name field.

    function showMessage(text) {
        if (welcomeMessage) {
            welcomeMessage.textContent = text;
            welcomeMessage.classList.add('visible');
        }
    }

    function fillFirstName(name) {
        const firstNameField = document.getElementById('fname');
        if (firstNameField) {
            firstNameField.value = name;
        }
    }

// Checks for existing cookie and greet users accordingly, then loads any saved data for returning users.

    let currentUser;
    if (existingName) {
        currentUser = existingName;
        fillFirstName(existingName);
        loadAllData(existingName);
        const message = `Welcome back, ${existingName}!`;
        showMessage(message);
    } else {
        let firstName = prompt('Welcome! Please enter your first name:');
        firstName = firstName ? firstName.trim() : '';

        if (!firstName) {
            firstName = 'Guest';
        }

// Save the new user's name in a cookie and local storage, then greet them.

        currentUser = firstName;
        setCookie(cookieName, firstName, 2);
        fillFirstName(firstName);
        const message = `Welcome new user, ${firstName}!`;
        showMessage(message);
    }

// Local Storage Functions.

    function saveField(user, field, value) {
        localStorage.setItem(`${user}_${field}`, value);
    }

    function loadField(user, field) {
        return localStorage.getItem(`${user}_${field}`);
    }

// Function to load all saved data for a user and populate fields.

    function loadAllData(user) {
        const simpleFields = ['pusername', 'fname', 'minitial', 'lname', 'dob', 'phone', 'email', 'address1', 'address2', 'city', 'state', 'zcode', 'pheight', 'pweight', 'btype', 'pallergiesother', 'ainfo'];
        simpleFields.forEach(field => {
            const val = loadField(user, field);
            if (val !== null) {
                const el = document.getElementById(field);
                if (el) el.value = val;
            }
        });

// Load checkboxes for allergies.

        const pallergies = loadField(user, 'pallergies');
        if (pallergies) {
            const vals = JSON.parse(pallergies);
            vals.forEach(val => {
                const cb = document.querySelector(`input[name="pallergies"][value="${val}"]`);
                if (cb) cb.checked = true;
            });
        }

// Load radio buttons for healthcare provider.

        const hprovider = loadField(user, 'hprovider');
        if (hprovider) {
            const radio = document.querySelector(`input[name="hprovider"][value="${hprovider}"]`);
            if (radio) radio.checked = true;
        }

// Load radio buttons for previous infections

        const pprevious = loadField(user, 'ppreviousinfections');
        if (pprevious) {
            const radio = document.querySelector(`input[name="ppreviousinfections"][value="${pprevious}"]`);
            if (radio) radio.checked = true;
        }
    }

// Add save listeners for non-password fields, radio buttons, and checkboxes. Password fields and SSN are excluded for privacy reasons.

    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="date"], input[type="range"], textarea, select').forEach(el => {
        if (!['ppassword', 'cpassword', 'snumber'].includes(el.id)) {
            el.addEventListener('input', () => saveField(currentUser, el.id, el.value));
        }
    });

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const name = radio.name;
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            if (checked) saveField(currentUser, name, checked.value);
        });
    });

    document.querySelectorAll('input[name="pallergies"]').forEach(cb => {
        cb.addEventListener('change', () => {
            const checked = Array.from(document.querySelectorAll('input[name="pallergies"]:checked')).map(c => c.value);
            saveField(currentUser, 'pallergies', JSON.stringify(checked));
        });
    });

// Function to set cookie with name, value, and expiration in days

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
    }

// Function to get cookie value by name and return null if not found.

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return null;
    }
});