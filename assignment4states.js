/*
Author: Marcus Debose-Hubbard
Date Created: 05/09/2026
Date last edited: 05/09/2026
Version: 1.0
Description: Script to fetch US states from a public API and populate the state select dropdown.
*/

document.addEventListener("DOMContentLoaded", function() {
    const stateSelect = document.getElementById("state"); 

    // Fetch states from local JSON file

    fetch('states.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(states => {

            // Clear any existing options

            stateSelect.innerHTML = '';

            // Adds a default option

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select a state';
            stateSelect.appendChild(defaultOption);

            // Populates the select with states

            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state.abbreviation;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching states:', error);

            // Add some states manually if fetch fails.

            stateSelect.innerHTML = '<option value="">Error loading states</option>';
        });
});