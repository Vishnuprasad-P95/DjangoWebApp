function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action (navigation)

    // Get the user details from the JavaScript object
    var firstName = user.first_name;
    var lastName = user.last_name;
    var email = user.email;

    // Create the content with input fields for first name and last name
    var content = `
        <div id="update">
        <p>First Name: <input id="first-name" type="text" value="${firstName}"></p>
        <p>Last Name: <input id="last-name" type="text" value="${lastName}"></p>
        <p>Email: ${email}</p>
        <button id="save-button">Save</button>
        </div>
    `;

    // Update the #content div
    document.getElementById('content').innerHTML = content;

    // Add event listener to the save button
    document.getElementById('save-button').addEventListener('click', function() {
        // Get the updated first name and last name
        var updatedFirstName = document.getElementById('first-name').value;
        var updatedLastName = document.getElementById('last-name').value;

        // Update the user object
        user.first_name = updatedFirstName;
        user.last_name = updatedLastName;

        // Send a POST request to the server with the updated user details
        fetch('/update_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include the CSRF token in the header
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                'first_name': updatedFirstName,
                'last_name': updatedLastName
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // The update was successful
                console.log('User details updated successfully');
                alert('User details updated successfully');
                location.reload();
            } else {
                // There was an error
                console.log('Error updating user details');
                alert('Error updating user details');
            }
        });
    });
});