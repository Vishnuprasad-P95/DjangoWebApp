function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "block";
    } else {
        dropdownMenu.style.display = "none";
    }
}

document.getElementById('about-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action (navigation)

    // Get the user details from the Django template
    var firstName = "{{ user.first_name }}";
    var lastName = "{{ user.last_name }}";
    var email = "{{ user.email }}";

    // Create the content
    var content = `
        <h2>About</h2>
        <p>First Name: ${firstName}</p>
        <p>Last Name: ${lastName}</p>
        <p>Email: ${email}</p>
    `;

    // Update the #content div
    document.getElementById('content').innerHTML = content;
});