const socket = io();

const btnLogin = document.querySelector("#btn-login");
btnLogin.addEventListener("click", loginUser);


function loginUser(event) {
    event.preventDefault();
    const user = { user: document.getElementById('user').value };
    socket.emit('login-user', user);
}

socket.on('user-error', error => {
    alert(error);
});
socket.on('reload', html => {
    //deshabilitarel render temporal...
    document.getElementById('mainHTML').innerHTML = html;
});

socket.on('redirect', function(newHTML) {
    window.location.href = newHTML;
});

// socket.on('redirect', function(destination) {
//     window.location.href = destination;
// });