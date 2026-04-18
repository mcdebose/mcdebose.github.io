/*
Author: Marcus Debose-Hubbard
Date Created: 03/25/2026
Date last edited: 04/17/2026
Version: 1.2
Description: Script to get and display form data on the page when the get data button is pressed.
*/

function getData() {

    // Get values from text inputs and set them to variables.

    var username = document.getElementById("pusername").value;
    var password = document.getElementById("ppassword").value;
    var confirmPassword = document.getElementById("cpassword").value;
    var firstName = document.getElementById("fname").value;
    var middleInitial = document.getElementById("minitial").value;
    var lastName = document.getElementById("lname").value;
    var dob = document.getElementById("dob").value;
    var ssn = document.getElementById("snumber").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address1 = document.getElementById("address1").value;
    var address2 = document.getElementById("address2").value;
    var city = document.getElementById("city").value;
    var zipCode = document.getElementById("zcode").value;
    var height = document.getElementById("pheight").value;
    var weight = document.getElementById("pweight").value;
    var allergiesOther = document.getElementById("pallergiesother").value;
    var providerOther = document.getElementById("hproviderother").value;
    var additionalInfo = document.getElementById("ainfo").value;

    // Get selected values from dropdowns and set them to variables.
    
    var state = document.getElementById("state").value;
    var bloodType = document.getElementById("btype").value;

    // Get selected radio button values and set them to variables.

    var gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "";
    var healthcareProvider = document.querySelector('input[name="hprovider"]:checked') ? document.querySelector('input[name="hprovider"]:checked').value : "";
    var previousInfections = document.querySelector('input[name="ppreviousinfections"]:checked') ? document.querySelector('input[name="ppreviousinfections"]:checked').value : "";

    // Get checked checkbox values for allergies

    var allergies = [];
    var allergyCheckboxes = document.querySelectorAll('input[name="pallergies"]:checked');
    allergyCheckboxes.forEach(function(checkbox) {
        allergies.push(checkbox.value);
    });

    // Build the output string that will display the field name and inputted values at bottom of screen.

    var output = "<h3>Patient Registration Data:</h3>";
    output += "<strong>Identification:</strong><br><br>";
    output += "Username: " + username + "<br>";
    output += "Password: " + password  + "<br>";
    output += "Confirm Password: " + confirmPassword + "<br>";
    output += "First Name: " + firstName + "<br>";
    output += "Middle Initial: " + middleInitial + "<br>";
    output += "Last Name: " + lastName + "<br>";
    output += "Date of Birth: " + dob + "<br>";
    output += "Social Security: " + ssn  + "<br>";
    output += "Gender: " + gender + "<br><br>";

    output += "<strong>Contact Information:</strong><br><br>";
    output += "Phone: " + phone + "<br>";
    output += "Email: " + email + "<br><br>";

    output += "<strong>Location:</strong><br><br>";
    output += "Address Line 1: " + address1 + "<br>";
    output += "Address Line 2: " + address2 + "<br>";
    output += "City: " + city + "<br>";
    output += "State: " + state + "<br>";
    output += "Zip Code: " + zipCode + "<br><br>";

    output += "<strong>Medical Information:</strong><br><br>";
    output += "Height: " + height + " inches<br>";
    output += "Weight: " + weight + " pounds<br>";
    output += "Blood Type: " + bloodType + "<br>";
    output += "Healthcare Provider: " + healthcareProvider + "<br>";
    if (healthcareProvider === "Other") {
        output += "Other Provider: " + providerOther + "<br>";
    }
    output += "Allergies: " + allergies.join(", ") + "<br>";
    if (allergies.includes("Other")) {
        output += "Other Allergies: " + allergiesOther + "<br>";
    }
    output += "Previous Infections (last 6 months): " + previousInfections + "<br>";
    output += "Additional Information: " + additionalInfo + "<br><br>";


    document.getElementById("outputformdata").innerHTML = output; // Display the output in the div area specified.

    // Function to toggle password visibility when user is typing in the password field. Not working currently
         
    function togglePasswordVisibility() { 
        var confirmPasswordField = document.getElementById("cpassword");
        if (passwordField.type === "password") {
            passwordField.type = "text";
            confirmPasswordField.type = "text";
        } else {
            passwordField.type = "password";
            confirmPasswordField.type = "password";
        }

    //Data submission validation using pattern matching, checks if the required fields are matching/filled out properly
    
    //Password validation to check if password and confrim password match

    


    

    }

}