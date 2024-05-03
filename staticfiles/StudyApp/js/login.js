function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function showError() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Username and password are required.');
        return false;
    } else {
        document.getElementById('loading').style.display = 'flex';
        return true;
    }
}